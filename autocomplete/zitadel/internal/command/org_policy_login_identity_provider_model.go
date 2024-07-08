package command

import (
	"github.com/zitadel/zitadel/internal/eventstore"
	"github.com/zitadel/zitadel/internal/repository/org"
)

type OrgIdentityProviderWriteModel struct {
	IdentityProviderWriteModel
}

func NewOrgIdentityProviderWriteModel(orgID, idpConfigID string) *OrgIdentityProviderWriteModel {
	return &OrgIdentityProviderWriteModel{
		IdentityProviderWriteModel: IdentityProviderWriteModel{
			WriteModel: eventstore.WriteModel{
				AggregateID:   orgID,
				ResourceOwner: orgID,
			},
			IDPConfigID: idpConfigID,
		},
	}
}

func (wm *OrgIdentityProviderWriteModel) AppendEvents(events ...eventstore.Event) {
	for _, event := range events {
		switch e := event.(type) {
		case *org.IdentityProviderAddedEvent:
			if e.IDPConfigID != wm.IDPConfigID {
				continue
			}
			wm.IdentityProviderWriteModel.AppendEvents(&e.IdentityProviderAddedEvent)
		case *org.IdentityProviderRemovedEvent:
			if e.IDPConfigID != wm.IDPConfigID {
				continue
			}
			wm.IdentityProviderWriteModel.AppendEvents(&e.IdentityProviderRemovedEvent)
		case *org.LoginPolicyRemovedEvent:
			wm.IdentityProviderWriteModel.AppendEvents(&e.LoginPolicyRemovedEvent)
		}
	}
}

func (wm *OrgIdentityProviderWriteModel) Reduce() error {
	return wm.IdentityProviderWriteModel.Reduce()
}

func (wm *OrgIdentityProviderWriteModel) Query() *eventstore.SearchQueryBuilder {
	return eventstore.NewSearchQueryBuilder(eventstore.ColumnsEvent).
		ResourceOwner(wm.ResourceOwner).
		AddQuery().
		AggregateTypes(org.AggregateType).
		AggregateIDs(wm.AggregateID).
		EventTypes(
			org.LoginPolicyIDPProviderAddedEventType,
			org.LoginPolicyIDPProviderRemovedEventType,
			org.LoginPolicyRemovedEventType).
		Builder()
}
