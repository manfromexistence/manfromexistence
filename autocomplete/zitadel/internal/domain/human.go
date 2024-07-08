package domain

import (
	"strings"
	"time"

	"golang.org/x/net/context"

	"github.com/zitadel/zitadel/internal/crypto"
	es_models "github.com/zitadel/zitadel/internal/eventstore/v1/models"
	"github.com/zitadel/zitadel/internal/zerrors"
)

type Human struct {
	es_models.ObjectRoot

	Username string
	State    UserState
	*Password
	HashedPassword string
	*Profile
	*Email
	*Phone
	*Address
}

func (h Human) GetUsername() string {
	return h.Username
}

func (h Human) GetState() UserState {
	return h.State
}

type InitUserCode struct {
	es_models.ObjectRoot

	Code   *crypto.CryptoValue
	Expiry time.Duration
}

type Gender int32

const (
	GenderUnspecified Gender = iota
	GenderFemale
	GenderMale
	GenderDiverse

	genderCount
)

func (f Gender) Valid() bool {
	return f >= 0 && f < genderCount
}

func (f Gender) Specified() bool {
	return f > GenderUnspecified && f < genderCount
}

func (u *Human) Normalize() error {
	if u.Username == "" {
		return zerrors.ThrowInvalidArgument(nil, "COMMAND-00p2b", "Errors.User.Username.Empty")
	}
	if err := u.Profile.Validate(); err != nil {
		return err
	}
	if err := u.Email.Validate(); err != nil {
		return err
	}
	if u.Phone != nil && u.Phone.PhoneNumber != "" {
		if err := u.Phone.Normalize(); err != nil {
			return err
		}
	}
	return nil
}

func (u *Human) CheckDomainPolicy(policy *DomainPolicy) error {
	if policy == nil {
		return zerrors.ThrowPreconditionFailed(nil, "DOMAIN-zSH7j", "Errors.Users.DomainPolicyNil")
	}
	if !policy.UserLoginMustBeDomain && u.Profile != nil && u.Username == "" && u.Email != nil {
		u.Username = string(u.EmailAddress)
	}
	return nil
}

func (u *Human) EnsureDisplayName() {
	if u.Profile == nil {
		u.Profile = new(Profile)
	}
	if u.DisplayName != "" {
		return
	}
	if u.FirstName != "" && u.LastName != "" {
		u.DisplayName = u.FirstName + " " + u.LastName
		return
	}
	if u.Email != nil && strings.TrimSpace(string(u.Email.EmailAddress)) != "" {
		u.DisplayName = string(u.Email.EmailAddress)
		return
	}
	u.DisplayName = u.Username
}

func (u *Human) HashPasswordIfExisting(ctx context.Context, policy *PasswordComplexityPolicy, hasher *crypto.Hasher, onetime bool) error {
	if u.Password != nil {
		u.Password.ChangeRequired = onetime
		return u.Password.HashPasswordIfExisting(ctx, policy, hasher)
	}
	return nil
}

func (u *Human) IsInitialState(passwordless, externalIDPs bool) bool {
	if externalIDPs {
		return false
	}
	return u.Email == nil || !u.IsEmailVerified || !passwordless && (u.Password == nil || u.Password.SecretString == "") && u.HashedPassword == ""
}

func NewInitUserCode(generator crypto.Generator) (*InitUserCode, error) {
	initCodeCrypto, _, err := crypto.NewCode(generator)
	if err != nil {
		return nil, err
	}
	return &InitUserCode{
		Code:   initCodeCrypto,
		Expiry: generator.Expiry(),
	}, nil
}

func GenerateLoginName(username, domain string, appendDomain bool) string {
	if !appendDomain {
		return username
	}
	return username + "@" + domain
}
