// Package integration provides helpers for integration testing.
package integration

import (
	"bytes"
	"context"
	"database/sql"
	_ "embed"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"os"
	"reflect"
	"strings"
	"sync"
	"time"

	"github.com/spf13/viper"
	"github.com/zitadel/logging"
	"github.com/zitadel/oidc/v3/pkg/client"
	"github.com/zitadel/oidc/v3/pkg/oidc"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/metadata"

	"github.com/zitadel/zitadel/cmd"
	"github.com/zitadel/zitadel/cmd/start"
	"github.com/zitadel/zitadel/internal/api/authz"
	http_util "github.com/zitadel/zitadel/internal/api/http"
	z_oidc "github.com/zitadel/zitadel/internal/api/oidc"
	"github.com/zitadel/zitadel/internal/command"
	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/eventstore/v1/models"
	"github.com/zitadel/zitadel/internal/net"
	"github.com/zitadel/zitadel/internal/query"
	"github.com/zitadel/zitadel/internal/webauthn"
	"github.com/zitadel/zitadel/internal/zerrors"
	"github.com/zitadel/zitadel/pkg/grpc/admin"
)

var (
	//go:embed config/zitadel.yaml
	zitadelYAML []byte
	//go:embed config/cockroach.yaml
	cockroachYAML []byte
	//go:embed config/postgres.yaml
	postgresYAML []byte
	//go:embed config/system-user-key.pem
	systemUserKey []byte
)

// NotEmpty can be used as placeholder, when the returned values is unknown.
// It can be used in tests to assert whether a value should be empty or not.
const NotEmpty = "not empty"

// UserType provides constants that give
// a short explinanation with the purpose
// a serverice user.
// This allows to pre-create users with
// different permissions and reuse them.
type UserType int

//go:generate stringer -type=UserType
const (
	Unspecified UserType = iota
	OrgOwner
	Login
	IAMOwner
	SystemUser // SystemUser is a user with access to the system service.
)

const (
	FirstInstanceUsersKey = "first"
	UserPassword          = "VeryS3cret!"
)

const (
	PortMilestoneServer = "8081"
	PortQuotaServer     = "8082"
)

// User information with a Personal Access Token.
type User struct {
	*query.User
	Token string
}

type InstanceUserMap map[string]map[UserType]*User

func (m InstanceUserMap) Set(instanceID string, typ UserType, user *User) {
	if m[instanceID] == nil {
		m[instanceID] = make(map[UserType]*User)
	}
	m[instanceID][typ] = user
}

func (m InstanceUserMap) Get(instanceID string, typ UserType) *User {
	if users, ok := m[instanceID]; ok {
		return users[typ]
	}
	return nil
}

// Tester is a Zitadel server and client with all resources available for testing.
type Tester struct {
	*start.Server

	Instance     authz.Instance
	Organisation *query.Org
	Users        InstanceUserMap

	MilestoneChan           chan []byte
	milestoneServer         *httptest.Server
	QuotaNotificationChan   chan []byte
	quotaNotificationServer *httptest.Server

	Client   Client
	WebAuthN *webauthn.Client
	wg       sync.WaitGroup // used for shutdown
}

const commandLine = `start --masterkeyFromEnv`

func (s *Tester) Host() string {
	return fmt.Sprintf("%s:%d", s.Config.ExternalDomain, s.Config.Port)
}

func (s *Tester) createClientConn(ctx context.Context, target string) {
	cc, err := grpc.DialContext(ctx, target,
		grpc.WithBlock(),
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	if err != nil {
		s.Shutdown <- os.Interrupt
		s.wg.Wait()
	}
	logging.OnError(err).Fatal("integration tester client dial")
	logging.New().WithField("target", target).Info("finished dialing grpc client conn")

	s.Client = newClient(cc)
	err = s.pollHealth(ctx)
	logging.OnError(err).Fatal("integration tester health")
}

// pollHealth waits until a healthy status is reported.
// TODO: remove when we make the setup blocking on all
// projections completed.
func (s *Tester) pollHealth(ctx context.Context) (err error) {
	for {
		err = func(ctx context.Context) error {
			ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
			defer cancel()

			_, err := s.Client.Admin.Healthz(ctx, &admin.HealthzRequest{})
			return err
		}(ctx)
		if err == nil {
			return nil
		}
		logging.WithError(err).Info("poll healthz")

		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-time.After(time.Second):
			continue
		}
	}
}

const (
	LoginUser                = "loginClient"
	MachineUserOrgOwner      = "integrationOrgOwner"
	MachineUserInstanceOwner = "integrationInstanceOwner"
)

func (s *Tester) createMachineUserOrgOwner(ctx context.Context) {
	var err error

	ctx, user := s.createMachineUser(ctx, MachineUserOrgOwner, OrgOwner)
	_, err = s.Commands.AddOrgMember(ctx, user.ResourceOwner, user.ID, "ORG_OWNER")
	target := new(zerrors.AlreadyExistsError)
	if !errors.As(err, &target) {
		logging.OnError(err).Fatal("add org member")
	}
}

