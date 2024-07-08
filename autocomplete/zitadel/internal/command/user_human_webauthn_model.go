package command

import (
	"time"

	"github.com/zitadel/zitadel/internal/crypto"
	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/eventstore"
	"github.com/zitadel/zitadel/internal/repository/user"
)

type HumanWebAuthNWriteModel struct {
	eventstore.WriteModel

	WebauthNTokenID string
	Challenge       string

	KeyID             []byte
	PublicKey         []byte
	AttestationType   string
	AAGUID            []byte
	SignCount         uint32
	WebAuthNTokenName string
	RPID              string

	State domain.MFAState
}

func NewHumanWebAuthNWriteModel(userID, webAuthNTokenID, resourceOwner string) *HumanWebAuthNWriteModel {
	return &HumanWebAuthNWriteModel{
		WriteModel: eventstore.WriteModel{
			AggregateID:   userID,
			ResourceOwner: resourceOwner,
		},
		WebauthNTokenID: webAuthNTokenID,
	}
}

func (wm *HumanWebAuthNWriteModel) AppendEvents(events ...eventstore.Event) {
	for _, event := range events {
		switch e := event.(type) {
		case *user.HumanWebAuthNAddedEvent:
			if wm.WebauthNTokenID == e.WebAuthNTokenID {
				wm.WriteModel.AppendEvents(e)
			}
		case *user.HumanPasswordlessAddedEvent:
			if wm.WebauthNTokenID == e.WebAuthNTokenID {
				wm.WriteModel.AppendEvents(&e.HumanWebAuthNAddedEvent)
			}
		case *user.HumanU2FAddedEvent:
			if wm.WebauthNTokenID == e.WebAuthNTokenID {
				wm.WriteModel.AppendEvents(&e.HumanWebAuthNAddedEvent)
			}
		case *user.HumanWebAuthNVerifiedEvent:
			if wm.WebauthNTokenID == e.WebAuthNTokenID {
				wm.WriteModel.AppendEvents(e)
			}
		case *user.HumanPasswordlessVerifiedEvent:
			if wm.WebauthNTokenID == e.WebAuthNTokenID {
				wm.WriteModel.AppendEvents(&e.HumanWebAuthNVerifiedEvent)
			}
		case *user.HumanU2FVerifiedEvent:
			if wm.WebauthNTokenID == e.WebAuthNTokenID {
				wm.WriteModel.AppendEvents(&e.HumanWebAuthNVerifiedEvent)
			}
		case *user.HumanWebAuthNSignCountChangedEvent:
			if wm.WebauthNTokenID == e.WebAuthNTokenID {
				wm.WriteModel.AppendEvents(e)
			}
		case *user.HumanPasswordlessSignCountChangedEvent:
			if wm.WebauthNTokenID == e.WebAuthNTokenID {
				wm.WriteModel.AppendEvents(&e.HumanWebAuthNSignCountChangedEvent)
			}
		case *user.HumanU2FSignCountChangedEvent:
			if wm.WebauthNTokenID == e.WebAuthNTokenID {
				wm.WriteModel.AppendEvents(&e.HumanWebAuthNSignCountChangedEvent)
			}
		case *user.HumanWebAuthNRemovedEvent:
			if wm.WebauthNTokenID == e.WebAuthNTokenID {
				wm.WriteModel.AppendEvents(e)
			}
		case *user.HumanPasswordlessRemovedEvent:
			if wm.WebauthNTokenID == e.WebAuthNTokenID {
				wm.WriteModel.AppendEvents(&e.HumanWebAuthNRemovedEvent)
			}
		case *user.HumanU2FRemovedEvent:
			if wm.WebauthNTokenID == e.WebAuthNTokenID {
				wm.WriteModel.AppendEvents(&e.HumanWebAuthNRemovedEvent)
			}
		case *user.UserRemovedEvent:
			wm.WriteModel.AppendEvents(e)
		}
	}
}

func (wm *HumanWebAuthNWriteModel) Reduce() error {
	for _, event := range wm.Events {
		switch e := event.(type) {
		case *user.HumanWebAuthNAddedEvent:
			wm.appendAddedEvent(e)
		case *user.HumanWebAuthNVerifiedEvent:
			wm.appendVerifiedEvent(e)
		case *user.HumanWebAuthNSignCountChangedEvent:
			wm.SignCount = e.SignCount
		case *user.HumanWebAuthNRemovedEvent:
			wm.State = domain.MFAStateRemoved
		case *user.UserRemovedEvent:
			wm.State = domain.MFAStateRemoved
		}
	}
	return wm.WriteModel.Reduce()
}

