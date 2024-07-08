package command

import (
	"context"
	"encoding/base64"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/zitadel/oidc/v3/pkg/oidc"
	"go.uber.org/mock/gomock"

	"github.com/zitadel/zitadel/internal/crypto"
	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/eventstore"
	"github.com/zitadel/zitadel/internal/eventstore/v1/models"
	"github.com/zitadel/zitadel/internal/id"
	id_mock "github.com/zitadel/zitadel/internal/id/mock"
	"github.com/zitadel/zitadel/internal/repository/user"
	"github.com/zitadel/zitadel/internal/zerrors"
)

func TestCommands_AddAccessAndRefreshToken(t *testing.T) {
	type fields struct {
		eventstore   *eventstore.Eventstore
		idGenerator  id.Generator
		keyAlgorithm crypto.EncryptionAlgorithm
	}
	type args struct {
		ctx                   context.Context
		orgID                 string
		agentID               string
		clientID              string
		userID                string
		refreshToken          string
		audience              []string
		scopes                []string
		authMethodsReferences []string
		lifetime              time.Duration
		authTime              time.Time
		refreshIdleExpiration time.Duration
		refreshExpiration     time.Duration
		reason                domain.TokenReason
		actor                 *domain.TokenActor
	}
	type res struct {
		token        *domain.Token
		refreshToken string
		err          func(error) bool
	}
	tests := []struct {
		name   string
		fields fields
		args   args
		res    res
	}{
		{
			name: "missing ID, error",
			fields: fields{
				eventstore: eventstoreExpect(t),
			},
			args: args{},
			res: res{
				err: zerrors.IsErrorInvalidArgument,
			},
		},
		{
			name: "add refresh token, user deactivated, error",
			fields: fields{
				eventstore: eventstoreExpect(t,
					expectFilter(
						eventFromEventPusher(
							user.NewUserDeactivatedEvent(context.Background(),
								&user.NewAggregate("userID", "orgID").Aggregate,
							),
						),
					),
				),
				idGenerator: id_mock.NewIDGeneratorExpectIDs(t, "refreshTokenID1"),
			},
			args: args{
				ctx:      context.Background(),
				orgID:    "orgID",
				agentID:  "agentID",
				userID:   "userID",
				clientID: "clientID",
			},
			res: res{
				err: zerrors.IsNotFound,
			},
		},
		{
			name: "renew refresh token, invalid token, error",
			fields: fields{
				eventstore:   eventstoreExpect(t),
				keyAlgorithm: refreshTokenEncryptionAlgorithm(gomock.NewController(t)),
			},
			args: args{
				ctx:          context.Background(),
				refreshToken: "invalid",
			},
			res: res{
				err: zerrors.IsErrorInvalidArgument,
			},
		},
		{
			name: "renew refresh token, invalid token (invalid userID), error",
			fields: fields{
				eventstore:   eventstoreExpect(t),
				keyAlgorithm: refreshTokenEncryptionAlgorithm(gomock.NewController(t)),
			},
			args: args{
				ctx:          context.Background(),
				userID:       "userID",
				orgID:        "orgID",
				refreshToken: base64.RawURLEncoding.EncodeToString([]byte("userID2:tokenID:token")),
			},
			res: res{
				err: zerrors.IsErrorInvalidArgument,
			},
		},
		{
			name: "renew refresh token, token inactive, error",
			fields: fields{
				eventstore: eventstoreExpect(t,
					expectFilter(
						eventFromEventPusher(user.NewHumanRefreshTokenAddedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID",
							"applicationID",
							"userAgentID",
							"de",
							[]string{"clientID1"},
							[]string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
							[]string{"password"},
							time.Now(),
							1*time.Hour,
							24*time.Hour,
							nil,
						)),
						eventFromEventPusher(user.NewHumanRefreshTokenRemovedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID",
						)),
					),
				),
				keyAlgorithm: refreshTokenEncryptionAlgorithm(gomock.NewController(t)),
			},
			args: args{
				ctx:          context.Background(),
				userID:       "userID",
				orgID:        "orgID",
				refreshToken: base64.RawURLEncoding.EncodeToString([]byte("userID:tokenID:token")),
			},
			res: res{
				err: zerrors.IsErrorInvalidArgument,
			},
		},
		{
			name: "renew refresh token, token expired, error",
			fields: fields{
				eventstore: eventstoreExpect(t,
					expectFilter(
						eventFromEventPusher(user.NewHumanRefreshTokenAddedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID",
							"applicationID",
							"userAgentID",
							"de",
							[]string{"clientID1"},
							[]string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
							[]string{"password"},
							time.Now(),
							-1*time.Hour,
							24*time.Hour,
							nil,
						)),
					),
				),
				keyAlgorithm: refreshTokenEncryptionAlgorithm(gomock.NewController(t)),
			},
			args: args{
				ctx:          context.Background(),
				userID:       "userID",
				orgID:        "orgID",
				refreshToken: base64.RawURLEncoding.EncodeToString([]byte("userID:tokenID:tokenID")),
			},
			res: res{
				err: zerrors.IsErrorInvalidArgument,
			},
		},
		//fails because of timestamp equality
		//{
		//	name: "push failed, error",
		//	fields: fields{
		//		eventstore: eventstoreExpect(t,
		//			expectFilter(
		//				eventFromEventPusher(user.NewHumanAddedEvent(
		//					context.Background(),
		//					&user.NewAggregate("userID", "orgID").Aggregate,
		//					"username",
		//					"firstname",
		//					"lastname",
		//					"nickname",
		//					"displayname",
		//					language.German,
		//					domain.GenderUnspecified,
		//					"email",
		//					true,
		//				)),
		//			),
		//			expectFilter(
		//				eventFromEventPusherWithCreationDateNow(user.NewHumanAddedEvent(
		//					context.Background(),
		//					&user.NewAggregate("userID", "orgID").Aggregate,
		//					"username",
		//					"firstname",
		//					"lastname",
		//					"nickname",
		//					"displayname",
		//					language.German,
		//					domain.GenderUnspecified,
		//					"email",
		//					true,
		//				)),
		//			),
		//			expectFilter(
		//				eventFromEventPusherWithCreationDateNow(user.NewHumanRefreshTokenAddedEvent(
		//					context.Background(),
		//					&user.NewAggregate("userID", "orgID").Aggregate,
		//					"tokenID",
		//					"applicationID",
		//					"userAgentID",
		//					"de",
		//					[]string{"clientID1"},
		//					[]string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
		//					[]string{"password"},
		//					time.Now(),
		//					1*time.Hour,
		//					24*time.Hour,
		//				)),
		//			),
		//			expectPushFailed(
		//				zerrors.ThrowInternal(nil, "ERROR", "internal"),
		//				[]*repository.Event{
		//					eventFromEventPusher(user.NewUserTokenAddedEvent(
		//						context.Background(),
		//						&user.NewAggregate("userID", "orgID").Aggregate,
		//						"accessTokenID1",
		//						"clientID",
		//						"agentID",
		//						"de",
		//						[]string{"clientID1"},
		//						[]string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
		//						time.Now().Add(5*time.Minute),
		//					)),
		//					eventFromEventPusher(user.NewHumanRefreshTokenRenewedEvent(
		//						context.Background(),
		//						&user.NewAggregate("userID", "orgID").Aggregate,
		//						"tokenID",
		//						"refreshToken1",
		//						1*time.Hour,
		//					)),
		//				},
		//			),
		//		),
		//		idGenerator:  id_mock.NewIDGeneratorExpectIDs(t, "accessTokenID1", "refreshToken1"),
		//		keyAlgorithm: refreshTokenEncryptionAlgorithm(gomock.NewController(t)),
		//	},
		//	args: args{
		//		ctx:                   context.Background(),
		//		orgID:                 "orgID",
		//		agentID:               "agentID",
		//		clientID:              "clientID",
		//		userID:                "userID",
		//		refreshToken:          base64.RawURLEncoding.EncodeToString([]byte("userID:tokenID:tokenID")),
		//		audience:              []string{"clientID1"},
		//		scopes:                []string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
		//		authMethodsReferences: []string{"password"},
		//		lifetime:              5 * time.Minute,
		//		authTime:              time.Now(),
		//	},
		//	res: res{
		//		err: zerrors.IsInternal,
		//	},
		//},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			c := &Commands{
				eventstore:   tt.fields.eventstore,
				idGenerator:  tt.fields.idGenerator,
				keyAlgorithm: tt.fields.keyAlgorithm,
			}
			got, gotRefresh, err := c.AddAccessAndRefreshToken(tt.args.ctx, tt.args.orgID, tt.args.agentID, tt.args.clientID, tt.args.userID, tt.args.refreshToken,
				tt.args.audience, tt.args.scopes, tt.args.authMethodsReferences, tt.args.lifetime, tt.args.refreshIdleExpiration, tt.args.refreshExpiration, tt.args.authTime, tt.args.reason, tt.args.actor)
			if tt.res.err == nil {
				assert.NoError(t, err)
			}
			if tt.res.err != nil && !tt.res.err(err) {
				t.Errorf("got wrong err: %v ", err)
			}
			if tt.res.err == nil {
				assert.Equal(t, tt.res.token, got)
				assert.Equal(t, tt.res.refreshToken, gotRefresh)
			}
		})
	}
}

