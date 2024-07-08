package command

import (
	"time"

	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/eventstore"
	"github.com/zitadel/zitadel/internal/repository/project"
)

type ApplicationKeyWriteModel struct {
	eventstore.WriteModel

	AppID          string
	ClientID       string
	KeyID          string
	KeyType        domain.AuthNKeyType
	ExpirationDate time.Time

	State       domain.AppState
	KeysAllowed bool
}

func NewApplicationKeyWriteModel(projectID, appID, keyID, resourceOwner string) *ApplicationKeyWriteModel {
	return &ApplicationKeyWriteModel{
		WriteModel: eventstore.WriteModel{
			AggregateID:   projectID,
			ResourceOwner: resourceOwner,
		},
		AppID: appID,
		KeyID: keyID,
	}
}

func (wm *ApplicationKeyWriteModel) AppendEvents(events ...eventstore.Event) {
	for _, event := range events {
		switch e := event.(type) {
		case *project.ApplicationRemovedEvent:
			if e.AppID != wm.AppID {
				continue
			}
			wm.WriteModel.AppendEvents(e)
		case *project.OIDCConfigAddedEvent:
			if e.AppID != wm.AppID {
				continue
			}
			wm.WriteModel.AppendEvents(e)
		case *project.OIDCConfigChangedEvent:
			if e.AppID != wm.AppID {
				continue
			}
			wm.WriteModel.AppendEvents(e)
		case *project.APIConfigAddedEvent:
			if e.AppID != wm.AppID {
				continue
			}
			wm.WriteModel.AppendEvents(e)
		case *project.APIConfigChangedEvent:
			if e.AppID != wm.AppID {
				continue
			}
			wm.WriteModel.AppendEvents(e)
		case *project.ApplicationKeyAddedEvent:
			if e.AppID != wm.AppID || e.KeyID != wm.KeyID {
				continue
			}
			wm.WriteModel.AppendEvents(e)
		case *project.ApplicationKeyRemovedEvent:
			if e.KeyID != wm.KeyID {
				continue
			}
			wm.WriteModel.AppendEvents(e)
		case *project.ProjectRemovedEvent:
			wm.WriteModel.AppendEvents(e)
		}
	}
}

func (wm *ApplicationKeyWriteModel) Reduce() error {
	for _, event := range wm.Events {
		switch e := event.(type) {
		case *project.ApplicationRemovedEvent:
			wm.State = domain.AppStateRemoved
		case *project.OIDCConfigAddedEvent:
			wm.appendAddOIDCEvent(e)
		case *project.OIDCConfigChangedEvent:
			wm.appendChangeOIDCEvent(e)
		case *project.APIConfigAddedEvent:
			wm.appendAddAPIEvent(e)
		case *project.APIConfigChangedEvent:
			wm.appendChangeAPIEvent(e)
		case *project.ApplicationKeyAddedEvent:
			wm.ClientID = e.ClientID
			wm.ExpirationDate = e.ExpirationDate
			wm.KeyType = e.KeyType
			wm.State = domain.AppStateActive
		case *project.ApplicationKeyRemovedEvent:
			wm.State = domain.AppStateRemoved
		case *project.ProjectRemovedEvent:
			wm.State = domain.AppStateRemoved
		}
	}
	return wm.WriteModel.Reduce()
}

func (wm *ApplicationKeyWriteModel) appendAddOIDCEvent(e *project.OIDCConfigAddedEvent) {
	wm.ClientID = e.ClientID
	wm.KeysAllowed = e.AuthMethodType == domain.OIDCAuthMethodTypePrivateKeyJWT
}

func (wm *ApplicationKeyWriteModel) appendChangeOIDCEvent(e *project.OIDCConfigChangedEvent) {
	if e.AuthMethodType != nil {
		wm.KeysAllowed = *e.AuthMethodType == domain.OIDCAuthMethodTypePrivateKeyJWT
	}
}

func (wm *ApplicationKeyWriteModel) appendAddAPIEvent(e *project.APIConfigAddedEvent) {
	wm.ClientID = e.ClientID
	wm.KeysAllowed = e.AuthMethodType == domain.APIAuthMethodTypePrivateKeyJWT
}

func (wm *ApplicationKeyWriteModel) appendChangeAPIEvent(e *project.APIConfigChangedEvent) {
	if e.AuthMethodType != nil {
		wm.KeysAllowed = *e.AuthMethodType == domain.APIAuthMethodTypePrivateKeyJWT
	}
}

func (wm *ApplicationKeyWriteModel) Query() *eventstore.SearchQueryBuilder {
	return eventstore.NewSearchQueryBuilder(eventstore.ColumnsEvent).
		ResourceOwner(wm.ResourceOwner).
		AddQuery().
		AggregateTypes(project.AggregateType).
		AggregateIDs(wm.AggregateID).
		EventTypes(
			project.ApplicationRemovedType,
			project.OIDCConfigAddedType,
			project.OIDCConfigChangedType,
			project.APIConfigAddedType,
			project.APIConfigChangedType,
			project.ApplicationKeyAddedEventType,
			project.ApplicationKeyRemovedEventType,
			project.ProjectRemovedType).
		Builder()
}