func (wm *HumanWebAuthNWriteModel) appendAddedEvent(e *user.HumanWebAuthNAddedEvent) {
	wm.WebauthNTokenID = e.WebAuthNTokenID
	wm.Challenge = e.Challenge
	wm.RPID = e.RPID
	wm.State = domain.MFAStateNotReady
}

func (wm *HumanWebAuthNWriteModel) appendVerifiedEvent(e *user.HumanWebAuthNVerifiedEvent) {
	wm.KeyID = e.KeyID
	wm.PublicKey = e.PublicKey
	wm.AttestationType = e.AttestationType
	wm.AAGUID = e.AAGUID
	wm.SignCount = e.SignCount
	wm.WebAuthNTokenName = e.WebAuthNTokenName
	wm.State = domain.MFAStateReady
}

func (wm *HumanWebAuthNWriteModel) Query() *eventstore.SearchQueryBuilder {
	return eventstore.NewSearchQueryBuilder(eventstore.ColumnsEvent).
		ResourceOwner(wm.ResourceOwner).
		AddQuery().
		AggregateTypes(user.AggregateType).
		AggregateIDs(wm.AggregateID).
		EventTypes(user.HumanU2FTokenAddedType,
			user.HumanPasswordlessTokenAddedType,
			user.HumanU2FTokenAddedType,
			user.HumanPasswordlessTokenAddedType,
			user.HumanU2FTokenSignCountChangedType,
			user.HumanPasswordlessTokenSignCountChangedType,
			user.HumanU2FTokenRemovedType,
			user.HumanPasswordlessTokenRemovedType,
			user.UserRemovedType).
		Builder()
}

type HumanWebAuthNTokensReadModel interface {
	eventstore.QueryReducer
	GetWebAuthNTokens() []*HumanWebAuthNWriteModel
	WebAuthNTokenByID(id string) (int, *HumanWebAuthNWriteModel)
}

type HumanU2FTokensReadModel struct {
	eventstore.WriteModel

	WebAuthNTokens []*HumanWebAuthNWriteModel
	UserState      domain.UserState
}

func NewHumanU2FTokensReadModel(userID, resourceOwner string) *HumanU2FTokensReadModel {
	return &HumanU2FTokensReadModel{
		WriteModel: eventstore.WriteModel{
			AggregateID:   userID,
			ResourceOwner: resourceOwner,
		},
	}
}

func (wm *HumanU2FTokensReadModel) AppendEvents(events ...eventstore.Event) {
	wm.WriteModel.AppendEvents(events...)
}

func (wm *HumanU2FTokensReadModel) Reduce() error {
	for _, event := range wm.Events {
		switch e := event.(type) {
		case *user.HumanU2FAddedEvent:
			token := &HumanWebAuthNWriteModel{}
			token.appendAddedEvent(&e.HumanWebAuthNAddedEvent)
			token.WriteModel = eventstore.WriteModel{
				AggregateID: e.Aggregate().ID,
			}
			replaced := false
			for i, existingTokens := range wm.WebAuthNTokens {
				if existingTokens.State == domain.MFAStateNotReady {
					wm.WebAuthNTokens[i] = token
					replaced = true
				}
			}
			if !replaced {
				wm.WebAuthNTokens = append(wm.WebAuthNTokens, token)
			}
		case *user.HumanU2FVerifiedEvent:
			idx, token := wm.WebAuthNTokenByID(e.WebAuthNTokenID)
			if idx < 0 {
				continue
			}
			token.appendVerifiedEvent(&e.HumanWebAuthNVerifiedEvent)
		case *user.HumanU2FRemovedEvent:
			idx, _ := wm.WebAuthNTokenByID(e.WebAuthNTokenID)
			if idx < 0 {
				continue
			}
			copy(wm.WebAuthNTokens[idx:], wm.WebAuthNTokens[idx+1:])
			wm.WebAuthNTokens[len(wm.WebAuthNTokens)-1] = nil
			wm.WebAuthNTokens = wm.WebAuthNTokens[:len(wm.WebAuthNTokens)-1]
		case *user.UserRemovedEvent:
			wm.UserState = domain.UserStateDeleted
		}
	}
	return wm.WriteModel.Reduce()
}