func TestCommands_RevokeRefreshToken(t *testing.T) {
	type fields struct {
		eventstore *eventstore.Eventstore
	}
	type args struct {
		ctx     context.Context
		userID  string
		orgID   string
		tokenID string
	}
	type res struct {
		want *domain.ObjectDetails
		err  func(error) bool
	}
	tests := []struct {
		name   string
		fields fields
		args   args
		res    res
	}{
		{
			"missing param, error",
			fields{
				eventstore: eventstoreExpect(t),
			},
			args{},
			res{
				err: zerrors.IsErrorInvalidArgument,
			},
		},
		{
			"token not active, error",
			fields{
				eventstore: eventstoreExpect(t,
					expectFilter(),
				),
			},
			args{
				context.Background(),
				"userID",
				"orgID",
				"tokenID",
			},
			res{
				err: zerrors.IsNotFound,
			},
		},
		{
			"push failed, error",
			fields{
				eventstore: eventstoreExpect(t,
					expectFilter(
						eventFromEventPusher(user.NewHumanRefreshTokenAddedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID",
							"clientID",
							"agentID",
							"de",
							[]string{"clientID1"},
							[]string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
							[]string{"password"},
							time.Now(),
							1*time.Hour,
							10*time.Hour,
							nil,
						)),
					),
					expectPushFailed(zerrors.ThrowInternal(nil, "ERROR", "internal"),
						user.NewHumanRefreshTokenRemovedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID",
						),
					),
				),
			},
			args{
				context.Background(),
				"userID",
				"orgID",
				"tokenID",
			},
			res{
				err: zerrors.IsInternal,
			},
		},
		{
			"revoke, ok",
			fields{
				eventstore: eventstoreExpect(t,
					expectFilter(
						eventFromEventPusher(user.NewHumanRefreshTokenAddedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID",
							"clientID",
							"agentID",
							"de",
							[]string{"clientID1"},
							[]string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
							[]string{"password"},
							time.Now(),
							1*time.Hour,
							10*time.Hour,
							nil,
						)),
					),
					expectPush(
						user.NewHumanRefreshTokenRemovedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID",
						),
					),
				),
			},
			args{
				context.Background(),
				"userID",
				"orgID",
				"tokenID",
			},
			res{
				want: &domain.ObjectDetails{
					ResourceOwner: "orgID",
				},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			c := &Commands{
				eventstore: tt.fields.eventstore,
			}
			got, err := c.RevokeRefreshToken(tt.args.ctx, tt.args.userID, tt.args.orgID, tt.args.tokenID)
			if tt.res.err == nil {
				assert.NoError(t, err)
			}
			if tt.res.err != nil && !tt.res.err(err) {
				t.Errorf("got wrong err: %v ", err)
			}
			if tt.res.err == nil {
				assert.Equal(t, tt.res.want, got)
			}
		})
	}
}

