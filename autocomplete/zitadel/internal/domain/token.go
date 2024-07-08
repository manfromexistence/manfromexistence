package domain

import (
	"context"
	"strings"
	"time"

	"github.com/zitadel/zitadel/internal/api/authz"
	es_models "github.com/zitadel/zitadel/internal/eventstore/v1/models"
)

type Token struct {
	es_models.ObjectRoot

	TokenID           string
	ApplicationID     string
	UserAgentID       string
	RefreshTokenID    string
	Audience          []string
	Expiration        time.Time
	Scopes            []string
	PreferredLanguage string
	Reason            TokenReason
	Actor             *TokenActor
}

func AddAudScopeToAudience(ctx context.Context, audience, scopes []string) []string {
	for _, scope := range scopes {
		if !(strings.HasPrefix(scope, ProjectIDScope) && strings.HasSuffix(scope, AudSuffix)) {
			continue
		}
		projectID := strings.TrimSuffix(strings.TrimPrefix(scope, ProjectIDScope), AudSuffix)
		if projectID == ProjectIDScopeZITADEL {
			projectID = authz.GetInstance(ctx).ProjectID()
		}
		audience = addProjectID(audience, projectID)
	}
	return audience
}

func addProjectID(audience []string, projectID string) []string {
	for _, a := range audience {
		if a == projectID {
			return audience
		}
	}
	return append(audience, projectID)
}

//go:generate enumer -type TokenReason -transform snake -trimprefix TokenReason -json
type TokenReason int

const (
	TokenReasonUnspecified TokenReason = iota
	TokenReasonAuthRequest
	TokenReasonRefresh
	TokenReasonJWTProfile
	TokenReasonClientCredentials
	TokenReasonExchange
	TokenReasonImpersonation
)

type TokenActor struct {
	Actor  *TokenActor `json:"actor,omitempty"`
	UserID string      `json:"user_id,omitempty"`
	Issuer string      `json:"issuer,omitempty"`
}
