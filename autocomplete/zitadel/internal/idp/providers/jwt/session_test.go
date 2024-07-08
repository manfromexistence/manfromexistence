package jwt

import (
	"context"
	"encoding/json"
	"errors"
	"testing"
	"time"

	"github.com/go-jose/go-jose/v4"
	"github.com/h2non/gock"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/zitadel/oidc/v3/pkg/oidc"
	"go.uber.org/mock/gomock"
	"golang.org/x/oauth2"
	"golang.org/x/text/language"

	"github.com/zitadel/zitadel/internal/crypto"
	"github.com/zitadel/zitadel/internal/domain"
)

func TestSession_FetchUser(t *testing.T) {
	type fields struct {
		name          string
		issuer        string
		jwtEndpoint   string
		keysEndpoint  string
		headerName    string
		encryptionAlg func(t *testing.T) crypto.EncryptionAlgorithm
		httpMock      func(issuer string)
		authURL       string
		tokens        *oidc.Tokens[*oidc.IDTokenClaims]
	}
	type want struct {
		err               func(error) bool
		id                string
		firstName         string
		lastName          string
		displayName       string
		nickName          string
		preferredUsername string
		email             string
		isEmailVerified   bool
		phone             string
		isPhoneVerified   bool
		preferredLanguage language.Tag
		avatarURL         string
		profile           string
	}
	tests := []struct {
		name   string
		fields fields
		want   want
	}{
		{
			name: "no tokens",
			fields: fields{
				issuer:       "https://jwt.com",
				jwtEndpoint:  "https://auth.com/jwt",
				keysEndpoint: "https://jwt.com/keys",
				headerName:   "jwt-header",
				encryptionAlg: func(t *testing.T) crypto.EncryptionAlgorithm {
					return crypto.CreateMockEncryptionAlg(gomock.NewController(t))
				},
				httpMock: func(issuer string) {
					gock.New(issuer).
						Get("/keys").
						Reply(200).
						JSON(keys(t))
				},
			},
			want: want{
				err: func(err error) bool {
					return errors.Is(err, ErrNoTokens)
				},
			},
		},
		{
			name: "invalid token",
			fields: fields{
				issuer:       "https://jwt.com",
				jwtEndpoint:  "https://auth.com/jwt",
				keysEndpoint: "https://jwt.com/keys",
				headerName:   "jwt-header",
				encryptionAlg: func(t *testing.T) crypto.EncryptionAlgorithm {
					return crypto.CreateMockEncryptionAlg(gomock.NewController(t))
				},
				httpMock: func(issuer string) {
					gock.New(issuer).
						Get("/keys").
						Reply(200).
						JSON(keys(t))
				},
				authURL: "https://auth.com/jwt?authRequestID=testState",
				tokens: &oidc.Tokens[*oidc.IDTokenClaims]{
					Token:   &oauth2.Token{},
					IDToken: "invalidToken",
				},
			},
			want: want{
				err: func(err error) bool {
					return errors.Is(err, ErrInvalidToken)
				},
			},
		},
		{
			name: "successful fetch",
			fields: fields{
				issuer:       "https://jwt.com",
				jwtEndpoint:  "https://auth.com/jwt",
				keysEndpoint: "https://jwt.com/keys",
				headerName:   "jwt-header",
				encryptionAlg: func(t *testing.T) crypto.EncryptionAlgorithm {
					return crypto.CreateMockEncryptionAlg(gomock.NewController(t))
				},
				httpMock: func(issuer string) {
					gock.New(issuer).
						Get("/keys").
						Reply(200).
						JSON(keys(t))
				},
				authURL: "https://auth.com/jwt?authRequestID=testState",
				tokens: &oidc.Tokens[*oidc.IDTokenClaims]{
					Token:   &oauth2.Token{},
					IDToken: idToken(t, "https://jwt.com"),
					IDTokenClaims: &oidc.IDTokenClaims{
						TokenClaims: oidc.TokenClaims{
							Subject: "sub",
						},
						UserInfoProfile: oidc.UserInfoProfile{
							Picture:           "picture",
							Name:              "firstname lastname",
							GivenName:         "firstname",
							FamilyName:        "lastname",
							Nickname:          "nickname",
							PreferredUsername: "username",
							Profile:           "profile",
							Locale:            oidc.NewLocale(language.English),
						},
						UserInfoEmail: oidc.UserInfoEmail{
							Email:         "email",
							EmailVerified: oidc.Bool(true),
						},
						UserInfoPhone: oidc.UserInfoPhone{
							PhoneNumber:         "phone",
							PhoneNumberVerified: true,
						},
					},
				},
			},
			want: want{
				id:                "sub",
				firstName:         "firstname",
				lastName:          "lastname",
				displayName:       "firstname lastname",
				nickName:          "nickname",
				preferredUsername: "username",
				email:             "email",
				isEmailVerified:   true,
				phone:             "phone",
				isPhoneVerified:   true,
				preferredLanguage: language.English,
				avatarURL:         "picture",
				profile:           "profile",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			defer gock.Off()
			tt.fields.httpMock(tt.fields.issuer)
			a := assert.New(t)

			provider, err := New(
				tt.fields.name,
				tt.fields.issuer,
				tt.fields.jwtEndpoint,
				tt.fields.keysEndpoint,
				tt.fields.headerName,
				tt.fields.encryptionAlg(t),
			)
			require.NoError(t, err)

			session := &Session{
				Provider: provider,
				AuthURL:  tt.fields.authURL,
				Tokens:   tt.fields.tokens,
			}

			user, err := session.FetchUser(context.Background())
			if tt.want.err != nil && !tt.want.err(err) {
				a.Fail("invalid error", err)
			}
			if tt.want.err == nil {
				a.NoError(err)
				a.Equal(tt.want.id, user.GetID())
				a.Equal(tt.want.firstName, user.GetFirstName())
				a.Equal(tt.want.lastName, user.GetLastName())
				a.Equal(tt.want.displayName, user.GetDisplayName())
				a.Equal(tt.want.nickName, user.GetNickname())
				a.Equal(tt.want.preferredUsername, user.GetPreferredUsername())
				a.Equal(domain.EmailAddress(tt.want.email), user.GetEmail())
				a.Equal(tt.want.isEmailVerified, user.IsEmailVerified())
				a.Equal(domain.PhoneNumber(tt.want.phone), user.GetPhone())
				a.Equal(tt.want.isPhoneVerified, user.IsPhoneVerified())
				a.Equal(tt.want.preferredLanguage, user.GetPreferredLanguage())
				a.Equal(tt.want.avatarURL, user.GetAvatarURL())
				a.Equal(tt.want.profile, user.GetProfile())
			}
		})
	}
}