func (rm *HumanU2FTokensReadModel) Query() *eventstore.SearchQueryBuilder {
	return eventstore.NewSearchQueryBuilder(eventstore.ColumnsEvent).
		ResourceOwner(rm.ResourceOwner).
		AddQuery().
		AggregateTypes(user.AggregateType).
		AggregateIDs(rm.AggregateID).
		EventTypes(
			user.HumanU2FTokenAddedType,
			user.HumanU2FTokenVerifiedType,
			user.HumanU2FTokenRemovedType).
		Builder()

}

func (wm *HumanU2FTokensReadModel) GetWebAuthNTokens() []*HumanWebAuthNWriteModel {
	return wm.WebAuthNTokens
}

func (wm *HumanU2FTokensReadModel) WebAuthNTokenByID(id string) (idx int, token *HumanWebAuthNWriteModel) {
	for idx, token = range wm.WebAuthNTokens {
		if token.WebauthNTokenID == id {
			return idx, token
		}
	}
	return -1, nil
}

type HumanPasswordlessTokensReadModel struct {
	eventstore.WriteModel

	WebAuthNTokens []*HumanWebAuthNWriteModel
	UserState      domain.UserState
}

func NewHumanPasswordlessTokensReadModel(userID, resourceOwner string) *HumanPasswordlessTokensReadModel {
	return &HumanPasswordlessTokensReadModel{
		WriteModel: eventstore.WriteModel{
			AggregateID:   userID,
			ResourceOwner: resourceOwner,
		},
	}
}

func (wm *HumanPasswordlessTokensReadModel) AppendEvents(events ...eventstore.Event) {
	wm.WriteModel.AppendEvents(events...)
}

func (wm *HumanPasswordlessTokensReadModel) Reduce() error {
	for _, event := range wm.Events {
		switch e := event.(type) {
		case *user.HumanPasswordlessAddedEvent:
			token := &HumanWebAuthNWriteModel{}
			token.appendAddedEvent(&e.HumanWebAuthNAddedEvent)
			token.WriteModel = eventstore.WriteModel{
				AggregateID: e.Aggregate().ID,
			}
			replaced := false
			for i, existingTokens := range wm.WebAuthNTokens {
				if existingTokens.State == domain.MFAStateNotReady {
					wm.WebAuthNTokens[i] = token
					replaced = true
				}
			}
			if !replaced {
				wm.WebAuthNTokens = append(wm.WebAuthNTokens, token)
			}
		case *user.HumanPasswordlessVerifiedEvent:
			idx, token := wm.WebAuthNTokenByID(e.WebAuthNTokenID)
			if idx < 0 {
				continue
			}
			token.appendVerifiedEvent(&e.HumanWebAuthNVerifiedEvent)
		case *user.HumanPasswordlessRemovedEvent:
			idx, _ := wm.WebAuthNTokenByID(e.WebAuthNTokenID)
			if idx < 0 {
				continue
			}
			copy(wm.WebAuthNTokens[idx:], wm.WebAuthNTokens[idx+1:])
			wm.WebAuthNTokens[len(wm.WebAuthNTokens)-1] = nil
			wm.WebAuthNTokens = wm.WebAuthNTokens[:len(wm.WebAuthNTokens)-1]
		case *user.UserRemovedEvent:
			wm.UserState = domain.UserStateDeleted
		}
	}
	return wm.WriteModel.Reduce()
}

func (rm *HumanPasswordlessTokensReadModel) Query() *eventstore.SearchQueryBuilder {
	return eventstore.NewSearchQueryBuilder(eventstore.ColumnsEvent).
		ResourceOwner(rm.ResourceOwner).
		AddQuery().
		AggregateTypes(user.AggregateType).
		AggregateIDs(rm.AggregateID).
		EventTypes(
			user.HumanPasswordlessTokenAddedType,
			user.HumanPasswordlessTokenVerifiedType,
			user.HumanPasswordlessTokenRemovedType).
		Builder()

}

func (wm *HumanPasswordlessTokensReadModel) GetWebAuthNTokens() []*HumanWebAuthNWriteModel {
	return wm.WebAuthNTokens
}

func (wm *HumanPasswordlessTokensReadModel) WebAuthNTokenByID(id string) (idx int, token *HumanWebAuthNWriteModel) {
	for idx, token = range wm.WebAuthNTokens {
		if token.WebauthNTokenID == id {
			return idx, token
		}
	}
	return -1, nil
}

