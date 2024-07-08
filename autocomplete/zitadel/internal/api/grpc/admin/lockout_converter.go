package admin

import (
	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/pkg/grpc/admin"
)

func UpdateLockoutPolicyToDomain(p *admin.UpdateLockoutPolicyRequest) *domain.LockoutPolicy {
	return &domain.LockoutPolicy{
		MaxPasswordAttempts: uint64(p.MaxPasswordAttempts),
		MaxOTPAttempts:      uint64(p.MaxOtpAttempts),
	}
}
