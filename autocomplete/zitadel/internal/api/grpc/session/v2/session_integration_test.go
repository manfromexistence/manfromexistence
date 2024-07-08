//go:build integration

package session_test

import (
	"context"
	"fmt"
	"os"
	"testing"
	"time"

	"github.com/muhlemmer/gu"
	"github.com/pquerna/otp/totp"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/metadata"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/timestamppb"

	"github.com/zitadel/zitadel/internal/integration"
	object "github.com/zitadel/zitadel/pkg/grpc/object/v2beta"
	session "github.com/zitadel/zitadel/pkg/grpc/session/v2beta"
	user "github.com/zitadel/zitadel/pkg/grpc/user/v2beta"
)

var (
	CTX             context.Context
	Tester          *integration.Tester
	Client          session.SessionServiceClient
	User            *user.AddHumanUserResponse
	DeactivatedUser *user.AddHumanUserResponse
	LockedUser      *user.AddHumanUserResponse
)

func TestMain(m *testing.M) {
	os.Exit(func() int {
		ctx, errCtx, cancel := integration.Contexts(5 * time.Minute)
		defer cancel()

		Tester = integration.NewTester(ctx)
		defer Tester.Done()
		Client = Tester.Client.SessionV2

		CTX, _ = Tester.WithAuthorization(ctx, integration.OrgOwner), errCtx
		User = Tester.CreateHumanUser(CTX)
		Tester.Client.UserV2.VerifyEmail(CTX, &user.VerifyEmailRequest{
			UserId:           User.GetUserId(),
			VerificationCode: User.GetEmailCode(),
		})
		Tester.Client.UserV2.VerifyPhone(CTX, &user.VerifyPhoneRequest{
			UserId:           User.GetUserId(),
			VerificationCode: User.GetPhoneCode(),
		})
		Tester.SetUserPassword(CTX, User.GetUserId(), integration.UserPassword, false)
		Tester.RegisterUserPasskey(CTX, User.GetUserId())
		DeactivatedUser = Tester.CreateHumanUser(CTX)
		Tester.Client.UserV2.DeactivateUser(CTX, &user.DeactivateUserRequest{UserId: DeactivatedUser.GetUserId()})
		LockedUser = Tester.CreateHumanUser(CTX)
		Tester.Client.UserV2.LockUser(CTX, &user.LockUserRequest{UserId: LockedUser.GetUserId()})
		return m.Run()
	}())
}

func verifyCurrentSession(t testing.TB, id, token string, sequence uint64, window time.Duration, metadata map[string][]byte, userAgent *session.UserAgent, expirationWindow time.Duration, factors ...wantFactor) *session.Session {
	t.Helper()
	require.NotEmpty(t, id)
	require.NotEmpty(t, token)

	resp, err := Client.GetSession(CTX, &session.GetSessionRequest{
		SessionId:    id,
		SessionToken: &token,
	})
	require.NoError(t, err)
	s := resp.GetSession()

	assert.Equal(t, id, s.GetId())
	assert.WithinRange(t, s.GetCreationDate().AsTime(), time.Now().Add(-window), time.Now().Add(window))
	assert.WithinRange(t, s.GetChangeDate().AsTime(), time.Now().Add(-window), time.Now().Add(window))
	assert.Equal(t, sequence, s.GetSequence())
	assert.Equal(t, metadata, s.GetMetadata())

	if !proto.Equal(userAgent, s.GetUserAgent()) {
		t.Errorf("user agent =\n%v\nwant\n%v", s.GetUserAgent(), userAgent)
	}
	if expirationWindow == 0 {
		assert.Nil(t, s.GetExpirationDate())
	} else {
		assert.WithinRange(t, s.GetExpirationDate().AsTime(), time.Now().Add(-expirationWindow), time.Now().Add(expirationWindow))
	}

	verifyFactors(t, s.GetFactors(), window, factors)
	return s
}

type wantFactor int

const (
	wantUserFactor wantFactor = iota
	wantPasswordFactor
	wantWebAuthNFactor
	wantWebAuthNFactorUserVerified
	wantTOTPFactor
	wantIntentFactor
	wantOTPSMSFactor
	wantOTPEmailFactor
)

