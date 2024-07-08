package command

import (
	"context"

	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/eventstore"
	"github.com/zitadel/zitadel/internal/repository/idpconfig"
	"github.com/zitadel/zitadel/internal/repository/org"
)

type OrgIDPConfigWriteModel struct {
	IDPConfigWriteModel
}

func NewOrgIDPConfigWriteModel(configID, orgID string) *OrgIDPConfigWriteModel {
	return &OrgIDPConfigWriteModel{
		IDPConfigWriteModel{
			WriteModel: eventstore.WriteModel{
				AggregateID:   orgID,
				ResourceOwner: orgID,
			},
			ConfigID: configID,
		},
	}
}

func (wm *OrgIDPConfigWriteModel) Query() *eventstore.SearchQueryBuilder {
	return eventstore.NewSearchQueryBuilder(eventstore.ColumnsEvent).
		ResourceOwner(wm.ResourceOwner).
		AddQuery().
		AggregateTypes(org.AggregateType).
		AggregateIDs(wm.AggregateID).
		EventTypes(
			org.IDPConfigAddedEventType,
			org.IDPConfigChangedEventType,
			org.IDPConfigDeactivatedEventType,
			org.IDPConfigReactivatedEventType,
			org.IDPConfigRemovedEventType,
			org.IDPOIDCConfigAddedEventType,
			org.IDPOIDCConfigChangedEventType).
		Builder()
}

func (wm *OrgIDPConfigWriteModel) AppendEvents(events ...eventstore.Event) {
	for _, event := range events {
		switch e := event.(type) {
		case *org.IDPConfigAddedEvent:
			if wm.ConfigID != e.ConfigID {
				continue
			}
			wm.IDPConfigWriteModel.AppendEvents(&e.IDPConfigAddedEvent)
		case *org.IDPConfigChangedEvent:
			if wm.ConfigID != e.ConfigID {
				continue
			}
			wm.IDPConfigWriteModel.AppendEvents(&e.IDPConfigChangedEvent)
		case *org.IDPConfigDeactivatedEvent:
			if wm.ConfigID != e.ConfigID {
				continue
			}
			wm.IDPConfigWriteModel.AppendEvents(&e.IDPConfigDeactivatedEvent)
		case *org.IDPConfigReactivatedEvent:
			if wm.ConfigID != e.ConfigID {
				continue
			}
			wm.IDPConfigWriteModel.AppendEvents(&e.IDPConfigReactivatedEvent)
		case *org.IDPConfigRemovedEvent:
			if wm.ConfigID != e.ConfigID {
				continue
			}
			wm.IDPConfigWriteModel.AppendEvents(&e.IDPConfigRemovedEvent)
		case *org.IDPOIDCConfigAddedEvent:
			if wm.ConfigID != e.IDPConfigID {
				continue
			}
			wm.IDPConfigWriteModel.AppendEvents(&e.OIDCConfigAddedEvent)
		case *org.IDPOIDCConfigChangedEvent:
			if wm.ConfigID != e.IDPConfigID {
				continue
			}
			wm.IDPConfigWriteModel.AppendEvents(&e.OIDCConfigChangedEvent)
		}
	}
}

func (wm *OrgIDPConfigWriteModel) Reduce() error {
	return wm.IDPConfigWriteModel.Reduce()
}

func (wm *OrgIDPConfigWriteModel) AppendAndReduce(events ...eventstore.Event) error {
	wm.AppendEvents(events...)
	return wm.Reduce()
}

func (wm *OrgIDPConfigWriteModel) NewChangedEvent(
	ctx context.Context,
	aggregate *eventstore.Aggregate,
	configID,
	name string,
	stylingType domain.IDPConfigStylingType,
	autoRegister bool,
) (*org.IDPConfigChangedEvent, bool) {

	changes := make([]idpconfig.IDPConfigChanges, 0)
	oldName := ""
	if wm.Name != name {
		oldName = wm.Name
		changes = append(changes, idpconfig.ChangeName(name))
	}
	if stylingType.Valid() && wm.StylingType != stylingType {
		changes = append(changes, idpconfig.ChangeStyleType(stylingType))
	}
	if wm.AutoRegister != autoRegister {
		changes = append(changes, idpconfig.ChangeAutoRegister(autoRegister))
	}
	if len(changes) == 0 {
		return nil, false
	}
	changeEvent, err := org.NewIDPConfigChangedEvent(ctx, aggregate, configID, oldName, changes)
	if err != nil {
		return nil, false
	}
	return changeEvent, true
}
