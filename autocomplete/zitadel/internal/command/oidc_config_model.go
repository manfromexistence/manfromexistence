package command

import (
	"github.com/zitadel/zitadel/internal/crypto"
	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/eventstore"
	"github.com/zitadel/zitadel/internal/repository/idpconfig"
)

type OIDCConfigWriteModel struct {
	eventstore.WriteModel

	IDPConfigID           string
	ClientID              string
	ClientSecret          *crypto.CryptoValue
	Issuer                string
	AuthorizationEndpoint string
	TokenEndpoint         string
	Scopes                []string

	IDPDisplayNameMapping domain.OIDCMappingField
	UserNameMapping       domain.OIDCMappingField
	State                 domain.IDPConfigState
}

func (wm *OIDCConfigWriteModel) Reduce() error {
	for _, event := range wm.Events {
		switch e := event.(type) {
		case *idpconfig.OIDCConfigAddedEvent:
			wm.reduceConfigAddedEvent(e)
		case *idpconfig.OIDCConfigChangedEvent:
			wm.reduceConfigChangedEvent(e)
		case *idpconfig.IDPConfigDeactivatedEvent:
			wm.State = domain.IDPConfigStateInactive
		case *idpconfig.IDPConfigReactivatedEvent:
			wm.State = domain.IDPConfigStateActive
		case *idpconfig.IDPConfigRemovedEvent:
			wm.State = domain.IDPConfigStateRemoved
		}
	}

	return wm.WriteModel.Reduce()
}

func (wm *OIDCConfigWriteModel) reduceConfigAddedEvent(e *idpconfig.OIDCConfigAddedEvent) {
	wm.IDPConfigID = e.IDPConfigID
	wm.ClientID = e.ClientID
	wm.ClientSecret = e.ClientSecret
	wm.Issuer = e.Issuer
	wm.AuthorizationEndpoint = e.AuthorizationEndpoint
	wm.TokenEndpoint = e.TokenEndpoint
	wm.Scopes = e.Scopes
	wm.IDPDisplayNameMapping = e.IDPDisplayNameMapping
	wm.UserNameMapping = e.UserNameMapping
	wm.State = domain.IDPConfigStateActive
}

func (wm *OIDCConfigWriteModel) reduceConfigChangedEvent(e *idpconfig.OIDCConfigChangedEvent) {
	if e.ClientID != nil {
		wm.ClientID = *e.ClientID
	}
	if e.Issuer != nil {
		wm.Issuer = *e.Issuer
	}
	if e.AuthorizationEndpoint != nil {
		wm.AuthorizationEndpoint = *e.AuthorizationEndpoint
	}
	if e.TokenEndpoint != nil {
		wm.TokenEndpoint = *e.TokenEndpoint
	}
	if len(e.Scopes) > 0 {
		wm.Scopes = e.Scopes
	}
	if e.IDPDisplayNameMapping != nil && e.IDPDisplayNameMapping.Valid() {
		wm.IDPDisplayNameMapping = *e.IDPDisplayNameMapping
	}
	if e.UserNameMapping != nil && e.UserNameMapping.Valid() {
		wm.UserNameMapping = *e.UserNameMapping
	}
}