type HumanU2FLoginReadModel struct {
	eventstore.WriteModel

	AuthReqID            string
	Challenge            string
	AllowedCredentialIDs [][]byte
	UserVerification     domain.UserVerificationRequirement
	State                domain.UserState
}

func NewHumanU2FLoginReadModel(userID, authReqID, resourceOwner string) *HumanU2FLoginReadModel {
	return &HumanU2FLoginReadModel{
		WriteModel: eventstore.WriteModel{
			AggregateID:   userID,
			ResourceOwner: resourceOwner,
		},
		AuthReqID: authReqID,
	}
}

func (wm *HumanU2FLoginReadModel) AppendEvents(events ...eventstore.Event) {
	for _, event := range events {
		switch e := event.(type) {
		case *user.HumanU2FBeginLoginEvent:
			if e.AuthRequestInfo.ID != wm.AuthReqID {
				continue
			}
			wm.WriteModel.AppendEvents(e)
		case *user.UserRemovedEvent:
			wm.WriteModel.AppendEvents(e)
		}
	}
}

func (wm *HumanU2FLoginReadModel) Reduce() error {
	for _, event := range wm.Events {
		switch e := event.(type) {
		case *user.HumanU2FBeginLoginEvent:
			wm.Challenge = e.Challenge
			wm.AllowedCredentialIDs = e.AllowedCredentialIDs
			wm.UserVerification = e.UserVerification
			wm.State = domain.UserStateActive
		case *user.UserRemovedEvent:
			wm.State = domain.UserStateDeleted
		}
	}
	return wm.WriteModel.Reduce()
}

func (rm *HumanU2FLoginReadModel) Query() *eventstore.SearchQueryBuilder {
	return eventstore.NewSearchQueryBuilder(eventstore.ColumnsEvent).
		ResourceOwner(rm.ResourceOwner).
		AddQuery().
		AggregateTypes(user.AggregateType).
		AggregateIDs(rm.AggregateID).
		EventTypes(
			user.HumanU2FTokenBeginLoginType,
			user.UserRemovedType).
		Builder()
}

type HumanPasswordlessLoginReadModel struct {
	eventstore.WriteModel

	AuthReqID            string
	Challenge            string
	AllowedCredentialIDs [][]byte
	UserVerification     domain.UserVerificationRequirement
	State                domain.UserState
}

func NewHumanPasswordlessLoginReadModel(userID, authReqID, resourceOwner string) *HumanPasswordlessLoginReadModel {
	return &HumanPasswordlessLoginReadModel{
		WriteModel: eventstore.WriteModel{
			AggregateID:   userID,
			ResourceOwner: resourceOwner,
		},
		AuthReqID: authReqID,
	}
}

func (wm *HumanPasswordlessLoginReadModel) AppendEvents(events ...eventstore.Event) {
	for _, event := range events {
		switch e := event.(type) {
		case *user.HumanPasswordlessBeginLoginEvent:
			if e.AuthRequestInfo.ID != wm.AuthReqID {
				continue
			}
			wm.WriteModel.AppendEvents(e)
		case *user.UserRemovedEvent:
			wm.WriteModel.AppendEvents(e)
		}
	}
}

func (wm *HumanPasswordlessLoginReadModel) Reduce() error {
	for _, event := range wm.Events {
		switch e := event.(type) {
		case *user.HumanPasswordlessBeginLoginEvent:
			wm.Challenge = e.Challenge
			wm.AllowedCredentialIDs = e.AllowedCredentialIDs
			wm.UserVerification = e.UserVerification
			wm.State = domain.UserStateActive
		case *user.UserRemovedEvent:
			wm.State = domain.UserStateDeleted
		}
	}
	return wm.WriteModel.Reduce()
}

func (rm *HumanPasswordlessLoginReadModel) Query() *eventstore.SearchQueryBuilder {
	return eventstore.NewSearchQueryBuilder(eventstore.ColumnsEvent).
		ResourceOwner(rm.ResourceOwner).
		AddQuery().
		AggregateTypes(user.AggregateType).
		AggregateIDs(rm.AggregateID).
		EventTypes(
			user.HumanPasswordlessTokenBeginLoginType,
			user.UserRemovedType).
		Builder()

}