func verifyFactors(t testing.TB, factors *session.Factors, window time.Duration, want []wantFactor) {
	for _, w := range want {
		switch w {
		case wantUserFactor:
			uf := factors.GetUser()
			assert.NotNil(t, uf)
			assert.WithinRange(t, uf.GetVerifiedAt().AsTime(), time.Now().Add(-window), time.Now().Add(window))
			assert.Equal(t, User.GetUserId(), uf.GetId())
		case wantPasswordFactor:
			pf := factors.GetPassword()
			assert.NotNil(t, pf)
			assert.WithinRange(t, pf.GetVerifiedAt().AsTime(), time.Now().Add(-window), time.Now().Add(window))
		case wantWebAuthNFactor:
			pf := factors.GetWebAuthN()
			assert.NotNil(t, pf)
			assert.WithinRange(t, pf.GetVerifiedAt().AsTime(), time.Now().Add(-window), time.Now().Add(window))
			assert.False(t, pf.GetUserVerified())
		case wantWebAuthNFactorUserVerified:
			pf := factors.GetWebAuthN()
			assert.NotNil(t, pf)
			assert.WithinRange(t, pf.GetVerifiedAt().AsTime(), time.Now().Add(-window), time.Now().Add(window))
			assert.True(t, pf.GetUserVerified())
		case wantTOTPFactor:
			pf := factors.GetTotp()
			assert.NotNil(t, pf)
			assert.WithinRange(t, pf.GetVerifiedAt().AsTime(), time.Now().Add(-window), time.Now().Add(window))
		case wantIntentFactor:
			pf := factors.GetIntent()
			assert.NotNil(t, pf)
			assert.WithinRange(t, pf.GetVerifiedAt().AsTime(), time.Now().Add(-window), time.Now().Add(window))
		case wantOTPSMSFactor:
			pf := factors.GetOtpSms()
			assert.NotNil(t, pf)
			assert.WithinRange(t, pf.GetVerifiedAt().AsTime(), time.Now().Add(-window), time.Now().Add(window))
		case wantOTPEmailFactor:
			pf := factors.GetOtpEmail()
			assert.NotNil(t, pf)
			assert.WithinRange(t, pf.GetVerifiedAt().AsTime(), time.Now().Add(-window), time.Now().Add(window))
		}
	}
}

