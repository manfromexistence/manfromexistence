package types

import (
	"context"
	"strings"

	http_utils "github.com/zitadel/zitadel/internal/api/http"
	"github.com/zitadel/zitadel/internal/api/ui/login"
	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/query"
)

func (notify Notify) SendEmailVerificationCode(ctx context.Context, user *query.NotifyUser, code string, urlTmpl string) error {
	var url string
	if urlTmpl == "" {
		url = login.MailVerificationLink(http_utils.ComposedOrigin(ctx), user.ID, code, user.ResourceOwner)
	} else {
		var buf strings.Builder
		if err := domain.RenderConfirmURLTemplate(&buf, urlTmpl, user.ID, code, user.ResourceOwner); err != nil {
			return err
		}
		url = buf.String()
	}

	args := make(map[string]interface{})
	args["Code"] = code
	return notify(url, args, domain.VerifyEmailMessageType, true)
}
