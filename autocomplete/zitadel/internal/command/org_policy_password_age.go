package command

import (
	"context"

	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/repository/org"
	"github.com/zitadel/zitadel/internal/zerrors"
)

func (c *Commands) AddPasswordAgePolicy(ctx context.Context, resourceOwner string, policy *domain.PasswordAgePolicy) (*domain.PasswordAgePolicy, error) {
	if resourceOwner == "" {
		return nil, zerrors.ThrowInvalidArgument(nil, "Org-M9fsd", "Errors.ResourceOwnerMissing")
	}
	addedPolicy := NewOrgPasswordAgePolicyWriteModel(resourceOwner)
	err := c.eventstore.FilterToQueryReducer(ctx, addedPolicy)
	if err != nil {
		return nil, err
	}
	if addedPolicy.State == domain.PolicyStateActive {
		return nil, zerrors.ThrowAlreadyExists(nil, "ORG-Lk0dS", "Errors.Org.PasswordAgePolicy.AlreadyExists")
	}

	orgAgg := OrgAggregateFromWriteModel(&addedPolicy.WriteModel)
	pushedEvents, err := c.eventstore.Push(ctx, org.NewPasswordAgePolicyAddedEvent(ctx, orgAgg, policy.ExpireWarnDays, policy.MaxAgeDays))
	if err != nil {
		return nil, err
	}
	err = AppendAndReduce(addedPolicy, pushedEvents...)
	if err != nil {
		return nil, err
	}
	return writeModelToPasswordAgePolicy(&addedPolicy.PasswordAgePolicyWriteModel), nil
}

func (c *Commands) ChangePasswordAgePolicy(ctx context.Context, resourceOwner string, policy *domain.PasswordAgePolicy) (*domain.PasswordAgePolicy, error) {
	if resourceOwner == "" {
		return nil, zerrors.ThrowInvalidArgument(nil, "Org-57tGs", "Errors.ResourceOwnerMissing")
	}
	existingPolicy := NewOrgPasswordAgePolicyWriteModel(resourceOwner)
	err := c.eventstore.FilterToQueryReducer(ctx, existingPolicy)
	if err != nil {
		return nil, err
	}
	if existingPolicy.State == domain.PolicyStateUnspecified || existingPolicy.State == domain.PolicyStateRemoved {
		return nil, zerrors.ThrowNotFound(nil, "ORG-0oPew", "Errors.Org.PasswordAgePolicy.NotFound")
	}

	orgAgg := OrgAggregateFromWriteModel(&existingPolicy.PasswordAgePolicyWriteModel.WriteModel)
	changedEvent, hasChanged := existingPolicy.NewChangedEvent(ctx, orgAgg, policy.ExpireWarnDays, policy.MaxAgeDays)
	if !hasChanged {
		return nil, zerrors.ThrowPreconditionFailed(nil, "Org-dsgjR", "Errors.ORg.LabelPolicy.NotChanged")
	}

	pushedEvents, err := c.eventstore.Push(ctx, changedEvent)
	if err != nil {
		return nil, err
	}
	err = AppendAndReduce(existingPolicy, pushedEvents...)
	if err != nil {
		return nil, err
	}
	return writeModelToPasswordAgePolicy(&existingPolicy.PasswordAgePolicyWriteModel), nil
}

func (c *Commands) RemovePasswordAgePolicy(ctx context.Context, orgID string) (*domain.ObjectDetails, error) {
	if orgID == "" {
		return nil, zerrors.ThrowInvalidArgument(nil, "Org-M58wd", "Errors.ResourceOwnerMissing")
	}
	existingPolicy := NewOrgPasswordAgePolicyWriteModel(orgID)
	err := c.eventstore.FilterToQueryReducer(ctx, existingPolicy)
	if err != nil {
		return nil, err
	}
	if existingPolicy.State == domain.PolicyStateUnspecified || existingPolicy.State == domain.PolicyStateRemoved {
		return nil, zerrors.ThrowNotFound(nil, "ORG-Dgs1g", "Errors.Org.PasswordAgePolicy.NotFound")
	}
	orgAgg := OrgAggregateFromWriteModel(&existingPolicy.WriteModel)
	pushedEvents, err := c.eventstore.Push(ctx, org.NewPasswordAgePolicyRemovedEvent(ctx, orgAgg))
	if err != nil {
		return nil, err
	}
	err = AppendAndReduce(existingPolicy, pushedEvents...)
	if err != nil {
		return nil, err
	}
	return writeModelToObjectDetails(&existingPolicy.PasswordAgePolicyWriteModel.WriteModel), nil
}
