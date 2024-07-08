//go:build integration

package oidc_test

import (
	"fmt"
	"strings"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/zitadel/oidc/v3/pkg/client/rp"
	"github.com/zitadel/oidc/v3/pkg/oidc"
	"golang.org/x/oauth2"

	oidc_api "github.com/zitadel/zitadel/internal/api/oidc"
	"github.com/zitadel/zitadel/internal/integration"
	feature "github.com/zitadel/zitadel/pkg/grpc/feature/v2beta"
	"github.com/zitadel/zitadel/pkg/grpc/management"
	oidc_pb "github.com/zitadel/zitadel/pkg/grpc/oidc/v2beta"
)

// TestServer_UserInfo is a top-level test which re-executes the actual
// userinfo integration test against a matrix of different feature flags.
// This ensure that the response of the different implementations remains the same.
func TestServer_UserInfo(t *testing.T) {
	iamOwnerCTX := Tester.WithAuthorization(CTX, integration.IAMOwner)
	t.Cleanup(func() {
		_, err := Tester.Client.FeatureV2.ResetInstanceFeatures(iamOwnerCTX, &feature.ResetInstanceFeaturesRequest{})
		require.NoError(t, err)
	})
	tests := []struct {
		name    string
		legacy  bool
		trigger bool
	}{
		{
			name:   "legacy enabled",
			legacy: true,
		},
		{
			name:    "legacy disabled, trigger disabled",
			legacy:  false,
			trigger: false,
		},
		{
			name:    "legacy disabled, trigger enabled",
			legacy:  false,
			trigger: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			_, err := Tester.Client.FeatureV2.SetInstanceFeatures(iamOwnerCTX, &feature.SetInstanceFeaturesRequest{
				OidcLegacyIntrospection:             &tt.legacy,
				OidcTriggerIntrospectionProjections: &tt.trigger,
			})
			require.NoError(t, err)
			testServer_UserInfo(t)
		})
	}
}

