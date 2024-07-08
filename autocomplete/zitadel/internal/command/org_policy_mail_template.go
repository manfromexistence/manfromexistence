package command

import (
	"context"

	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/repository/org"
	"github.com/zitadel/zitadel/internal/zerrors"
)

func (c *Commands) AddMailTemplate(ctx context.Context, resourceOwner string, policy *domain.MailTemplate) (*domain.MailTemplate, error) {
	if resourceOwner == "" {
		return nil, zerrors.ThrowInvalidArgument(nil, "Org-M8dfs", "Errors.ResourceOwnerMissing")
	}
	if !policy.IsValid() {
		return nil, zerrors.ThrowPreconditionFailed(nil, "ORG-3m9fs", "Errors.Org.MailTemplate.Invalid")
	}
	addedPolicy := NewOrgMailTemplateWriteModel(resourceOwner)
	err := c.eventstore.FilterToQueryReducer(ctx, addedPolicy)
	if err != nil {
		return nil, err
	}
	if addedPolicy.State == domain.PolicyStateActive {
		return nil, zerrors.ThrowAlreadyExists(nil, "Org-9kufs", "Errors.Org.MailTemplate.AlreadyExists")
	}

	orgAgg := OrgAggregateFromWriteModel(&addedPolicy.MailTemplateWriteModel.WriteModel)
	pushedEvents, err := c.eventstore.Push(ctx, org.NewMailTemplateAddedEvent(ctx, orgAgg, policy.Template))
	if err != nil {
		return nil, err
	}
	err = AppendAndReduce(addedPolicy, pushedEvents...)
	if err != nil {
		return nil, err
	}
	return writeModelToMailTemplate(&addedPolicy.MailTemplateWriteModel), nil
}

func (c *Commands) ChangeMailTemplate(ctx context.Context, resourceOwner string, policy *domain.MailTemplate) (*domain.MailTemplate, error) {
	if resourceOwner == "" {
		return nil, zerrors.ThrowInvalidArgument(nil, "Org-M9fFs", "Errors.ResourceOwnerMissing")
	}
	if !policy.IsValid() {
		return nil, zerrors.ThrowPreconditionFailed(nil, "ORG-9f9ds", "Errors.Org.MailTemplate.Invalid")
	}
	existingPolicy := NewOrgMailTemplateWriteModel(resourceOwner)
	err := c.eventstore.FilterToQueryReducer(ctx, existingPolicy)
	if err != nil {
		return nil, err
	}
	if existingPolicy.State == domain.PolicyStateUnspecified || existingPolicy.State == domain.PolicyStateRemoved {
		return nil, zerrors.ThrowNotFound(nil, "Org-5m9ie", "Errors.Org.MailTemplate.NotFound")
	}

	orgAgg := OrgAggregateFromWriteModel(&existingPolicy.MailTemplateWriteModel.WriteModel)
	changedEvent, hasChanged := existingPolicy.NewChangedEvent(ctx, orgAgg, policy.Template)
	if !hasChanged {
		return nil, zerrors.ThrowPreconditionFailed(nil, "Org-49hfj", "Errors.Org.MailTemplate.NotChanged")
	}

	pushedEvents, err := c.eventstore.Push(ctx, changedEvent)
	if err != nil {
		return nil, err
	}
	err = AppendAndReduce(existingPolicy, pushedEvents...)
	if err != nil {
		return nil, err
	}
	return writeModelToMailTemplate(&existingPolicy.MailTemplateWriteModel), nil
}

func (c *Commands) RemoveMailTemplate(ctx context.Context, orgID string) error {
	if orgID == "" {
		return zerrors.ThrowInvalidArgument(nil, "Org-5Jgis", "Errors.ResourceOwnerMissing")
	}
	existingPolicy := NewOrgMailTemplateWriteModel(orgID)
	err := c.eventstore.FilterToQueryReducer(ctx, existingPolicy)
	if err != nil {
		return err
	}
	if existingPolicy.State == domain.PolicyStateUnspecified || existingPolicy.State == domain.PolicyStateRemoved {
		return zerrors.ThrowNotFound(nil, "Org-3b8Jf", "Errors.Org.MailTemplate.NotFound")
	}
	orgAgg := OrgAggregateFromWriteModel(&existingPolicy.WriteModel)

	_, err = c.eventstore.Push(ctx, org.NewMailTemplateRemovedEvent(ctx, orgAgg))
	return err
}
