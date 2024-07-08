package command

import (
	"context"

	"github.com/zitadel/zitadel/internal/crypto"
	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/eventstore"
	"github.com/zitadel/zitadel/internal/repository/project"
)

type APIApplicationWriteModel struct {
	eventstore.WriteModel

	AppID              string
	AppName            string
	ClientID           string
	HashedSecret       string
	ClientSecretString string
	AuthMethodType     domain.APIAuthMethodType
	State              domain.AppState
	api                bool
}

func NewAPIApplicationWriteModelWithAppID(projectID, appID, resourceOwner string) *APIApplicationWriteModel {
	return &APIApplicationWriteModel{
		WriteModel: eventstore.WriteModel{
			AggregateID:   projectID,
			ResourceOwner: resourceOwner,
		},
		AppID: appID,
	}
}

func NewAPIApplicationWriteModel(projectID, resourceOwner string) *APIApplicationWriteModel {
	return &APIApplicationWriteModel{
		WriteModel: eventstore.WriteModel{
			AggregateID:   projectID,
			ResourceOwner: resourceOwner,
		},
	}
}
func (wm *APIApplicationWriteModel) AppendEvents(events ...eventstore.Event) {
	for _, event := range events {
		switch e := event.(type) {
		case *project.ApplicationAddedEvent:
			if e.AppID != wm.AppID {
				continue
			}
			wm.WriteModel.AppendEvents(e)
		case *project.ApplicationChangedEvent:
			if e.AppID != wm.AppID {
				continue
			}
			wm.WriteModel.AppendEvents(e)
		case *project.ApplicationDeactivatedEvent:
			if e.AppID != wm.AppID {
				continue
			}
			wm.WriteModel.AppendEvents(e)
		case *project.ApplicationReactivatedEvent:
			if e.AppID != wm.AppID {
				continue
			}
			wm.WriteModel.AppendEvents(e)
		case *project.ApplicationRemovedEvent:
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
		case *project.APIConfigSecretChangedEvent:
			if e.AppID != wm.AppID {
				continue
			}
			wm.WriteModel.AppendEvents(e)
		case *project.APIConfigSecretHashUpdatedEvent:
			if e.AppID != wm.AppID {
				continue
			}
			wm.WriteModel.AppendEvents(e)
		case *project.ProjectRemovedEvent:
			wm.WriteModel.AppendEvents(e)
		}
	}
}

func (wm *APIApplicationWriteModel) Reduce() error {
	for _, event := range wm.Events {
		switch e := event.(type) {
		case *project.ApplicationAddedEvent:
			wm.AppName = e.Name
			wm.State = domain.AppStateActive
		case *project.ApplicationChangedEvent:
			wm.AppName = e.Name
		case *project.ApplicationDeactivatedEvent:
			if wm.State == domain.AppStateRemoved {
				continue
			}
			wm.State = domain.AppStateInactive
		case *project.ApplicationReactivatedEvent:
			if wm.State == domain.AppStateRemoved {
				continue
			}
			wm.State = domain.AppStateActive
		case *project.ApplicationRemovedEvent:
			wm.State = domain.AppStateRemoved
		case *project.APIConfigAddedEvent:
			wm.appendAddAPIEvent(e)
		case *project.APIConfigChangedEvent:
			wm.appendChangeAPIEvent(e)
		case *project.APIConfigSecretChangedEvent:
			wm.HashedSecret = crypto.SecretOrEncodedHash(e.ClientSecret, e.HashedSecret)
		case *project.APIConfigSecretHashUpdatedEvent:
			wm.HashedSecret = e.HashedSecret
		case *project.ProjectRemovedEvent:
			wm.State = domain.AppStateRemoved
		}
	}
	return wm.WriteModel.Reduce()
}

func (wm *APIApplicationWriteModel) appendAddAPIEvent(e *project.APIConfigAddedEvent) {
	wm.api = true
	wm.ClientID = e.ClientID
	wm.HashedSecret = crypto.SecretOrEncodedHash(e.ClientSecret, e.HashedSecret)
	wm.AuthMethodType = e.AuthMethodType
}

func (wm *APIApplicationWriteModel) appendChangeAPIEvent(e *project.APIConfigChangedEvent) {
	if e.AuthMethodType != nil {
		wm.AuthMethodType = *e.AuthMethodType
	}
}

func (wm *APIApplicationWriteModel) Query() *eventstore.SearchQueryBuilder {
	return eventstore.NewSearchQueryBuilder(eventstore.ColumnsEvent).
		ResourceOwner(wm.ResourceOwner).
		AddQuery().
		AggregateTypes(project.AggregateType).
		AggregateIDs(wm.AggregateID).
		EventTypes(
			project.ApplicationAddedType,
			project.ApplicationChangedType,
			project.ApplicationDeactivatedType,
			project.ApplicationReactivatedType,
			project.ApplicationRemovedType,
			project.APIConfigAddedType,
			project.APIConfigChangedType,
			project.APIConfigSecretChangedType,
			project.APIConfigSecretHashUpdatedType,
			project.ProjectRemovedType,
		).Builder()
}

func (wm *APIApplicationWriteModel) NewChangedEvent(
	ctx context.Context,
	aggregate *eventstore.Aggregate,
	appID string,
	authMethodType domain.APIAuthMethodType,
) (*project.APIConfigChangedEvent, bool, error) {
	changes := make([]project.APIConfigChanges, 0)
	var err error

	if wm.AuthMethodType != authMethodType {
		changes = append(changes, project.ChangeAPIAuthMethodType(authMethodType))
	}
	if len(changes) == 0 {
		return nil, false, nil
	}
	changeEvent, err := project.NewAPIConfigChangedEvent(ctx, aggregate, appID, changes)
	if err != nil {
		return nil, false, err
	}
	return changeEvent, true, nil
}

func (wm *APIApplicationWriteModel) IsAPI() bool {
	return wm.api
}