type HumanPasswordlessInitCodeWriteModel struct {
	eventstore.WriteModel

	CodeID     string
	Attempts   uint8
	CryptoCode *crypto.CryptoValue
	Expiration time.Duration
	State      domain.PasswordlessInitCodeState
}

func NewHumanPasswordlessInitCodeWriteModel(userID, codeID, resourceOwner string) *HumanPasswordlessInitCodeWriteModel {
	return &HumanPasswordlessInitCodeWriteModel{
		WriteModel: eventstore.WriteModel{
			AggregateID:   userID,
			ResourceOwner: resourceOwner,
		},
		CodeID: codeID,
	}
}

func (wm *HumanPasswordlessInitCodeWriteModel) AppendEvents(events ...eventstore.Event) {
	for _, event := range events {
		switch e := event.(type) {
		case *user.HumanPasswordlessInitCodeAddedEvent:
			if wm.CodeID == e.ID {
				wm.WriteModel.AppendEvents(e)
			}
		case *user.HumanPasswordlessInitCodeRequestedEvent:
			if wm.CodeID == e.ID {
				wm.WriteModel.AppendEvents(e)
			}
		case *user.HumanPasswordlessInitCodeSentEvent:
			if wm.CodeID == e.ID {
				wm.WriteModel.AppendEvents(e)
			}
		case *user.HumanPasswordlessInitCodeCheckFailedEvent:
			if wm.CodeID == e.ID {
				wm.WriteModel.AppendEvents(e)
			}
		case *user.HumanPasswordlessInitCodeCheckSucceededEvent:
			if wm.CodeID == e.ID {
				wm.WriteModel.AppendEvents(e)
			}
		case *user.UserRemovedEvent:
			wm.WriteModel.AppendEvents(e)
		}
	}
}

func (wm *HumanPasswordlessInitCodeWriteModel) Reduce() error {
	for _, event := range wm.Events {
		switch e := event.(type) {
		case *user.HumanPasswordlessInitCodeAddedEvent:
			wm.appendAddedEvent(e)
		case *user.HumanPasswordlessInitCodeRequestedEvent:
			wm.appendRequestedEvent(e)
		case *user.HumanPasswordlessInitCodeSentEvent:
			wm.State = domain.PasswordlessInitCodeStateActive
		case *user.HumanPasswordlessInitCodeCheckFailedEvent:
			wm.appendCheckFailedEvent(e)
		case *user.HumanPasswordlessInitCodeCheckSucceededEvent:
			wm.State = domain.PasswordlessInitCodeStateRemoved
		case *user.UserRemovedEvent:
			wm.State = domain.PasswordlessInitCodeStateRemoved
		}
	}
	return wm.WriteModel.Reduce()
}

func (wm *HumanPasswordlessInitCodeWriteModel) appendAddedEvent(e *user.HumanPasswordlessInitCodeAddedEvent) {
	wm.CryptoCode = e.Code
	wm.Expiration = e.Expiry
	wm.State = domain.PasswordlessInitCodeStateActive
}

func (wm *HumanPasswordlessInitCodeWriteModel) appendRequestedEvent(e *user.HumanPasswordlessInitCodeRequestedEvent) {
	wm.CryptoCode = e.Code
	wm.Expiration = e.Expiry
	wm.State = domain.PasswordlessInitCodeStateRequested
	if e.CodeReturned {
		wm.State = domain.PasswordlessInitCodeStateActive
	}
}

func (wm *HumanPasswordlessInitCodeWriteModel) appendCheckFailedEvent(e *user.HumanPasswordlessInitCodeCheckFailedEvent) {
	wm.Attempts++
	if wm.Attempts == 3 { //TODO: config?
		wm.State = domain.PasswordlessInitCodeStateRemoved
	}
}

func (wm *HumanPasswordlessInitCodeWriteModel) Query() *eventstore.SearchQueryBuilder {
	return eventstore.NewSearchQueryBuilder(eventstore.ColumnsEvent).
		ResourceOwner(wm.ResourceOwner).
		AddQuery().
		AggregateTypes(user.AggregateType).
		AggregateIDs(wm.AggregateID).
		EventTypes(user.HumanPasswordlessInitCodeAddedType,
			user.HumanPasswordlessInitCodeRequestedType,
			user.HumanPasswordlessInitCodeSentType,
			user.HumanPasswordlessInitCodeCheckFailedType,
			user.HumanPasswordlessInitCodeCheckSucceededType,
			user.UserRemovedType).
		Builder()
}