func TestServer_CreateSession(t *testing.T) {
	tests := []struct {
		name                 string
		req                  *session.CreateSessionRequest
		want                 *session.CreateSessionResponse
		wantErr              bool
		wantFactors          []wantFactor
		wantUserAgent        *session.UserAgent
		wantExpirationWindow time.Duration
	}{
		{
			name: "empty session",
			req: &session.CreateSessionRequest{
				Metadata: map[string][]byte{"foo": []byte("bar")},
			},
			want: &session.CreateSessionResponse{
				Details: &object.Details{
					ChangeDate:    timestamppb.Now(),
					ResourceOwner: Tester.Instance.InstanceID(),
				},
			},
		},
		{
			name: "user agent",
			req: &session.CreateSessionRequest{
				Metadata: map[string][]byte{"foo": []byte("bar")},
				UserAgent: &session.UserAgent{
					FingerprintId: gu.Ptr("fingerPrintID"),
					Ip:            gu.Ptr("1.2.3.4"),
					Description:   gu.Ptr("Description"),
					Header: map[string]*session.UserAgent_HeaderValues{
						"foo": {Values: []string{"foo", "bar"}},
					},
				},
			},
			want: &session.CreateSessionResponse{
				Details: &object.Details{
					ChangeDate:    timestamppb.Now(),
					ResourceOwner: Tester.Instance.InstanceID(),
				},
			},
			wantUserAgent: &session.UserAgent{
				FingerprintId: gu.Ptr("fingerPrintID"),
				Ip:            gu.Ptr("1.2.3.4"),
				Description:   gu.Ptr("Description"),
				Header: map[string]*session.UserAgent_HeaderValues{
					"foo": {Values: []string{"foo", "bar"}},
				},
			},
		},
		{
			name: "negative lifetime",
			req: &session.CreateSessionRequest{
				Metadata: map[string][]byte{"foo": []byte("bar")},
				Lifetime: durationpb.New(-5 * time.Minute),
			},
			wantErr: true,
		},
		{
			name: "lifetime",
			req: &session.CreateSessionRequest{
				Metadata: map[string][]byte{"foo": []byte("bar")},
				Lifetime: durationpb.New(5 * time.Minute),
			},
			want: &session.CreateSessionResponse{
				Details: &object.Details{
					ChangeDate:    timestamppb.Now(),
					ResourceOwner: Tester.Instance.InstanceID(),
				},
			},
			wantExpirationWindow: 5 * time.Minute,
		},
		{
			name: "with user",
			req: &session.CreateSessionRequest{
				Checks: &session.Checks{
					User: &session.CheckUser{
						Search: &session.CheckUser_UserId{
							UserId: User.GetUserId(),
						},
					},
				},
				Metadata: map[string][]byte{"foo": []byte("bar")},
			},
			want: &session.CreateSessionResponse{
				Details: &object.Details{
					ChangeDate:    timestamppb.Now(),
					ResourceOwner: Tester.Instance.InstanceID(),
				},
			},
			wantFactors: []wantFactor{wantUserFactor},
		},
		{
			name: "deactivated user",
			req: &session.CreateSessionRequest{
				Checks: &session.Checks{
					User: &session.CheckUser{
						Search: &session.CheckUser_UserId{
							UserId: DeactivatedUser.GetUserId(),
						},
					},
				},
			},
			wantErr: true,
		},
		{
			name: "locked user",
			req: &session.CreateSessionRequest{
				Checks: &session.Checks{
					User: &session.CheckUser{
						Search: &session.CheckUser_UserId{
							UserId: LockedUser.GetUserId(),
						},
					},
				},
			},
			wantErr: true,
		},
		{
			name: "password without user error",
			req: &session.CreateSessionRequest{
				Checks: &session.Checks{
					Password: &session.CheckPassword{
						Password: "Difficult",
					},
				},
			},
			wantErr: true,
		},
		{
			name: "passkey without user error",
			req: &session.CreateSessionRequest{
				Challenges: &session.RequestChallenges{
					WebAuthN: &session.RequestChallenges_WebAuthN{
						Domain:                      Tester.Config.ExternalDomain,
						UserVerificationRequirement: session.UserVerificationRequirement_USER_VERIFICATION_REQUIREMENT_REQUIRED,
					},
				},
			},
			wantErr: true,
		},
		{
			name: "passkey without domain (not registered) error",
			req: &session.CreateSessionRequest{
				Checks: &session.Checks{
					User: &session.CheckUser{
						Search: &session.CheckUser_UserId{
							UserId: User.GetUserId(),
						},
					},
				},
				Challenges: &session.RequestChallenges{
					WebAuthN: &session.RequestChallenges_WebAuthN{
						UserVerificationRequirement: session.UserVerificationRequirement_USER_VERIFICATION_REQUIREMENT_REQUIRED,
					},
				},
			},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := Client.CreateSession(CTX, tt.req)
			if tt.wantErr {
				require.Error(t, err)
				return
			}
			require.NoError(t, err)
			integration.AssertDetails(t, tt.want, got)

			verifyCurrentSession(t, got.GetSessionId(), got.GetSessionToken(), got.GetDetails().GetSequence(), time.Minute, tt.req.GetMetadata(), tt.wantUserAgent, tt.wantExpirationWindow, tt.wantFactors...)
		})
	}
}

func TestServer_CreateSession_webauthn(t *testing.T) {
	// create new session with user and request the webauthn challenge
	createResp, err := Client.CreateSession(CTX, &session.CreateSessionRequest{
		Checks: &session.Checks{
			User: &session.CheckUser{
				Search: &session.CheckUser_UserId{
					UserId: User.GetUserId(),
				},
			},
		},
		Challenges: &session.RequestChallenges{
			WebAuthN: &session.RequestChallenges_WebAuthN{
				Domain:                      Tester.Config.ExternalDomain,
				UserVerificationRequirement: session.UserVerificationRequirement_USER_VERIFICATION_REQUIREMENT_REQUIRED,
			},
		},
	})
	require.NoError(t, err)
	verifyCurrentSession(t, createResp.GetSessionId(), createResp.GetSessionToken(), createResp.GetDetails().GetSequence(), time.Minute, nil, nil, 0)

	assertionData, err := Tester.WebAuthN.CreateAssertionResponse(createResp.GetChallenges().GetWebAuthN().GetPublicKeyCredentialRequestOptions(), true)
	require.NoError(t, err)

	// update the session with webauthn assertion data
	updateResp, err := Client.SetSession(CTX, &session.SetSessionRequest{
		SessionId:    createResp.GetSessionId(),
		SessionToken: createResp.GetSessionToken(),
		Checks: &session.Checks{
			WebAuthN: &session.CheckWebAuthN{
				CredentialAssertionData: assertionData,
			},
		},
	})
	require.NoError(t, err)
	verifyCurrentSession(t, createResp.GetSessionId(), updateResp.GetSessionToken(), updateResp.GetDetails().GetSequence(), time.Minute, nil, nil, 0, wantUserFactor, wantWebAuthNFactorUserVerified)
}