func TestCommands_RevokeRefreshTokens(t *testing.T) {
	type fields struct {
		eventstore *eventstore.Eventstore
	}
	type args struct {
		ctx      context.Context
		userID   string
		orgID    string
		tokenIDs []string
	}
	type res struct {
		err func(error) bool
	}
	tests := []struct {
		name   string
		fields fields
		args   args
		res    res
	}{
		{
			"missing tokenIDs, error",
			fields{
				eventstore: eventstoreExpect(t),
			},
			args{
				context.Background(),
				"userID",
				"orgID",
				nil,
			},
			res{
				err: zerrors.IsErrorInvalidArgument,
			},
		},
		{
			"one token not active, error",
			fields{
				eventstore: eventstoreExpect(t,
					expectFilter(
						eventFromEventPusher(user.NewHumanRefreshTokenAddedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID",
							"clientID",
							"agentID",
							"de",
							[]string{"clientID1"},
							[]string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
							[]string{"password"},
							time.Now(),
							1*time.Hour,
							10*time.Hour,
							nil,
						)),
					),
					expectFilter(),
				),
			},
			args{
				context.Background(),
				"userID",
				"orgID",
				[]string{"tokenID", "tokenID2"},
			},
			res{
				err: zerrors.IsNotFound,
			},
		},
		{
			"push failed, error",
			fields{
				eventstore: eventstoreExpect(t,
					expectFilter(
						eventFromEventPusher(user.NewHumanRefreshTokenAddedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID",
							"clientID",
							"agentID",
							"de",
							[]string{"clientID"},
							[]string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
							[]string{"password"},
							time.Now(),
							1*time.Hour,
							10*time.Hour,
							nil,
						)),
					),
					expectFilter(
						eventFromEventPusher(user.NewHumanRefreshTokenAddedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID2",
							"clientID2",
							"agentID",
							"de",
							[]string{"clientID2"},
							[]string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
							[]string{"password"},
							time.Now(),
							1*time.Hour,
							10*time.Hour,
							nil,
						)),
					),
					expectPushFailed(zerrors.ThrowInternal(nil, "ERROR", "internal"),
						user.NewHumanRefreshTokenRemovedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID",
						),
						user.NewHumanRefreshTokenRemovedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID2",
						),
					),
				),
			},
			args{
				context.Background(),
				"userID",
				"orgID",
				[]string{"tokenID", "tokenID2"},
			},
			res{
				err: zerrors.IsInternal,
			},
		},
		{
			"revoke, ok",
			fields{
				eventstore: eventstoreExpect(t,
					expectFilter(
						eventFromEventPusher(user.NewHumanRefreshTokenAddedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID",
							"clientID",
							"agentID",
							"de",
							[]string{"clientID1"},
							[]string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
							[]string{"password"},
							time.Now(),
							1*time.Hour,
							10*time.Hour,
							nil,
						)),
					),
					expectFilter(
						eventFromEventPusher(user.NewHumanRefreshTokenAddedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID2",
							"clientID2",
							"agentID",
							"de",
							[]string{"clientID2"},
							[]string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
							[]string{"password"},
							time.Now(),
							1*time.Hour,
							10*time.Hour,
							nil,
						)),
					),
					expectPush(
						user.NewHumanRefreshTokenRemovedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID",
						),
						user.NewHumanRefreshTokenRemovedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID2",
						),
					),
				),
			},
			args{
				context.Background(),
				"userID",
				"orgID",
				[]string{"tokenID", "tokenID2"},
			},
			res{
				err: nil,
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			c := &Commands{
				eventstore: tt.fields.eventstore,
			}
			err := c.RevokeRefreshTokens(tt.args.ctx, tt.args.userID, tt.args.orgID, tt.args.tokenIDs)
			if tt.res.err == nil {
				assert.NoError(t, err)
			}
			if tt.res.err != nil && !tt.res.err(err) {
				t.Errorf("got wrong err: %v ", err)
			}
		})
	}
}