// testServer_UserInfo is the actual userinfo integration test,
// which calls the userinfo endpoint with different client configurations, roles and token scopes.
func testServer_UserInfo(t *testing.T) {
	const role = "testUserRole"
	clientID, projectID := createClient(t)
	_, err := Tester.Client.Mgmt.AddProjectRole(CTX, &management.AddProjectRoleRequest{
		ProjectId:   projectID,
		RoleKey:     role,
		DisplayName: "test",
	})
	require.NoError(t, err)
	_, err = Tester.Client.Mgmt.AddUserGrant(CTX, &management.AddUserGrantRequest{
		UserId:    User.GetUserId(),
		ProjectId: projectID,
		RoleKeys:  []string{role},
	})
	require.NoError(t, err)

	tests := []struct {
		name       string
		prepare    func(t *testing.T, clientID string, scope []string) *oidc.Tokens[*oidc.IDTokenClaims]
		scope      []string
		assertions []func(*testing.T, *oidc.UserInfo)
		wantErr    bool
	}{
		{
			name: "invalid token",
			prepare: func(*testing.T, string, []string) *oidc.Tokens[*oidc.IDTokenClaims] {
				return &oidc.Tokens[*oidc.IDTokenClaims]{
					Token: &oauth2.Token{
						AccessToken: "DEAFBEEFDEADBEEF",
						TokenType:   oidc.BearerToken,
					},
					IDTokenClaims: &oidc.IDTokenClaims{
						TokenClaims: oidc.TokenClaims{
							Subject: User.GetUserId(),
						},
					},
				}
			},
			scope: []string{oidc.ScopeProfile, oidc.ScopeOpenID, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
			assertions: []func(*testing.T, *oidc.UserInfo){
				func(t *testing.T, ui *oidc.UserInfo) {
					assert.Nil(t, ui)
				},
			},
			wantErr: true,
		},
		{
			name:    "standard scopes",
			prepare: getTokens,
			scope:   []string{oidc.ScopeProfile, oidc.ScopeOpenID, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
			assertions: []func(*testing.T, *oidc.UserInfo){
				assertUserinfo,
				func(t *testing.T, ui *oidc.UserInfo) {
					assertNoReservedScopes(t, ui.Claims)
				},
			},
		},
		{
			name: "project role assertion",
			prepare: func(t *testing.T, clientID string, scope []string) *oidc.Tokens[*oidc.IDTokenClaims] {
				_, err := Tester.Client.Mgmt.UpdateProject(CTX, &management.UpdateProjectRequest{
					Id:                   projectID,
					Name:                 fmt.Sprintf("project-%d", time.Now().UnixNano()),
					ProjectRoleAssertion: true,
				})
				require.NoError(t, err)
				t.Cleanup(func() {
					_, err := Tester.Client.Mgmt.UpdateProject(CTX, &management.UpdateProjectRequest{
						Id:                   projectID,
						Name:                 fmt.Sprintf("project-%d", time.Now().UnixNano()),
						ProjectRoleAssertion: false,
					})
					require.NoError(t, err)
				})
				resp, err := Tester.Client.Mgmt.GetProjectByID(CTX, &management.GetProjectByIDRequest{Id: projectID})
				require.NoError(t, err)
				require.True(t, resp.GetProject().GetProjectRoleAssertion(), "project role assertion")

				return getTokens(t, clientID, scope)
			},
			scope: []string{oidc.ScopeProfile, oidc.ScopeOpenID, oidc.ScopeEmail, oidc.ScopeOfflineAccess},
			assertions: []func(*testing.T, *oidc.UserInfo){
				assertUserinfo,
				func(t *testing.T, ui *oidc.UserInfo) {
					assertProjectRoleClaims(t, projectID, ui.Claims, role)
				},
			},
		},
		{
			name:    "projects roles scope",
			prepare: getTokens,
			scope:   []string{oidc.ScopeProfile, oidc.ScopeOpenID, oidc.ScopeEmail, oidc.ScopeOfflineAccess, oidc_api.ScopeProjectRolePrefix + role},
			assertions: []func(*testing.T, *oidc.UserInfo){
				assertUserinfo,
				func(t *testing.T, ui *oidc.UserInfo) {
					assertProjectRoleClaims(t, projectID, ui.Claims, role)
				},
			},
		},
		{
			name: "PAT",
			prepare: func(t *testing.T, clientID string, scope []string) *oidc.Tokens[*oidc.IDTokenClaims] {
				user := Tester.Users.Get(integration.FirstInstanceUsersKey, integration.OrgOwner)
				return &oidc.Tokens[*oidc.IDTokenClaims]{
					Token: &oauth2.Token{
						AccessToken: user.Token,
						TokenType:   oidc.BearerToken,
					},
					IDTokenClaims: &oidc.IDTokenClaims{
						TokenClaims: oidc.TokenClaims{
							Subject: user.ID,
						},
					},
				}
			},
			assertions: []func(*testing.T, *oidc.UserInfo){
				func(t *testing.T, ui *oidc.UserInfo) {
					user := Tester.Users.Get(integration.FirstInstanceUsersKey, integration.OrgOwner)
					assert.Equal(t, user.ID, ui.Subject)
					assert.Equal(t, user.PreferredLoginName, ui.PreferredUsername)
					assert.Equal(t, user.Machine.Name, ui.Name)
					assert.Equal(t, user.ResourceOwner, ui.Claims[oidc_api.ClaimResourceOwnerID])
					assert.NotEmpty(t, ui.Claims[oidc_api.ClaimResourceOwnerName])
					assert.NotEmpty(t, ui.Claims[oidc_api.ClaimResourceOwnerPrimaryDomain])
				},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tokens := tt.prepare(t, clientID, tt.scope)
			provider, err := Tester.CreateRelyingParty(CTX, clientID, redirectURI)
			require.NoError(t, err)
			userinfo, err := rp.Userinfo[*oidc.UserInfo](CTX, tokens.AccessToken, tokens.TokenType, tokens.IDTokenClaims.Subject, provider)
			if tt.wantErr {
				assert.Error(t, err)
				return
			}
			require.NoError(t, err)
			for _, assertion := range tt.assertions {
				assertion(t, userinfo)
			}
		})
	}
}

func getTokens(t *testing.T, clientID string, scope []string) *oidc.Tokens[*oidc.IDTokenClaims] {
	authRequestID := createAuthRequest(t, clientID, redirectURI, scope...)
	sessionID, sessionToken, startTime, changeTime := Tester.CreateVerifiedWebAuthNSession(t, CTXLOGIN, User.GetUserId())
	linkResp, err := Tester.Client.OIDCv2.CreateCallback(CTXLOGIN, &oidc_pb.CreateCallbackRequest{
		AuthRequestId: authRequestID,
		CallbackKind: &oidc_pb.CreateCallbackRequest_Session{
			Session: &oidc_pb.Session{
				SessionId:    sessionID,
				SessionToken: sessionToken,
			},
		},
	})
	require.NoError(t, err)

	// code exchange
	code := assertCodeResponse(t, linkResp.GetCallbackUrl())
	tokens, err := exchangeTokens(t, clientID, code, redirectURI)
	require.NoError(t, err)
	assertTokens(t, tokens, true)
	assertIDTokenClaims(t, tokens.IDTokenClaims, User.GetUserId(), armPasskey, startTime, changeTime)

	return tokens
}

func assertUserinfo(t *testing.T, userinfo *oidc.UserInfo) {
	t.Helper()
	assert.Equal(t, User.GetUserId(), userinfo.Subject)
	assert.Equal(t, "Mickey", userinfo.GivenName)
	assert.Equal(t, "Mouse", userinfo.FamilyName)
	assert.Equal(t, "Mickey Mouse", userinfo.Name)
	assert.NotEmpty(t, userinfo.PreferredUsername)
	assert.Equal(t, userinfo.PreferredUsername, userinfo.Email)
	assert.False(t, bool(userinfo.EmailVerified))
	assertOIDCTime(t, userinfo.UpdatedAt, User.GetDetails().GetChangeDate().AsTime())
}

func assertNoReservedScopes(t *testing.T, claims map[string]any) {
	t.Helper()
	t.Log(claims)
	for claim := range claims {
		assert.Falsef(t, strings.HasPrefix(claim, oidc_api.ClaimPrefix), "claim %s has prefix %s", claim, oidc_api.ClaimPrefix)
	}
}

func assertProjectRoleClaims(t *testing.T, projectID string, claims map[string]any, roles ...string) {
	t.Helper()
	projectIDRoleClaim := fmt.Sprintf(oidc_api.ClaimProjectRolesFormat, projectID)
	for _, claim := range []string{oidc_api.ClaimProjectRoles, projectIDRoleClaim} {
		roleMap, ok := claims[claim].(map[string]any)
		require.Truef(t, ok, "claim %s not found or wrong type %T", claim, claims[claim])
		for _, roleKey := range roles {
			role, ok := roleMap[roleKey].(map[string]any)
			require.Truef(t, ok, "role %s not found or wrong type %T", roleKey, roleMap[roleKey])
			assert.Equal(t, role[Tester.Organisation.ID], Tester.Organisation.Domain, "org domain in role")
		}
	}
}