func TestServer_CreateSession_successfulIntent(t *testing.T) {
	idpID := Tester.AddGenericOAuthProvider(t)

	createResp, err := Client.CreateSession(CTX, &session.CreateSessionRequest{
		Checks: &session.Checks{
			User: &session.CheckUser{
				Search: &session.CheckUser_UserId{
					UserId: User.GetUserId(),
				},
			},
		},
	})
	require.NoError(t, err)
	verifyCurrentSession(t, createResp.GetSessionId(), createResp.GetSessionToken(), createResp.GetDetails().GetSequence(), time.Minute, nil, nil, 0)

	intentID, token, _, _ := Tester.CreateSuccessfulOAuthIntent(t, idpID, User.GetUserId(), "id")
	updateResp, err := Client.SetSession(CTX, &session.SetSessionRequest{
		SessionId:    createResp.GetSessionId(),
		SessionToken: createResp.GetSessionToken(),
		Checks: &session.Checks{
			IdpIntent: &session.CheckIDPIntent{
				IdpIntentId:    intentID,
				IdpIntentToken: token,
			},
		},
	})
	require.NoError(t, err)
	verifyCurrentSession(t, createResp.GetSessionId(), updateResp.GetSessionToken(), updateResp.GetDetails().GetSequence(), time.Minute, nil, nil, 0, wantUserFactor, wantIntentFactor)
}

func TestServer_CreateSession_successfulIntent_instant(t *testing.T) {
	idpID := Tester.AddGenericOAuthProvider(t)

	intentID, token, _, _ := Tester.CreateSuccessfulOAuthIntent(t, idpID, User.GetUserId(), "id")
	createResp, err := Client.CreateSession(CTX, &session.CreateSessionRequest{
		Checks: &session.Checks{
			User: &session.CheckUser{
				Search: &session.CheckUser_UserId{
					UserId: User.GetUserId(),
				},
			},
			IdpIntent: &session.CheckIDPIntent{
				IdpIntentId:    intentID,
				IdpIntentToken: token,
			},
		},
	})
	require.NoError(t, err)
	verifyCurrentSession(t, createResp.GetSessionId(), createResp.GetSessionToken(), createResp.GetDetails().GetSequence(), time.Minute, nil, nil, 0, wantUserFactor, wantIntentFactor)
}

func TestServer_CreateSession_successfulIntentUnknownUserID(t *testing.T) {
	idpID := Tester.AddGenericOAuthProvider(t)

	createResp, err := Client.CreateSession(CTX, &session.CreateSessionRequest{
		Checks: &session.Checks{
			User: &session.CheckUser{
				Search: &session.CheckUser_UserId{
					UserId: User.GetUserId(),
				},
			},
		},
	})
	require.NoError(t, err)
	verifyCurrentSession(t, createResp.GetSessionId(), createResp.GetSessionToken(), createResp.GetDetails().GetSequence(), time.Minute, nil, nil, 0)

	idpUserID := "id"
	intentID, token, _, _ := Tester.CreateSuccessfulOAuthIntent(t, idpID, "", idpUserID)
	updateResp, err := Client.SetSession(CTX, &session.SetSessionRequest{
		SessionId:    createResp.GetSessionId(),
		SessionToken: createResp.GetSessionToken(),
		Checks: &session.Checks{
			IdpIntent: &session.CheckIDPIntent{
				IdpIntentId:    intentID,
				IdpIntentToken: token,
			},
		},
	})
	require.Error(t, err)
	Tester.CreateUserIDPlink(CTX, User.GetUserId(), idpUserID, idpID, User.GetUserId())
	updateResp, err = Client.SetSession(CTX, &session.SetSessionRequest{
		SessionId:    createResp.GetSessionId(),
		SessionToken: createResp.GetSessionToken(),
		Checks: &session.Checks{
			IdpIntent: &session.CheckIDPIntent{
				IdpIntentId:    intentID,
				IdpIntentToken: token,
			},
		},
	})
	require.NoError(t, err)
	verifyCurrentSession(t, createResp.GetSessionId(), updateResp.GetSessionToken(), updateResp.GetDetails().GetSequence(), time.Minute, nil, nil, 0, wantUserFactor, wantIntentFactor)
}

