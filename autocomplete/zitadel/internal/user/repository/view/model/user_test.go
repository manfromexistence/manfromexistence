package model

import (
	"encoding/json"
	"testing"
	"time"

	"github.com/zitadel/zitadel/internal/crypto"
	"github.com/zitadel/zitadel/internal/eventstore"
	es_models "github.com/zitadel/zitadel/internal/eventstore/v1/models"
	"github.com/zitadel/zitadel/internal/repository/user"
	"github.com/zitadel/zitadel/internal/user/model"
	es_model "github.com/zitadel/zitadel/internal/user/repository/eventsourcing/model"
)

func mockUserData(user *es_model.User) []byte {
	data, _ := json.Marshal(user)
	return data
}

func mockPasswordData(password *es_model.Password) []byte {
	data, _ := json.Marshal(password)
	return data
}

func mockProfileData(profile *es_model.Profile) []byte {
	data, _ := json.Marshal(profile)
	return data
}

func mockEmailData(email *es_model.Email) []byte {
	data, _ := json.Marshal(email)
	return data
}

func mockPhoneData(phone *es_model.Phone) []byte {
	data, _ := json.Marshal(phone)
	return data
}

func mockAddressData(address *es_model.Address) []byte {
	data, _ := json.Marshal(address)
	return data
}

func getFullHuman(password *es_model.Password) *es_model.User {
	return &es_model.User{
		UserName: "UserName",
		Human: &es_model.Human{
			Profile: &es_model.Profile{
				FirstName: "FirstName",
				LastName:  "LastName",
			},
			Email: &es_model.Email{
				EmailAddress: "Email",
			},
			Phone: &es_model.Phone{
				PhoneNumber: "Phone",
			},
			Address: &es_model.Address{
				Country: "Country",
			},
			Password: password,
		},
	}
}

func getFullMachine() *es_model.User {
	return &es_model.User{
		UserName: "UserName",
		Machine: &es_model.Machine{
			Description: "Description",
			Name:        "Machine",
		},
	}
}

