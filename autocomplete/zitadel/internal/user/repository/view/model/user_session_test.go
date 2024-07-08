package model

import (
	"encoding/json"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"

	"github.com/zitadel/zitadel/internal/crypto"
	es_models "github.com/zitadel/zitadel/internal/eventstore/v1/models"
	"github.com/zitadel/zitadel/internal/repository/user"
	es_model "github.com/zitadel/zitadel/internal/user/repository/eventsourcing/model"
)

func now() time.Time {
	return time.Now().UTC().Round(1 * time.Second)
}

func TestAppendEvent(t *testing.T) {
	type args struct {
		event    *es_models.Event
		userView *UserSessionView
	}
	tests := []struct {
		name   string
		args   args
		result *UserSessionView
	}{
		{
			name: "append user password check succeeded event",
			args: args{
				event:    &es_models.Event{CreationDate: now(), Typ: user.UserV1PasswordCheckSucceededType},
				userView: &UserSessionView{},
			},
			result: &UserSessionView{ChangeDate: now(), PasswordVerification: now()},
		},
		{
			name: "append human password check succeeded event",
			args: args{
				event:    &es_models.Event{CreationDate: now(), Typ: user.HumanPasswordCheckSucceededType},
				userView: &UserSessionView{},
			},
			result: &UserSessionView{ChangeDate: now(), PasswordVerification: now()},
		},
		{
			name: "append user password check failed event",
			args: args{
				event:    &es_models.Event{CreationDate: now(), Typ: user.UserV1PasswordCheckFailedType},
				userView: &UserSessionView{PasswordVerification: now()},
			},
			result: &UserSessionView{ChangeDate: now(), PasswordVerification: time.Time{}},
		},
		{
			name: "append human password check failed event",
			args: args{
				event:    &es_models.Event{CreationDate: now(), Typ: user.HumanPasswordCheckFailedType},
				userView: &UserSessionView{PasswordVerification: now()},
			},
			result: &UserSessionView{ChangeDate: now(), PasswordVerification: time.Time{}},
		},
		{
			name: "append user password changed event",
			args: args{
				event: &es_models.Event{
					CreationDate: now(),
					Typ:          user.UserV1PasswordChangedType,
					Data: func() []byte {
						d, _ := json.Marshal(&es_model.Password{
							Secret: &crypto.CryptoValue{Crypted: []byte("test")},
						})
						return d
					}(),
				},
				userView: &UserSessionView{UserAgentID: "id", PasswordVerification: now()},
			},
			result: &UserSessionView{UserAgentID: "id", ChangeDate: now(), PasswordVerification: time.Time{}},
		},
		{
			name: "append human password changed event",
			args: args{
				event: &es_models.Event{
					CreationDate: now(),
					Typ:          user.HumanPasswordChangedType,
					Data: func() []byte {
						d, _ := json.Marshal(&es_model.PasswordChange{
							Password: es_model.Password{
								Secret: &crypto.CryptoValue{Crypted: []byte("test")},
							},
						})
						return d
					}(),
				},
				userView: &UserSessionView{UserAgentID: "id", PasswordVerification: now()},
			},
			result: &UserSessionView{UserAgentID: "id", ChangeDate: now(), PasswordVerification: time.Time{}},
		},
		{
			name: "append human password changed event same user agent",
			args: args{
				event: &es_models.Event{
					CreationDate: now(),
					Typ:          user.HumanPasswordChangedType,
					Data: func() []byte {
						d, _ := json.Marshal(&es_model.PasswordChange{
							Password: es_model.Password{
								Secret: &crypto.CryptoValue{Crypted: []byte("test")},
							},
							UserAgentID: "id",
						})
						return d
					}(),
				},
				userView: &UserSessionView{UserAgentID: "id", PasswordVerification: now()},
			},
			result: &UserSessionView{UserAgentID: "id", ChangeDate: now(), PasswordVerification: now()},
		},
		{
			name: "append user otp verified event",
			args: args{
				event: &es_models.Event{
					CreationDate: now(),
					Typ:          user.HumanMFAOTPVerifiedType,
					Data:         nil,
				},
				userView: &UserSessionView{UserAgentID: "id"},
			},
			result: &UserSessionView{UserAgentID: "id", ChangeDate: now()},
		},
		{
			name: "append user otp verified event same user agent",
			args: args{
				event: &es_models.Event{
					CreationDate: now(),
					Typ:          user.HumanMFAOTPVerifiedType,
					Data: func() []byte {
						d, _ := json.Marshal(&es_model.OTPVerified{
							UserAgentID: "id",
						})
						return d
					}(),
				},
				userView: &UserSessionView{UserAgentID: "id"},
			},
			result: &UserSessionView{UserAgentID: "id", ChangeDate: now(), SecondFactorVerification: now()},
		},
		{
			name: "append user otp check succeeded event",
			args: args{
				event:    &es_models.Event{CreationDate: now(), Typ: user.UserV1MFAOTPCheckSucceededType},
				userView: &UserSessionView{},
			},
			result: &UserSessionView{ChangeDate: now(), SecondFactorVerification: now()},
		},
		{
			name: "append human otp check succeeded event",
			args: args{
				event:    &es_models.Event{CreationDate: now(), Typ: user.HumanMFAOTPCheckSucceededType},
				userView: &UserSessionView{},
			},
			result: &UserSessionView{ChangeDate: now(), SecondFactorVerification: now()},
		},
		{
			name: "append user otp check failed event",
			args: args{
				event:    &es_models.Event{CreationDate: now(), Typ: user.UserV1MFAOTPCheckFailedType},
				userView: &UserSessionView{SecondFactorVerification: now()},
			},
			result: &UserSessionView{ChangeDate: now(), SecondFactorVerification: time.Time{}},
		},
		{
			name: "append human otp check failed event",
			args: args{
				event:    &es_models.Event{CreationDate: now(), Typ: user.HumanMFAOTPCheckFailedType},
				userView: &UserSessionView{SecondFactorVerification: now()},
			},
			result: &UserSessionView{ChangeDate: now(), SecondFactorVerification: time.Time{}},
		},
		{
			name: "append user otp removed event",
			args: args{
				event:    &es_models.Event{CreationDate: now(), Typ: user.UserV1MFAOTPRemovedType},
				userView: &UserSessionView{SecondFactorVerification: now()},
			},
			result: &UserSessionView{ChangeDate: now(), SecondFactorVerification: time.Time{}},
		},
		{
			name: "append human otp removed event",
			args: args{
				event:    &es_models.Event{CreationDate: now(), Typ: user.HumanMFAOTPRemovedType},
				userView: &UserSessionView{SecondFactorVerification: now()},
			},
			result: &UserSessionView{ChangeDate: now(), SecondFactorVerification: time.Time{}},
		},
		{
			name: "append user signed out event",
			args: args{
				event:    &es_models.Event{CreationDate: now(), Typ: user.UserV1SignedOutType},
				userView: &UserSessionView{PasswordVerification: now(), SecondFactorVerification: now()},
			},
			result: &UserSessionView{ChangeDate: now(), PasswordVerification: time.Time{}, SecondFactorVerification: time.Time{}, State: 1},
		},
		{
			name: "append human signed out event",
			args: args{
				event:    &es_models.Event{CreationDate: now(), Typ: user.HumanSignedOutType},
				userView: &UserSessionView{PasswordVerification: now(), SecondFactorVerification: now()},
			},
			result: &UserSessionView{ChangeDate: now(), PasswordVerification: time.Time{}, SecondFactorVerification: time.Time{}, State: 1},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tt.args.userView.AppendEvent(tt.args.event)
			assert.Equal(t, tt.result, tt.args.userView)
		})
	}
}