func TestServer_CreateSession_startedIntentFalseToken(t *testing.T) {
	idpID := Tester.AddGenericOAuthProvider(t)

	createResp, err := Client.CreateSession(CTX, &session.CreateSessionRequest{
		Checks: &session.Checks{
			User: &session.CheckUser{
				Search: &session.CheckUser_UserId{
					UserId: User.GetUserId(),
				},
			},
		},
	})
	require.NoError(t, err)
	verifyCurrentSession(t, createResp.GetSessionId(), createResp.GetSessionToken(), createResp.GetDetails().GetSequence(), time.Minute, nil, nil, 0)

	intentID := Tester.CreateIntent(t, idpID)
	_, err = Client.SetSession(CTX, &session.SetSessionRequest{
		SessionId:    createResp.GetSessionId(),
		SessionToken: createResp.GetSessionToken(),
		Checks: &session.Checks{
			IdpIntent: &session.CheckIDPIntent{
				IdpIntentId:    intentID,
				IdpIntentToken: "false",
			},
		},
	})
	require.Error(t, err)
}

func registerTOTP(ctx context.Context, t *testing.T, userID string) (secret string) {
	resp, err := Tester.Client.UserV2.RegisterTOTP(ctx, &user.RegisterTOTPRequest{
		UserId: userID,
	})
	require.NoError(t, err)
	secret = resp.GetSecret()
	code, err := totp.GenerateCode(secret, time.Now())
	require.NoError(t, err)

	_, err = Tester.Client.UserV2.VerifyTOTPRegistration(ctx, &user.VerifyTOTPRegistrationRequest{
		UserId: userID,
		Code:   code,
	})
	require.NoError(t, err)
	return secret
}

func registerOTPSMS(ctx context.Context, t *testing.T, userID string) {
	_, err := Tester.Client.UserV2.AddOTPSMS(ctx, &user.AddOTPSMSRequest{
		UserId: userID,
	})
	require.NoError(t, err)
}

func registerOTPEmail(ctx context.Context, t *testing.T, userID string) {
	_, err := Tester.Client.UserV2.AddOTPEmail(ctx, &user.AddOTPEmailRequest{
		UserId: userID,
	})
	require.NoError(t, err)
}