func (s *Tester) createMachineUserInstanceOwner(ctx context.Context) {
	var err error

	ctx, user := s.createMachineUser(ctx, MachineUserInstanceOwner, IAMOwner)
	_, err = s.Commands.AddInstanceMember(ctx, user.ID, "IAM_OWNER")
	target := new(zerrors.AlreadyExistsError)
	if !errors.As(err, &target) {
		logging.OnError(err).Fatal("add instance member")
	}
}

func (s *Tester) createLoginClient(ctx context.Context) {
	s.createMachineUser(ctx, LoginUser, Login)
}

func (s *Tester) createMachineUser(ctx context.Context, username string, userType UserType) (context.Context, *query.User) {
	var err error

	s.Instance, err = s.Queries.InstanceByHost(ctx, s.Host())
	logging.OnError(err).Fatal("query instance")
	ctx = authz.WithInstance(ctx, s.Instance)

	s.Organisation, err = s.Queries.OrgByID(ctx, true, s.Instance.DefaultOrganisationID())
	logging.OnError(err).Fatal("query organisation")

	usernameQuery, err := query.NewUserUsernameSearchQuery(username, query.TextEquals)
	logging.OnError(err).Fatal("user query")
	user, err := s.Queries.GetUser(ctx, true, usernameQuery)
	if errors.Is(err, sql.ErrNoRows) {
		_, err = s.Commands.AddMachine(ctx, &command.Machine{
			ObjectRoot: models.ObjectRoot{
				ResourceOwner: s.Organisation.ID,
			},
			Username:        username,
			Name:            username,
			Description:     "who cares?",
			AccessTokenType: domain.OIDCTokenTypeJWT,
		})
		logging.WithFields("username", username).OnError(err).Fatal("add machine user")
		user, err = s.Queries.GetUser(ctx, true, usernameQuery)
	}
	logging.WithFields("username", username).OnError(err).Fatal("get user")

	scopes := []string{oidc.ScopeOpenID, oidc.ScopeProfile, z_oidc.ScopeUserMetaData, z_oidc.ScopeResourceOwner}
	pat := command.NewPersonalAccessToken(user.ResourceOwner, user.ID, time.Now().Add(time.Hour), scopes, domain.UserTypeMachine)
	_, err = s.Commands.AddPersonalAccessToken(ctx, pat)
	logging.WithFields("username", SystemUser).OnError(err).Fatal("add pat")
	s.Users.Set(FirstInstanceUsersKey, userType, &User{
		User:  user,
		Token: pat.Token,
	})
	return ctx, user
}

func (s *Tester) WithAuthorization(ctx context.Context, u UserType) context.Context {
	return s.WithInstanceAuthorization(ctx, u, FirstInstanceUsersKey)
}

func (s *Tester) WithInstanceAuthorization(ctx context.Context, u UserType, instanceID string) context.Context {
	if u == SystemUser {
		s.ensureSystemUser()
	}
	return s.WithAuthorizationToken(ctx, s.Users.Get(instanceID, u).Token)
}

func (s *Tester) GetUserID(u UserType) string {
	if u == SystemUser {
		s.ensureSystemUser()
	}
	return s.Users.Get(FirstInstanceUsersKey, u).ID
}

func (s *Tester) WithAuthorizationToken(ctx context.Context, token string) context.Context {
	md, ok := metadata.FromOutgoingContext(ctx)
	if !ok {
		md = make(metadata.MD)
	}
	md.Set("Authorization", fmt.Sprintf("Bearer %s", token))
	return metadata.NewOutgoingContext(ctx, md)
}

func (s *Tester) BearerToken(ctx context.Context) string {
	md, ok := metadata.FromOutgoingContext(ctx)
	if !ok {
		return ""
	}
	return md.Get("Authorization")[0]
}

func (s *Tester) ensureSystemUser() {
	const ISSUER = "tester"
	if s.Users.Get(FirstInstanceUsersKey, SystemUser) != nil {
		return
	}
	audience := http_util.BuildOrigin(s.Host(), s.Server.Config.ExternalSecure)
	signer, err := client.NewSignerFromPrivateKeyByte(systemUserKey, "")
	logging.OnError(err).Fatal("system key signer")
	jwt, err := client.SignedJWTProfileAssertion(ISSUER, []string{audience}, time.Hour, signer)
	logging.OnError(err).Fatal("system key jwt")
	s.Users.Set(FirstInstanceUsersKey, SystemUser, &User{Token: jwt})
}

func (s *Tester) WithSystemAuthorizationHTTP(u UserType) map[string]string {
	return map[string]string{"Authorization": fmt.Sprintf("Bearer %s", s.Users.Get(FirstInstanceUsersKey, u).Token)}
}

