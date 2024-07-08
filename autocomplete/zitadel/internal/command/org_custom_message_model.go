package command

import (
	"golang.org/x/text/language"

	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/eventstore"
	"github.com/zitadel/zitadel/internal/repository/org"
)

type OrgCustomMessageTextReadModel struct {
	CustomMessageTextReadModel
}

func NewOrgCustomMessageTextWriteModel(orgID, messageTextType string, lang language.Tag) *OrgCustomMessageTextReadModel {
	return &OrgCustomMessageTextReadModel{
		CustomMessageTextReadModel{
			WriteModel: eventstore.WriteModel{
				AggregateID:   orgID,
				ResourceOwner: orgID,
			},
			MessageTextType: messageTextType,
			Language:        lang,
		},
	}
}

func (wm *OrgCustomMessageTextReadModel) AppendEvents(events ...eventstore.Event) {
	for _, event := range events {
		switch e := event.(type) {
		case *org.CustomTextSetEvent:
			wm.CustomMessageTextReadModel.AppendEvents(&e.CustomTextSetEvent)
		case *org.CustomTextRemovedEvent:
			wm.CustomMessageTextReadModel.AppendEvents(&e.CustomTextRemovedEvent)
		case *org.CustomTextTemplateRemovedEvent:
			wm.CustomMessageTextReadModel.AppendEvents(&e.CustomTextTemplateRemovedEvent)
		}
	}
}

func (wm *OrgCustomMessageTextReadModel) Reduce() error {
	return wm.CustomMessageTextReadModel.Reduce()
}

func (wm *OrgCustomMessageTextReadModel) Query() *eventstore.SearchQueryBuilder {
	return eventstore.NewSearchQueryBuilder(eventstore.ColumnsEvent).
		ResourceOwner(wm.ResourceOwner).
		AddQuery().
		AggregateTypes(org.AggregateType).
		AggregateIDs(wm.CustomMessageTextReadModel.AggregateID).
		EventTypes(
			org.CustomTextSetEventType,
			org.CustomTextRemovedEventType,
			org.CustomTextTemplateRemovedEventType).
		Builder()
}

type OrgCustomMessageTemplatesReadModel struct {
	CustomMessageTemplatesReadModel
}

func NewOrgCustomMessageTextsWriteModel(orgID string) *OrgCustomMessageTemplatesReadModel {
	return &OrgCustomMessageTemplatesReadModel{
		CustomMessageTemplatesReadModel{
			WriteModel: eventstore.WriteModel{
				AggregateID:   orgID,
				ResourceOwner: orgID,
			},
			CustomMessageTemplate: make(map[string]*CustomText),
		},
	}
}

func (wm *OrgCustomMessageTemplatesReadModel) AppendEvents(events ...eventstore.Event) {
	for _, event := range events {
		switch e := event.(type) {
		case *org.CustomTextSetEvent:
			if !domain.IsMessageTextType(e.Template) {
				continue
			}
			wm.CustomMessageTemplatesReadModel.AppendEvents(&e.CustomTextSetEvent)
		case *org.CustomTextRemovedEvent:
			if !domain.IsMessageTextType(e.Template) {
				continue
			}
			wm.CustomMessageTemplatesReadModel.AppendEvents(&e.CustomTextRemovedEvent)
		case *org.CustomTextTemplateRemovedEvent:
			if !domain.IsMessageTextType(e.Template) {
				continue
			}
			wm.CustomMessageTemplatesReadModel.AppendEvents(&e.CustomTextTemplateRemovedEvent)
		}
	}
}

func (wm *OrgCustomMessageTemplatesReadModel) Reduce() error {
	return wm.CustomMessageTemplatesReadModel.Reduce()
}

func (wm *OrgCustomMessageTemplatesReadModel) Query() *eventstore.SearchQueryBuilder {
	return eventstore.NewSearchQueryBuilder(eventstore.ColumnsEvent).
		ResourceOwner(wm.ResourceOwner).
		AddQuery().
		AggregateTypes(org.AggregateType).
		AggregateIDs(wm.CustomMessageTemplatesReadModel.AggregateID).
		EventTypes(
			org.CustomTextSetEventType,
			org.CustomTextRemovedEventType,
			org.CustomTextTemplateRemovedEventType).
		Builder()
}