func TestServer_SetSession_flow(t *testing.T) {
	// create new, empty session
	createResp, err := Client.CreateSession(CTX, &session.CreateSessionRequest{})
	require.NoError(t, err)
	sessionToken := createResp.GetSessionToken()
	verifyCurrentSession(t, createResp.GetSessionId(), sessionToken, createResp.GetDetails().GetSequence(), time.Minute, nil, nil, 0)

	t.Run("check user", func(t *testing.T) {
		resp, err := Client.SetSession(CTX, &session.SetSessionRequest{
			SessionId:    createResp.GetSessionId(),
			SessionToken: sessionToken,
			Checks: &session.Checks{
				User: &session.CheckUser{
					Search: &session.CheckUser_UserId{
						UserId: User.GetUserId(),
					},
				},
			},
		})
		require.NoError(t, err)
		sessionToken = resp.GetSessionToken()
		verifyCurrentSession(t, createResp.GetSessionId(), sessionToken, resp.GetDetails().GetSequence(), time.Minute, nil, nil, 0, wantUserFactor)
	})

	t.Run("check webauthn, user verified (passkey)", func(t *testing.T) {
		resp, err := Client.SetSession(CTX, &session.SetSessionRequest{
			SessionId:    createResp.GetSessionId(),
			SessionToken: sessionToken,
			Challenges: &session.RequestChallenges{
				WebAuthN: &session.RequestChallenges_WebAuthN{
					Domain:                      Tester.Config.ExternalDomain,
					UserVerificationRequirement: session.UserVerificationRequirement_USER_VERIFICATION_REQUIREMENT_REQUIRED,
				},
			},
		})
		require.NoError(t, err)
		verifyCurrentSession(t, createResp.GetSessionId(), resp.GetSessionToken(), resp.GetDetails().GetSequence(), time.Minute, nil, nil, 0)
		sessionToken = resp.GetSessionToken()

		assertionData, err := Tester.WebAuthN.CreateAssertionResponse(resp.GetChallenges().GetWebAuthN().GetPublicKeyCredentialRequestOptions(), true)
		require.NoError(t, err)

		resp, err = Client.SetSession(CTX, &session.SetSessionRequest{
			SessionId:    createResp.GetSessionId(),
			SessionToken: sessionToken,
			Checks: &session.Checks{
				WebAuthN: &session.CheckWebAuthN{
					CredentialAssertionData: assertionData,
				},
			},
		})
		require.NoError(t, err)
		sessionToken = resp.GetSessionToken()
		verifyCurrentSession(t, createResp.GetSessionId(), sessionToken, resp.GetDetails().GetSequence(), time.Minute, nil, nil, 0, wantUserFactor, wantWebAuthNFactorUserVerified)
	})

	userAuthCtx := Tester.WithAuthorizationToken(CTX, sessionToken)
	Tester.RegisterUserU2F(userAuthCtx, User.GetUserId())
	totpSecret := registerTOTP(userAuthCtx, t, User.GetUserId())
	registerOTPSMS(userAuthCtx, t, User.GetUserId())
	registerOTPEmail(userAuthCtx, t, User.GetUserId())

	t.Run("check webauthn, user not verified (U2F)", func(t *testing.T) {

		for _, userVerificationRequirement := range []session.UserVerificationRequirement{
			session.UserVerificationRequirement_USER_VERIFICATION_REQUIREMENT_PREFERRED,
			session.UserVerificationRequirement_USER_VERIFICATION_REQUIREMENT_DISCOURAGED,
		} {
			t.Run(userVerificationRequirement.String(), func(t *testing.T) {
				resp, err := Client.SetSession(CTX, &session.SetSessionRequest{
					SessionId:    createResp.GetSessionId(),
					SessionToken: sessionToken,
					Challenges: &session.RequestChallenges{
						WebAuthN: &session.RequestChallenges_WebAuthN{
							Domain:                      Tester.Config.ExternalDomain,
							UserVerificationRequirement: userVerificationRequirement,
						},
					},
				})
				require.NoError(t, err)
				verifyCurrentSession(t, createResp.GetSessionId(), resp.GetSessionToken(), resp.GetDetails().GetSequence(), time.Minute, nil, nil, 0)
				sessionToken = resp.GetSessionToken()

				assertionData, err := Tester.WebAuthN.CreateAssertionResponse(resp.GetChallenges().GetWebAuthN().GetPublicKeyCredentialRequestOptions(), false)
				require.NoError(t, err)

				resp, err = Client.SetSession(CTX, &session.SetSessionRequest{
					SessionId:    createResp.GetSessionId(),
					SessionToken: sessionToken,
					Checks: &session.Checks{
						WebAuthN: &session.CheckWebAuthN{
							CredentialAssertionData: assertionData,
						},
					},
				})
				require.NoError(t, err)
				sessionToken = resp.GetSessionToken()
				verifyCurrentSession(t, createResp.GetSessionId(), sessionToken, resp.GetDetails().GetSequence(), time.Minute, nil, nil, 0, wantUserFactor, wantWebAuthNFactor)
			})
		}
	})

	t.Run("check TOTP", func(t *testing.T) {
		code, err := totp.GenerateCode(totpSecret, time.Now())
		require.NoError(t, err)
		resp, err := Client.SetSession(CTX, &session.SetSessionRequest{
			SessionId:    createResp.GetSessionId(),
			SessionToken: sessionToken,
			Checks: &session.Checks{
				Totp: &session.CheckTOTP{
					Code: code,
				},
			},
		})
		require.NoError(t, err)
		sessionToken = resp.GetSessionToken()
		verifyCurrentSession(t, createResp.GetSessionId(), sessionToken, resp.GetDetails().GetSequence(), time.Minute, nil, nil, 0, wantUserFactor, wantWebAuthNFactor, wantTOTPFactor)
	})

	t.Run("check OTP SMS", func(t *testing.T) {
		resp, err := Client.SetSession(CTX, &session.SetSessionRequest{
			SessionId:    createResp.GetSessionId(),
			SessionToken: sessionToken,
			Challenges: &session.RequestChallenges{
				OtpSms: &session.RequestChallenges_OTPSMS{ReturnCode: true},
			},
		})
		require.NoError(t, err)
		verifyCurrentSession(t, createResp.GetSessionId(), resp.GetSessionToken(), resp.GetDetails().GetSequence(), time.Minute, nil, nil, 0)
		sessionToken = resp.GetSessionToken()

		otp := resp.GetChallenges().GetOtpSms()
		require.NotEmpty(t, otp)

		resp, err = Client.SetSession(CTX, &session.SetSessionRequest{
			SessionId:    createResp.GetSessionId(),
			SessionToken: sessionToken,
			Checks: &session.Checks{
				OtpSms: &session.CheckOTP{
					Code: otp,
				},
			},
		})
		require.NoError(t, err)
		sessionToken = resp.GetSessionToken()
		verifyCurrentSession(t, createResp.GetSessionId(), sessionToken, resp.GetDetails().GetSequence(), time.Minute, nil, nil, 0, wantUserFactor, wantWebAuthNFactor, wantOTPSMSFactor)
	})

	t.Run("check OTP Email", func(t *testing.T) {
		resp, err := Client.SetSession(CTX, &session.SetSessionRequest{
			SessionId:    createResp.GetSessionId(),
			SessionToken: sessionToken,
			Challenges: &session.RequestChallenges{
				OtpEmail: &session.RequestChallenges_OTPEmail{
					DeliveryType: &session.RequestChallenges_OTPEmail_ReturnCode_{},
				},
			},
		})
		require.NoError(t, err)
		verifyCurrentSession(t, createResp.GetSessionId(), resp.GetSessionToken(), resp.GetDetails().GetSequence(), time.Minute, nil, nil, 0)
		sessionToken = resp.GetSessionToken()

		otp := resp.GetChallenges().GetOtpEmail()
		require.NotEmpty(t, otp)

		resp, err = Client.SetSession(CTX, &session.SetSessionRequest{
			SessionId:    createResp.GetSessionId(),
			SessionToken: sessionToken,
			Checks: &session.Checks{
				OtpEmail: &session.CheckOTP{
					Code: otp,
				},
			},
		})
		require.NoError(t, err)
		sessionToken = resp.GetSessionToken()
		verifyCurrentSession(t, createResp.GetSessionId(), sessionToken, resp.GetDetails().GetSequence(), time.Minute, nil, nil, 0, wantUserFactor, wantWebAuthNFactor, wantOTPEmailFactor)
	})
}