func TestUserAppendEvent(t *testing.T) {
	type args struct {
		event eventstore.Event
		user  *UserView
	}
	tests := []struct {
		name   string
		args   args
		result *UserView
	}{
		{
			name: "append added user event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.UserV1AddedType, ResourceOwner: "GrantedOrgID", Data: mockUserData(getFullHuman(nil))},
				user:  &UserView{},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateInitial)},
		},
		{
			name: "append added human event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.HumanAddedType, ResourceOwner: "GrantedOrgID", Data: mockUserData(getFullHuman(nil))},
				user:  &UserView{},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateInitial)},
		},
		{
			name: "append added machine event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.MachineAddedEventType, ResourceOwner: "GrantedOrgID", Data: mockUserData(getFullMachine())},
				user:  &UserView{},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", MachineView: &MachineView{Description: "Description", Name: "Machine"}, State: int32(model.UserStateActive)},
		},
		{
			name: "append added user with password event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.UserV1AddedType, ResourceOwner: "GrantedOrgID", Data: mockUserData(getFullHuman(&es_model.Password{Secret: &crypto.CryptoValue{}}))},
				user:  &UserView{},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country", PasswordSet: true}, State: int32(model.UserStateInitial)},
		},
		{
			name: "append added human with password event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.HumanAddedType, ResourceOwner: "GrantedOrgID", Data: mockUserData(getFullHuman(&es_model.Password{Secret: &crypto.CryptoValue{}}))},
				user:  &UserView{},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country", PasswordSet: true}, State: int32(model.UserStateInitial)},
		},
		{
			name: "append added user with password but change required event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.UserV1AddedType, ResourceOwner: "GrantedOrgID", Data: mockUserData(getFullHuman(&es_model.Password{ChangeRequired: true, Secret: &crypto.CryptoValue{}}))},
				user:  &UserView{},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country", PasswordSet: true, PasswordChangeRequired: true}, State: int32(model.UserStateInitial)},
		},
		{
			name: "append added human with password but change required event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.HumanAddedType, ResourceOwner: "GrantedOrgID", Data: mockUserData(getFullHuman(&es_model.Password{ChangeRequired: true, Secret: &crypto.CryptoValue{}}))},
				user:  &UserView{},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country", PasswordSet: true, PasswordChangeRequired: true}, State: int32(model.UserStateInitial)},
		},
		{
			name: "append password change event on user",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.UserV1PasswordChangedType, ResourceOwner: "GrantedOrgID", Data: mockPasswordData(&es_model.Password{Secret: &crypto.CryptoValue{}})},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "Phone", Country: "Country", PasswordSet: true}, State: int32(model.UserStateActive)},
		},
		{
			name: "append password change event on human",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.HumanPasswordChangedType, ResourceOwner: "GrantedOrgID", Data: mockPasswordData(&es_model.Password{Secret: &crypto.CryptoValue{}})},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "Phone", Country: "Country", PasswordSet: true}, State: int32(model.UserStateActive)},
		},
		{
			name: "append password change with change required event on user",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.UserV1PasswordChangedType, ResourceOwner: "GrantedOrgID", Data: mockPasswordData(&es_model.Password{ChangeRequired: true, Secret: &crypto.CryptoValue{}})},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "Phone", Country: "Country", PasswordSet: true, PasswordChangeRequired: true}, State: int32(model.UserStateActive)},
		},
		{
			name: "append password change with change required event on human",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.HumanPasswordChangedType, ResourceOwner: "GrantedOrgID", Data: mockPasswordData(&es_model.Password{ChangeRequired: true, Secret: &crypto.CryptoValue{}})},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "Phone", Country: "Country", PasswordSet: true, PasswordChangeRequired: true}, State: int32(model.UserStateActive)},
		},
		{
			name: "append change user profile event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.UserV1ProfileChangedType, ResourceOwner: "GrantedOrgID", Data: mockProfileData(&es_model.Profile{FirstName: "FirstNameChanged"})},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateInitial)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstNameChanged", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateInitial)},
		},
		{
			name: "append change human profile event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.HumanProfileChangedType, ResourceOwner: "GrantedOrgID", Data: mockProfileData(&es_model.Profile{FirstName: "FirstNameChanged"})},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateInitial)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstNameChanged", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateInitial)},
		},
		{
			name: "append change user email event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.UserV1EmailChangedType, ResourceOwner: "GrantedOrgID", Data: mockEmailData(&es_model.Email{EmailAddress: "EmailChanged"})},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "EmailChanged", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
		},
		{
			name: "append change human email event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.HumanEmailChangedType, ResourceOwner: "GrantedOrgID", Data: mockEmailData(&es_model.Email{EmailAddress: "EmailChanged"})},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "EmailChanged", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
		},
		{
			name: "append verify user email event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.UserV1EmailVerifiedType, ResourceOwner: "GrantedOrgID"},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateInitial)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
		},
		{
			name: "append verify human email event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.HumanEmailVerifiedType, ResourceOwner: "GrantedOrgID"},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateInitial)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
		},
		{
			name: "append change user phone event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.UserV1PhoneChangedType, ResourceOwner: "GrantedOrgID", Data: mockPhoneData(&es_model.Phone{PhoneNumber: "PhoneChanged"})},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "PhoneChanged", Country: "Country"}, State: int32(model.UserStateActive)},
		},
		{
			name: "append change human phone event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.HumanPhoneChangedType, ResourceOwner: "GrantedOrgID", Data: mockPhoneData(&es_model.Phone{PhoneNumber: "PhoneChanged"})},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "PhoneChanged", Country: "Country"}, State: int32(model.UserStateActive)},
		},
		{
			name: "append verify user phone event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.UserV1PhoneVerifiedType, ResourceOwner: "GrantedOrgID"},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", IsPhoneVerified: true, Country: "Country"}, State: int32(model.UserStateActive)},
		},
		{
			name: "append verify human phone event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.HumanPhoneVerifiedType, ResourceOwner: "GrantedOrgID"},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", IsPhoneVerified: true, Country: "Country"}, State: int32(model.UserStateActive)},
		},
		{
			name: "append change user address event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.UserV1AddressChangedType, ResourceOwner: "GrantedOrgID", Data: mockAddressData(&es_model.Address{Country: "CountryChanged"})},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "Phone", Country: "CountryChanged"}, State: int32(model.UserStateActive)},
		},
		{
			name: "append change human address event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.HumanAddressChangedType, ResourceOwner: "GrantedOrgID", Data: mockAddressData(&es_model.Address{Country: "CountryChanged"})},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", IsEmailVerified: true, Phone: "Phone", Country: "CountryChanged"}, State: int32(model.UserStateActive)},
		},
		{
			name: "append user deactivate event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.UserDeactivatedType, ResourceOwner: "GrantedOrgID"},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateInactive)},
		},
		{
			name: "append user reactivate event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.UserReactivatedType, ResourceOwner: "GrantedOrgID"},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateInactive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
		},
		{
			name: "append user lock event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.UserLockedType, ResourceOwner: "GrantedOrgID"},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateLocked)},
		},
		{
			name: "append user unlock event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.UserUnlockedType, ResourceOwner: "GrantedOrgID"},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateLocked)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
		},
		{
			name: "append user add otp event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.UserV1MFAOTPAddedType, ResourceOwner: "GrantedOrgID"},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country", OTPState: int32(model.MFAStateNotReady)}, State: int32(model.UserStateActive)},
		},
		{
			name: "append human add otp event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.HumanMFAOTPAddedType, ResourceOwner: "GrantedOrgID"},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country", OTPState: int32(model.MFAStateNotReady)}, State: int32(model.UserStateActive)},
		},
		{
			name: "append user verify otp event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.UserV1MFAOTPVerifiedType, ResourceOwner: "GrantedOrgID"},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country", OTPState: int32(model.MFAStateNotReady)}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country", OTPState: int32(model.MFAStateReady)}, State: int32(model.UserStateActive)},
		},
		{
			name: "append human verify otp event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.HumanMFAOTPVerifiedType, ResourceOwner: "GrantedOrgID"},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country", OTPState: int32(model.MFAStateNotReady)}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country", OTPState: int32(model.MFAStateReady)}, State: int32(model.UserStateActive)},
		},
		{
			name: "append user remove otp event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.UserV1MFAOTPRemovedType, ResourceOwner: "GrantedOrgID"},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country", OTPState: int32(model.MFAStateReady)}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country", OTPState: int32(model.MFAStateUnspecified)}, State: int32(model.UserStateActive)},
		},
		{
			name: "append human remove otp event",
			args: args{
				event: &es_models.Event{AggregateID: "AggregateID", Seq: 1, Typ: user.HumanMFAOTPRemovedType, ResourceOwner: "GrantedOrgID"},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country", OTPState: int32(model.MFAStateReady)}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country", OTPState: int32(model.MFAStateUnspecified)}, State: int32(model.UserStateActive)},
		},
		{
			name: "append user mfa init skipped event",
			args: args{
				event: &es_models.Event{Seq: 1, CreationDate: time.Now().UTC(), Typ: user.UserV1MFAInitSkippedType, AggregateID: "AggregateID", ResourceOwner: "GrantedOrgID"},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country", MFAInitSkipped: time.Now().UTC()}, State: int32(model.UserStateActive)},
		},
		{
			name: "append human mfa init skipped event",
			args: args{
				event: &es_models.Event{Seq: 1, CreationDate: time.Now().UTC(), Typ: user.HumanMFAInitSkippedType, AggregateID: "AggregateID", ResourceOwner: "GrantedOrgID"},
				user:  &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country"}, State: int32(model.UserStateActive)},
			},
			result: &UserView{ID: "AggregateID", ResourceOwner: "GrantedOrgID", UserName: "UserName", HumanView: &HumanView{FirstName: "FirstName", LastName: "LastName", Email: "Email", Phone: "Phone", Country: "Country", MFAInitSkipped: time.Now().UTC()}, State: int32(model.UserStateActive)},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tt.args.user.AppendEvent(tt.args.event)
			if tt.args.user.ID != tt.result.ID {
				t.Errorf("got wrong result ID: expected: %v, actual: %v ", tt.result.ID, tt.args.user.ID)
			}
			if tt.args.user.ResourceOwner != tt.result.ResourceOwner {
				t.Errorf("got wrong result ResourceOwner: expected: %v, actual: %v ", tt.result.ResourceOwner, tt.args.user.ResourceOwner)
			}
			if tt.args.user.State != tt.result.State {
				t.Errorf("got wrong result state: expected: %v, actual: %v ", tt.result.State, tt.args.user.State)
			}
			if human := tt.args.user.HumanView; human != nil {
				if human.FirstName != tt.result.FirstName {
					t.Errorf("got wrong result FirstName: expected: %v, actual: %v ", tt.result.FirstName, tt.args.user.FirstName)
				}
				if human.LastName != tt.result.LastName {
					t.Errorf("got wrong result FirstName: expected: %v, actual: %v ", tt.result.FirstName, human.FirstName)
				}
				if human.Email != tt.result.Email {
					t.Errorf("got wrong result email: expected: %v, actual: %v ", tt.result.Email, human.Email)
				}
				if human.IsEmailVerified != tt.result.IsEmailVerified {
					t.Errorf("got wrong result IsEmailVerified: expected: %v, actual: %v ", tt.result.IsEmailVerified, human.IsEmailVerified)
				}
				if human.Phone != tt.result.Phone {
					t.Errorf("got wrong result Phone: expected: %v, actual: %v ", tt.result.Phone, human.Phone)
				}
				if human.IsPhoneVerified != tt.result.IsPhoneVerified {
					t.Errorf("got wrong result IsPhoneVerified: expected: %v, actual: %v ", tt.result.IsPhoneVerified, human.IsPhoneVerified)
				}
				if human.Country != tt.result.Country {
					t.Errorf("got wrong result Country: expected: %v, actual: %v ", tt.result.Country, human.Country)
				}
				if human.OTPState != tt.result.OTPState {
					t.Errorf("got wrong result OTPState: expected: %v, actual: %v ", tt.result.OTPState, human.OTPState)
				}
				if human.MFAInitSkipped.Round(1*time.Second) != tt.result.MFAInitSkipped.Round(1*time.Second) {
					t.Errorf("got wrong result MFAInitSkipped: expected: %v, actual: %v ", tt.result.MFAInitSkipped.Round(1*time.Second), human.MFAInitSkipped.Round(1*time.Second))
				}
				if human.PasswordSet != tt.result.PasswordSet {
					t.Errorf("got wrong result PasswordSet: expected: %v, actual: %v ", tt.result.PasswordSet, human.PasswordSet)
				}
				if human.PasswordChangeRequired != tt.result.PasswordChangeRequired {
					t.Errorf("got wrong result PasswordChangeRequired: expected: %v, actual: %v ", tt.result.PasswordChangeRequired, human.PasswordChangeRequired)
				}
			}
		})
	}
}