// Done send an interrupt signal to cleanly shutdown the server.
func (s *Tester) Done() {
	err := s.Client.CC.Close()
	logging.OnError(err).Error("integration tester client close")

	s.Shutdown <- os.Interrupt
	s.wg.Wait()
	s.milestoneServer.Close()
	s.quotaNotificationServer.Close()
}

// NewTester start a new Zitadel server by passing the default commandline.
// The server will listen on the configured port.
// The database configuration that will be used can be set by the
// INTEGRATION_DB_FLAVOR environment variable and can have the values "cockroach"
// or "postgres". Defaults to "cockroach".
//
// The default Instance and Organisation are read from the DB and system
// users are created as needed.
//
// After the server is started, a [grpc.ClientConn] will be created and
// the server is polled for it's health status.
//
// Note: the database must already be setup and initialized before
// using NewTester. See the CONTRIBUTING.md document for details.

func NewTester(ctx context.Context, zitadelConfigYAML ...string) *Tester {
	args := strings.Split(commandLine, " ")

	sc := make(chan *start.Server)
	//nolint:contextcheck
	cmd := cmd.New(os.Stdout, os.Stdin, args, sc)
	cmd.SetArgs(args)
	for _, yaml := range append([]string{string(zitadelYAML)}, zitadelConfigYAML...) {
		err := viper.MergeConfig(bytes.NewBuffer([]byte(yaml)))
		logging.OnError(err).Fatal()
	}
	var err error
	flavor := os.Getenv("INTEGRATION_DB_FLAVOR")
	switch flavor {
	case "cockroach", "":
		err = viper.MergeConfig(bytes.NewBuffer(cockroachYAML))
	case "postgres":
		err = viper.MergeConfig(bytes.NewBuffer(postgresYAML))
	default:
		logging.New().WithField("flavor", flavor).Fatal("unknown db flavor set in INTEGRATION_DB_FLAVOR")
	}
	logging.OnError(err).Fatal()

	tester := Tester{
		Users: make(InstanceUserMap),
	}
	tester.MilestoneChan = make(chan []byte, 100)
	tester.milestoneServer, err = runMilestoneServer(ctx, tester.MilestoneChan)
	logging.OnError(err).Fatal()
	tester.QuotaNotificationChan = make(chan []byte, 100)
	tester.quotaNotificationServer, err = runQuotaServer(ctx, tester.QuotaNotificationChan)
	logging.OnError(err).Fatal()

	tester.wg.Add(1)
	go func(wg *sync.WaitGroup) {
		logging.OnError(cmd.Execute()).Fatal()
		wg.Done()
	}(&tester.wg)

	select {
	case tester.Server = <-sc:
	case <-ctx.Done():
		logging.OnError(ctx.Err()).Fatal("waiting for integration tester server")
	}
	host := tester.Host()
	tester.createClientConn(ctx, host)
	tester.createLoginClient(ctx)
	tester.WebAuthN = webauthn.NewClient(tester.Config.WebAuthNName, tester.Config.ExternalDomain, http_util.BuildOrigin(host, tester.Config.ExternalSecure))
	tester.createMachineUserOrgOwner(ctx)
	tester.createMachineUserInstanceOwner(ctx)
	tester.WebAuthN = webauthn.NewClient(tester.Config.WebAuthNName, tester.Config.ExternalDomain, "https://"+tester.Host())
	return &tester
}

func Contexts(timeout time.Duration) (ctx, errCtx context.Context, cancel context.CancelFunc) {
	errCtx, cancel = context.WithCancel(context.Background())
	cancel()
	ctx, cancel = context.WithTimeout(context.Background(), timeout)
	return ctx, errCtx, cancel
}

func runMilestoneServer(ctx context.Context, bodies chan []byte) (*httptest.Server, error) {
	mockServer := httptest.NewUnstartedServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		if r.Header.Get("single-value") != "single-value" {
			http.Error(w, "single-value header not set", http.StatusInternalServerError)
			return
		}
		if reflect.DeepEqual(r.Header.Get("multi-value"), "multi-value-1,multi-value-2") {
			http.Error(w, "single-value header not set", http.StatusInternalServerError)
			return
		}
		bodies <- body
		w.WriteHeader(http.StatusOK)
	}))
	config := net.ListenConfig()
	listener, err := config.Listen(ctx, "tcp", ":"+PortMilestoneServer)
	if err != nil {
		return nil, err
	}
	mockServer.Listener = listener
	mockServer.Start()
	return mockServer, nil
}

func runQuotaServer(ctx context.Context, bodies chan []byte) (*httptest.Server, error) {
	mockServer := httptest.NewUnstartedServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		bodies <- body
		w.WriteHeader(http.StatusOK)
	}))
	config := net.ListenConfig()
	listener, err := config.Listen(ctx, "tcp", ":"+PortQuotaServer)
	if err != nil {
		return nil, err
	}
	mockServer.Listener = listener
	mockServer.Start()
	return mockServer, nil
}