func TestServer_SetSession_expired(t *testing.T) {
	createResp, err := Client.CreateSession(CTX, &session.CreateSessionRequest{
		Lifetime: durationpb.New(20 * time.Second),
	})
	require.NoError(t, err)

	// test session token works
	sessionResp, err := Tester.Client.SessionV2.SetSession(CTX, &session.SetSessionRequest{
		SessionId:    createResp.GetSessionId(),
		SessionToken: createResp.GetSessionToken(),
		Lifetime:     durationpb.New(20 * time.Second),
	})
	require.NoError(t, err)

	// ensure session expires and does not work anymore
	time.Sleep(20 * time.Second)
	_, err = Tester.Client.SessionV2.SetSession(CTX, &session.SetSessionRequest{
		SessionId:    createResp.GetSessionId(),
		SessionToken: sessionResp.GetSessionToken(),
		Lifetime:     durationpb.New(20 * time.Second),
	})
	require.Error(t, err)
}

func TestServer_DeleteSession_token(t *testing.T) {
	createResp, err := Client.CreateSession(CTX, &session.CreateSessionRequest{})
	require.NoError(t, err)

	_, err = Client.DeleteSession(CTX, &session.DeleteSessionRequest{
		SessionId:    createResp.GetSessionId(),
		SessionToken: gu.Ptr("invalid"),
	})
	require.Error(t, err)

	_, err = Client.DeleteSession(CTX, &session.DeleteSessionRequest{
		SessionId:    createResp.GetSessionId(),
		SessionToken: gu.Ptr(createResp.GetSessionToken()),
	})
	require.NoError(t, err)
}

func TestServer_DeleteSession_own_session(t *testing.T) {
	// create two users for the test and a session each to get tokens for authorization
	user1 := Tester.CreateHumanUser(CTX)
	Tester.SetUserPassword(CTX, user1.GetUserId(), integration.UserPassword, false)
	_, token1, _, _ := Tester.CreatePasswordSession(t, CTX, user1.GetUserId(), integration.UserPassword)

	user2 := Tester.CreateHumanUser(CTX)
	Tester.SetUserPassword(CTX, user2.GetUserId(), integration.UserPassword, false)
	_, token2, _, _ := Tester.CreatePasswordSession(t, CTX, user2.GetUserId(), integration.UserPassword)

	// create a new session for the first user
	createResp, err := Client.CreateSession(CTX, &session.CreateSessionRequest{
		Checks: &session.Checks{
			User: &session.CheckUser{
				Search: &session.CheckUser_UserId{
					UserId: user1.GetUserId(),
				},
			},
		},
	})
	require.NoError(t, err)

	// delete the new (user1) session must not be possible with user (has no permission)
	_, err = Client.DeleteSession(Tester.WithAuthorizationToken(context.Background(), token2), &session.DeleteSessionRequest{
		SessionId: createResp.GetSessionId(),
	})
	require.Error(t, err)

	// delete the new (user1) session by themselves
	_, err = Client.DeleteSession(Tester.WithAuthorizationToken(context.Background(), token1), &session.DeleteSessionRequest{
		SessionId: createResp.GetSessionId(),
	})
	require.NoError(t, err)
}

