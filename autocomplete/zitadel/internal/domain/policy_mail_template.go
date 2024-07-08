package domain

import "github.com/zitadel/zitadel/internal/eventstore/v1/models"

type MailTemplate struct {
	models.ObjectRoot

	State    PolicyState
	Default  bool
	Template []byte
}

func (m *MailTemplate) IsValid() bool {
	return m.Template != nil
}