func refreshTokenEncryptionAlgorithm(ctrl *gomock.Controller) crypto.EncryptionAlgorithm {
	mCrypto := crypto.NewMockEncryptionAlgorithm(ctrl)
	mCrypto.EXPECT().Algorithm().AnyTimes().Return("enc")
	mCrypto.EXPECT().EncryptionKeyID().AnyTimes().Return("id")
	mCrypto.EXPECT().Encrypt(gomock.Any()).AnyTimes().DoAndReturn(
		func(refrehToken []byte) ([]byte, error) {
			return refrehToken, nil
		},
	)
	mCrypto.EXPECT().Decrypt(gomock.Any(), gomock.Any()).AnyTimes().DoAndReturn(
		func(refrehToken []byte, keyID string) ([]byte, error) {
			if keyID != "id" {
				return nil, zerrors.ThrowInternal(nil, "id", "invalid key id")
			}
			return refrehToken, nil
		},
	)
	return mCrypto
}

func TestCommands_addRefreshToken(t *testing.T) {
	authTime := time.Now().Add(-1 * time.Hour)
	type fields struct {
		eventstore   *eventstore.Eventstore
		keyAlgorithm crypto.EncryptionAlgorithm
	}
	type args struct {
		ctx                   context.Context
		accessToken           *domain.Token
		authMethodsReferences []string
		authTime              time.Time
		idleExpiration        time.Duration
		expiration            time.Duration
		actor                 *domain.TokenActor
	}
	type res struct {
		event        *user.HumanRefreshTokenAddedEvent
		refreshToken string
		err          func(error) bool
	}
	tests := []struct {
		name   string
		fields fields
		args   args
		res    res
	}{

		{
			name: "add refresh Token",
			fields: fields{
				eventstore:   eventstoreExpect(t),
				keyAlgorithm: refreshTokenEncryptionAlgorithm(gomock.NewController(t)),
			},
			args: args{
				ctx: context.Background(),
				accessToken: &domain.Token{
					ObjectRoot: models.ObjectRoot{
						AggregateID:   "userID",
						ResourceOwner: "org1",
					},
					TokenID:           "accessTokenID1",
					ApplicationID:     "clientID",
					UserAgentID:       "agentID",
					RefreshTokenID:    "refreshTokenID",
					Audience:          []string{"clientID1"},
					Expiration:        time.Now().Add(5 * time.Minute),
					Scopes:            []string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
					PreferredLanguage: "de",
				},
				authMethodsReferences: []string{"password"},
				authTime:              authTime,
				idleExpiration:        1 * time.Hour,
				expiration:            10 * time.Hour,
			},
			res: res{
				event: user.NewHumanRefreshTokenAddedEvent(
					context.Background(),
					&user.NewAggregate("userID", "org1").Aggregate,
					"refreshTokenID",
					"clientID",
					"agentID",
					"de",
					[]string{"clientID1"},
					[]string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
					[]string{"password"},
					authTime,
					1*time.Hour,
					10*time.Hour,
					nil,
				),
				refreshToken: base64.RawURLEncoding.EncodeToString([]byte("userID:refreshTokenID:refreshTokenID")),
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			c := &Commands{
				eventstore:   tt.fields.eventstore,
				keyAlgorithm: tt.fields.keyAlgorithm,
			}
			gotEvent, gotRefreshToken, err := c.addRefreshToken(tt.args.ctx, tt.args.accessToken, tt.args.authMethodsReferences, tt.args.authTime, tt.args.idleExpiration, tt.args.expiration, tt.args.actor)
			if tt.res.err == nil {
				assert.NoError(t, err)
			}
			if tt.res.err != nil && !tt.res.err(err) {
				t.Errorf("got wrong err: %v ", err)
			}
			if tt.res.err == nil {
				assert.Equal(t, tt.res.event, gotEvent)
				assert.Equal(t, tt.res.refreshToken, gotRefreshToken)
			}
		})
	}
}