func TestServer_DeleteSession_with_permission(t *testing.T) {
	createResp, err := Client.CreateSession(CTX, &session.CreateSessionRequest{
		Checks: &session.Checks{
			User: &session.CheckUser{
				Search: &session.CheckUser_UserId{
					UserId: User.GetUserId(),
				},
			},
		},
	})
	require.NoError(t, err)

	// delete the new session by ORG_OWNER
	_, err = Client.DeleteSession(Tester.WithAuthorization(context.Background(), integration.OrgOwner), &session.DeleteSessionRequest{
		SessionId: createResp.GetSessionId(),
	})
	require.NoError(t, err)
}

func Test_ZITADEL_API_missing_authentication(t *testing.T) {
	// create new, empty session
	createResp, err := Client.CreateSession(CTX, &session.CreateSessionRequest{})
	require.NoError(t, err)

	ctx := metadata.AppendToOutgoingContext(context.Background(), "Authorization", fmt.Sprintf("Bearer %s", createResp.GetSessionToken()))
	sessionResp, err := Tester.Client.SessionV2.GetSession(ctx, &session.GetSessionRequest{SessionId: createResp.GetSessionId()})
	require.Error(t, err)
	require.Nil(t, sessionResp)
}

func Test_ZITADEL_API_missing_mfa(t *testing.T) {
	id, token, _, _ := Tester.CreatePasswordSession(t, CTX, User.GetUserId(), integration.UserPassword)

	ctx := Tester.WithAuthorizationToken(context.Background(), token)
	sessionResp, err := Tester.Client.SessionV2.GetSession(ctx, &session.GetSessionRequest{SessionId: id})
	require.Error(t, err)
	require.Nil(t, sessionResp)
}

func Test_ZITADEL_API_success(t *testing.T) {
	id, token, _, _ := Tester.CreateVerifiedWebAuthNSession(t, CTX, User.GetUserId())

	ctx := Tester.WithAuthorizationToken(context.Background(), token)
	sessionResp, err := Tester.Client.SessionV2.GetSession(ctx, &session.GetSessionRequest{SessionId: id})
	require.NoError(t, err)

	webAuthN := sessionResp.GetSession().GetFactors().GetWebAuthN()
	require.NotNil(t, id, webAuthN.GetVerifiedAt().AsTime())
	require.True(t, webAuthN.GetUserVerified())
}

func Test_ZITADEL_API_session_not_found(t *testing.T) {
	id, token, _, _ := Tester.CreateVerifiedWebAuthNSession(t, CTX, User.GetUserId())

	// test session token works
	ctx := Tester.WithAuthorizationToken(context.Background(), token)
	_, err := Tester.Client.SessionV2.GetSession(ctx, &session.GetSessionRequest{SessionId: id})
	require.NoError(t, err)

	//terminate the session and test it does not work anymore
	_, err = Tester.Client.SessionV2.DeleteSession(CTX, &session.DeleteSessionRequest{
		SessionId:    id,
		SessionToken: gu.Ptr(token),
	})
	require.NoError(t, err)
	ctx = Tester.WithAuthorizationToken(context.Background(), token)
	_, err = Tester.Client.SessionV2.GetSession(ctx, &session.GetSessionRequest{SessionId: id})
	require.Error(t, err)
}

func Test_ZITADEL_API_session_expired(t *testing.T) {
	id, token, _, _ := Tester.CreateVerifiedWebAuthNSessionWithLifetime(t, CTX, User.GetUserId(), 20*time.Second)

	// test session token works
	ctx := Tester.WithAuthorizationToken(context.Background(), token)
	_, err := Tester.Client.SessionV2.GetSession(ctx, &session.GetSessionRequest{SessionId: id})
	require.NoError(t, err)

	// ensure session expires and does not work anymore
	time.Sleep(20 * time.Second)
	sessionResp, err := Tester.Client.SessionV2.GetSession(ctx, &session.GetSessionRequest{SessionId: id})
	require.Error(t, err)
	require.Nil(t, sessionResp)
}