func idToken(t *testing.T, issuer string) string {
	claims := oidc.NewIDTokenClaims(
		issuer,
		"sub",
		[]string{"clientID"},
		time.Now().Add(1*time.Hour),
		time.Now().Add(-1*time.Minute),
		"",
		"",
		nil,
		"clientID",
		0,
	)
	claims.UserInfoProfile = oidc.UserInfoProfile{
		GivenName:         "firstname",
		FamilyName:        "lastname",
		Name:              "firstname lastname",
		Nickname:          "nickname",
		PreferredUsername: "username",
		Locale:            oidc.NewLocale(language.English),
		Picture:           "picture",
		Profile:           "profile",
	}
	claims.UserInfoEmail = oidc.UserInfoEmail{
		Email:         "email",
		EmailVerified: oidc.Bool(true),
	}
	claims.UserInfoPhone = oidc.UserInfoPhone{
		PhoneNumber:         "phone",
		PhoneNumberVerified: true,
	}

	privateKey, err := crypto.BytesToPrivateKey([]byte(`-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAs38btwb3c7r0tMaQpGvBmY+mPwMU/LpfuPoC0k2t4RsKp0fv
40SMl50CRrHgk395wch8PMPYbl3+8TtYAJuyrFALIj3Ff1UcKIk0hOH5DDsfh7/q
2wFuncTmS6bifYo8CfSq2vDGnM7nZnEvxY/MfSydZdcmIqlkUpfQmtzExw9+tSe5
Dxq6gn5JtlGgLgZGt69r5iMMrTEGhhVAXzNuMZbmlCoBru+rC8ITlTX/0V1ZcsSb
L8tYWhthyu9x6yjo1bH85wiVI4gs0MhU8f2a+kjL/KGZbR14Ua2eo6tonBZLC5DH
WM2TkYXgRCDPufjcgmzN0Lm91E4P8KvBcvly6QIDAQABAoIBAQCPj1nbSPcg2KZe
73FAD+8HopyUSSK//1AP4eXfzcEECVy77g0u9+R6XlkzsZCsZ4g6NN8ounqfyw3c
YlpAIkcFCf/dowoSjT+4LASVQyatYZwWNqjgAIU4KgMG/rKnNahPTiBYe7peMB1j
EaPjnt8uPkCk8y7NCi3y4Pk24tt/WM5KbJK2NQhUi1csGnleDfE+0blV0l/e6C68
W5cbnbWAroMqae/Yon3XVZiXX0m+l2f6ZzIgKaD18J+eEM8FjJC+jQKiRe1i9v3K
nQrLwh/gn8J10FcbKn3xqslKVidzASIrNIzHT9j/Z5T9NXuAKa7IV2x+Dtdus+wq
iBsUunwBAoGBANpYew+8i9vDwK4/SefduDTuzJ0H9lWTjtbiWQ+KYZoeJ7q3/qns
jsmi+mjxkXxXg1RrGbNbjtbl3RXXIrUeeBB0lglRJUjc3VK7VvNoyXIWsiqhCspH
IJ9Yuknv4mXB01m/glbSCS/xu4RTgf5aOG4jUiRb9+dCIpvDxI9gbXEVAoGBANJz
hIJkplIJ+biTi3G1Oz17qkUkInNXzAEzKD9Atoz5AIAiR1ivOMLOlbucfjevw/Nw
TnpkMs9xqCefKupTlsriXtZI88m7ZKzAmolYsPolOy/Jhi31h9JFVTEfKGqVS+dk
A4ndhgdW9RUeNJPY2YVCARXQrWpueweQDA1cNaeFAoGAPJsYtXqBW6PPRM5+ZiSt
78tk8iV2o7RMjqrPS7f+dXfvUS2nO2VVEPTzCtQarOfhpToBLT65vD6bimdn09w8
OV0TFEz4y2u65y7m6LNqTwertpdy1ki97l0DgGhccCBH2P6GYDD2qd8wTH+dcot6
ZF/begopGoDJ+HBzi9SZLC0CgYBZzPslHMevyBvr++GLwrallKhiWnns1/DwLiEl
ZHrBCtuA0Z+6IwLIdZiE9tEQ+ApYTXrfVPQteqUzSwLn/IUiy5eGPpjwYushoAoR
Q2w5QTvRN1/vKo8rVXR1woLfgBdkhFPSN1mitiNcQIhU8jpXV4PZCDOHb99FqdzK
sqcedQKBgQCOmgbqxGsnT2WQhoOdzln+NOo6Tx+FveLLqat2KzpY59W4noeI2Awn
HfIQgWUAW9dsjVVOXMP1jhq8U9hmH/PFWA11V/iCdk1NTxZEw87VAOeWuajpdDHG
+iex349j8h2BcQ4Zd0FWu07gGFnS/yuDJPn6jBhRusdieEcxLRjTKg==
-----END RSA PRIVATE KEY-----
`))
	if err != nil {
		t.Fatal(err)
	}
	signer, err := jose.NewSigner(jose.SigningKey{Key: privateKey, Algorithm: "RS256"}, &jose.SignerOptions{})
	if err != nil {
		t.Fatal(err)
	}
	data, err := json.Marshal(claims)
	if err != nil {
		t.Fatal(err)
	}
	jws, err := signer.Sign(data)
	if err != nil {
		t.Fatal(err)
	}
	idToken, err := jws.CompactSerialize()
	if err != nil {
		t.Fatal(err)
	}
	return idToken
}

func keys(t *testing.T) *jose.JSONWebKeySet {
	privateKey, err := crypto.BytesToPublicKey([]byte(`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs38btwb3c7r0tMaQpGvB
mY+mPwMU/LpfuPoC0k2t4RsKp0fv40SMl50CRrHgk395wch8PMPYbl3+8TtYAJuy
rFALIj3Ff1UcKIk0hOH5DDsfh7/q2wFuncTmS6bifYo8CfSq2vDGnM7nZnEvxY/M
fSydZdcmIqlkUpfQmtzExw9+tSe5Dxq6gn5JtlGgLgZGt69r5iMMrTEGhhVAXzNu
MZbmlCoBru+rC8ITlTX/0V1ZcsSbL8tYWhthyu9x6yjo1bH85wiVI4gs0MhU8f2a
+kjL/KGZbR14Ua2eo6tonBZLC5DHWM2TkYXgRCDPufjcgmzN0Lm91E4P8KvBcvly
6QIDAQAB
-----END PUBLIC KEY-----
`))
	if err != nil {
		t.Fatal(err)
	}
	return &jose.JSONWebKeySet{Keys: []jose.JSONWebKey{{Key: privateKey, Algorithm: "RS256", Use: oidc.KeyUseSignature}}}
}