func TestCommands_renewRefreshToken(t *testing.T) {
	type fields struct {
		eventstore   *eventstore.Eventstore
		idGenerator  id.Generator
		keyAlgorithm crypto.EncryptionAlgorithm
	}
	type args struct {
		ctx            context.Context
		userID         string
		orgID          string
		refreshToken   string
		idleExpiration time.Duration
	}
	type res struct {
		event           *user.HumanRefreshTokenRenewedEvent
		refreshTokenID  string
		newRefreshToken string
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		want    *renewedRefreshToken
		wantErr func(error) bool
	}{
		{
			name: "empty token, error",
			fields: fields{
				eventstore: eventstoreExpect(t),
			},
			args: args{
				ctx: context.Background(),
			},
			wantErr: zerrors.IsErrorInvalidArgument,
		},
		{
			name: "invalid token, error",
			fields: fields{
				eventstore:   eventstoreExpect(t),
				keyAlgorithm: refreshTokenEncryptionAlgorithm(gomock.NewController(t)),
			},
			args: args{
				ctx:          context.Background(),
				refreshToken: "invalid",
			},
			wantErr: zerrors.IsErrorInvalidArgument,
		},
		{
			name: "invalid token (invalid userID), error",
			fields: fields{
				eventstore:   eventstoreExpect(t),
				keyAlgorithm: refreshTokenEncryptionAlgorithm(gomock.NewController(t)),
			},
			args: args{
				ctx:          context.Background(),
				userID:       "userID",
				orgID:        "orgID",
				refreshToken: base64.RawURLEncoding.EncodeToString([]byte("userID2:tokenID:token")),
			},
			wantErr: zerrors.IsErrorInvalidArgument,
		},
		{
			name: "token inactive, error",
			fields: fields{
				eventstore: eventstoreExpect(t,
					expectFilter(
						eventFromEventPusher(user.NewHumanRefreshTokenAddedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID",
							"applicationID",
							"userAgentID",
							"de",
							[]string{"clientID1"},
							[]string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
							[]string{"password"},
							time.Now(),
							1*time.Hour,
							24*time.Hour,
							nil,
						)),
						eventFromEventPusher(user.NewHumanRefreshTokenRemovedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID",
						)),
					),
				),
				keyAlgorithm: refreshTokenEncryptionAlgorithm(gomock.NewController(t)),
			},
			args: args{
				ctx:          context.Background(),
				userID:       "userID",
				orgID:        "orgID",
				refreshToken: base64.RawURLEncoding.EncodeToString([]byte("userID:tokenID:token")),
			},
			wantErr: zerrors.IsErrorInvalidArgument,
		},
		{
			name: "token expired, error",
			fields: fields{
				eventstore: eventstoreExpect(t,
					expectFilter(
						eventFromEventPusher(user.NewHumanRefreshTokenAddedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID",
							"applicationID",
							"userAgentID",
							"de",
							[]string{"clientID1"},
							[]string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
							[]string{"password"},
							time.Now(),
							1*time.Hour,
							24*time.Hour,
							nil,
						)),
					),
				),
				keyAlgorithm: refreshTokenEncryptionAlgorithm(gomock.NewController(t)),
			},
			args: args{
				ctx:          context.Background(),
				userID:       "userID",
				orgID:        "orgID",
				refreshToken: base64.RawURLEncoding.EncodeToString([]byte("userID:tokenID:tokenID")),
			},
			wantErr: zerrors.IsErrorInvalidArgument,
		},
		{
			name: "user deactivated, error",
			fields: fields{
				eventstore: eventstoreExpect(t,
					expectFilter(
						eventFromEventPusherWithCreationDateNow(user.NewHumanRefreshTokenAddedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID",
							"applicationID",
							"userAgentID",
							"de",
							[]string{"clientID1"},
							[]string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
							[]string{"password"},
							time.Now(),
							1*time.Hour,
							24*time.Hour,
							nil,
						)),
						eventFromEventPusher(
							user.NewUserDeactivatedEvent(
								context.Background(),
								&user.NewAggregate("userID", "orgID").Aggregate,
							),
						),
					),
				),
				keyAlgorithm: refreshTokenEncryptionAlgorithm(gomock.NewController(t)),
			},
			args: args{
				ctx:            context.Background(),
				userID:         "userID",
				orgID:          "orgID",
				refreshToken:   base64.RawURLEncoding.EncodeToString([]byte("userID:tokenID:tokenID")),
				idleExpiration: 1 * time.Hour,
			},
			wantErr: zerrors.IsErrorInvalidArgument,
		},
		{
			name: "user signedout, error",
			fields: fields{
				eventstore: eventstoreExpect(t,
					expectFilter(
						eventFromEventPusherWithCreationDateNow(user.NewHumanRefreshTokenAddedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID",
							"applicationID",
							"userAgentID",
							"de",
							[]string{"clientID1"},
							[]string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
							[]string{"password"},
							time.Now(),
							1*time.Hour,
							24*time.Hour,
							nil,
						)),
						eventFromEventPusher(
							user.NewHumanSignedOutEvent(
								context.Background(),
								&user.NewAggregate("userID", "orgID").Aggregate,
								"userAgentID",
							),
						),
					),
				),
				keyAlgorithm: refreshTokenEncryptionAlgorithm(gomock.NewController(t)),
			},
			args: args{
				ctx:            context.Background(),
				userID:         "userID",
				orgID:          "orgID",
				refreshToken:   base64.RawURLEncoding.EncodeToString([]byte("userID:tokenID:tokenID")),
				idleExpiration: 1 * time.Hour,
			},
			wantErr: zerrors.IsErrorInvalidArgument,
		},
		{
			name: "token renewed, ok",
			fields: fields{
				eventstore: eventstoreExpect(t,
					expectFilter(
						eventFromEventPusherWithCreationDateNow(user.NewHumanRefreshTokenAddedEvent(
							context.Background(),
							&user.NewAggregate("userID", "orgID").Aggregate,
							"tokenID",
							"applicationID",
							"userAgentID",
							"de",
							[]string{"clientID1"},
							[]string{oidc.ScopeOpenID, oidc.ScopeProfile, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
							[]string{"password"},
							time.Now(),
							1*time.Hour,
							24*time.Hour,
							nil,
						)),
					),
				),
				keyAlgorithm: refreshTokenEncryptionAlgorithm(gomock.NewController(t)),
				idGenerator:  id_mock.NewIDGeneratorExpectIDs(t, "refreshToken1"),
			},
			args: args{
				ctx:            context.Background(),
				userID:         "userID",
				orgID:          "orgID",
				refreshToken:   base64.RawURLEncoding.EncodeToString([]byte("userID:tokenID:tokenID")),
				idleExpiration: 1 * time.Hour,
			},
			want: &renewedRefreshToken{
				event: user.NewHumanRefreshTokenRenewedEvent(
					context.Background(),
					&user.NewAggregate("userID", "orgID").Aggregate,
					"tokenID",
					"refreshToken1",
					1*time.Hour,
				),
				authMethodsReferences: []string{"password"},
				tokenID:               "tokenID",
				token:                 base64.RawURLEncoding.EncodeToString([]byte("userID:tokenID:refreshToken1")),
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			c := &Commands{
				eventstore:   tt.fields.eventstore,
				idGenerator:  tt.fields.idGenerator,
				keyAlgorithm: tt.fields.keyAlgorithm,
			}
			got, err := c.renewRefreshToken(tt.args.ctx, tt.args.userID, tt.args.orgID, tt.args.refreshToken, tt.args.idleExpiration)
			if tt.wantErr != nil && !tt.wantErr(err) {
				t.Errorf("got wrong err: %v ", err)
			}
			if tt.wantErr == nil {
				require.NoError(t, err)
				assert.Equal(t, tt.want.event, got.event)
				assert.Equal(t, tt.want.authMethodsReferences, got.authMethodsReferences)
				assert.Equal(t, tt.want.tokenID, got.tokenID)
				assert.Equal(t, tt.want.token, got.token)
			}
		})
	}
}
