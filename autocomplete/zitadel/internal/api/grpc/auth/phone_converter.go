package auth

import (
	"context"

	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/pkg/grpc/auth"
)

func UpdateMyPhoneToDomain(ctx context.Context, phone *auth.SetMyPhoneRequest) *domain.Phone {
	return &domain.Phone{
		ObjectRoot:  ctxToObjectRoot(ctx),
		PhoneNumber: domain.PhoneNumber(phone.Phone),
	}
}
