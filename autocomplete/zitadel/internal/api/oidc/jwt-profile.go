package oidc

import (
	"context"

	"github.com/zitadel/oidc/v3/pkg/oidc"
	"github.com/zitadel/oidc/v3/pkg/op"

	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/telemetry/tracing"
	"github.com/zitadel/zitadel/internal/zerrors"
)

func (o *OPStorage) JWTProfileTokenType(ctx context.Context, request op.TokenRequest) (_ op.AccessTokenType, err error) {
	ctx, span := tracing.NewSpan(ctx)
	defer func() {
		err = oidcError(err)
		span.EndWithError(err)
	}()

	mapJWTProfileScopesToAudience(ctx, request)
	user, err := o.query.GetUserByID(ctx, false, request.GetSubject())
	if err != nil {
		return 0, err
	}
	// the user should always be a machine, but let's just be sure
	if user.Machine == nil {
		return 0, zerrors.ThrowInvalidArgument(nil, "OIDC-jk26S", "invalid client type")
	}
	return accessTokenTypeToOIDC(user.Machine.AccessTokenType), nil
}

func mapJWTProfileScopesToAudience(ctx context.Context, request op.TokenRequest) {
	// the request should always be a JWTTokenRequest, but let's make sure
	jwt, ok := request.(*oidc.JWTTokenRequest)
	if !ok {
		return
	}
	jwt.Audience = domain.AddAudScopeToAudience(ctx, jwt.Audience, jwt.Scopes)
}
