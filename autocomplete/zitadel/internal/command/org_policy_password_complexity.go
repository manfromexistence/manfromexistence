package command

import (
	"context"

	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/repository/org"
	"github.com/zitadel/zitadel/internal/zerrors"
)

func (c *Commands) getOrgPasswordComplexityPolicy(ctx context.Context, orgID string) (*domain.PasswordComplexityPolicy, error) {
	policy, err := c.orgPasswordComplexityPolicyWriteModelByID(ctx, orgID)
	if err != nil {
		return nil, err
	}
	if policy.State == domain.PolicyStateActive {
		return orgWriteModelToPasswordComplexityPolicy(policy), nil
	}
	return c.getDefaultPasswordComplexityPolicy(ctx)
}

func (c *Commands) orgPasswordComplexityPolicyWriteModelByID(ctx context.Context, orgID string) (*OrgPasswordComplexityPolicyWriteModel, error) {
	policy := NewOrgPasswordComplexityPolicyWriteModel(orgID)
	err := c.eventstore.FilterToQueryReducer(ctx, policy)
	if err != nil {
		return nil, err
	}
	return policy, nil
}

func (c *Commands) AddPasswordComplexityPolicy(ctx context.Context, resourceOwner string, policy *domain.PasswordComplexityPolicy) (*domain.PasswordComplexityPolicy, error) {
	if resourceOwner == "" {
		return nil, zerrors.ThrowInvalidArgument(nil, "Org-7ufEs", "Errors.ResourceOwnerMissing")
	}
	if err := policy.IsValid(); err != nil {
		return nil, err
	}
	addedPolicy := NewOrgPasswordComplexityPolicyWriteModel(resourceOwner)
	err := c.eventstore.FilterToQueryReducer(ctx, addedPolicy)
	if err != nil {
		return nil, err
	}
	if addedPolicy.State == domain.PolicyStateActive {
		return nil, zerrors.ThrowAlreadyExists(nil, "Org-LdhbS", "Errors.Org.PasswordComplexityPolicy.AlreadyExists")
	}

	orgAgg := OrgAggregateFromWriteModel(&addedPolicy.WriteModel)
	pushedEvents, err := c.eventstore.Push(
		ctx,
		org.NewPasswordComplexityPolicyAddedEvent(
			ctx,
			orgAgg,
			policy.MinLength,
			policy.HasLowercase,
			policy.HasUppercase,
			policy.HasNumber,
			policy.HasSymbol))
	if err != nil {
		return nil, err
	}
	err = AppendAndReduce(addedPolicy, pushedEvents...)
	if err != nil {
		return nil, err
	}
	return writeModelToPasswordComplexityPolicy(&addedPolicy.PasswordComplexityPolicyWriteModel), nil
}

func (c *Commands) ChangePasswordComplexityPolicy(ctx context.Context, resourceOwner string, policy *domain.PasswordComplexityPolicy) (*domain.PasswordComplexityPolicy, error) {
	if resourceOwner == "" {
		return nil, zerrors.ThrowInvalidArgument(nil, "Org-3J8fs", "Errors.ResourceOwnerMissing")
	}
	if err := policy.IsValid(); err != nil {
		return nil, err
	}

	existingPolicy := NewOrgPasswordComplexityPolicyWriteModel(resourceOwner)
	err := c.eventstore.FilterToQueryReducer(ctx, existingPolicy)
	if err != nil {
		return nil, err
	}
	if existingPolicy.State == domain.PolicyStateUnspecified || existingPolicy.State == domain.PolicyStateRemoved {
		return nil, zerrors.ThrowNotFound(nil, "ORG-Dgs3g", "Errors.Org.PasswordComplexityPolicy.NotFound")
	}

	orgAgg := OrgAggregateFromWriteModel(&existingPolicy.PasswordComplexityPolicyWriteModel.WriteModel)
	changedEvent, hasChanged := existingPolicy.NewChangedEvent(ctx, orgAgg, policy.MinLength, policy.HasLowercase, policy.HasUppercase, policy.HasNumber, policy.HasSymbol)
	if !hasChanged {
		return nil, zerrors.ThrowPreconditionFailed(nil, "Org-DAs21", "Errors.Org.PasswordComplexityPolicy.NotChanged")
	}

	pushedEvents, err := c.eventstore.Push(ctx, changedEvent)
	if err != nil {
		return nil, err
	}
	err = AppendAndReduce(existingPolicy, pushedEvents...)
	if err != nil {
		return nil, err
	}
	return writeModelToPasswordComplexityPolicy(&existingPolicy.PasswordComplexityPolicyWriteModel), nil
}

func (c *Commands) RemovePasswordComplexityPolicy(ctx context.Context, orgID string) (*domain.ObjectDetails, error) {
	if orgID == "" {
		return nil, zerrors.ThrowInvalidArgument(nil, "Org-J8fsf", "Errors.ResourceOwnerMissing")
	}
	existingPolicy := NewOrgPasswordComplexityPolicyWriteModel(orgID)
	event, err := c.removePasswordComplexityPolicy(ctx, existingPolicy)
	if err != nil {
		return nil, err
	}
	pushedEvents, err := c.eventstore.Push(ctx, event)
	if err != nil {
		return nil, err
	}
	err = AppendAndReduce(existingPolicy, pushedEvents...)
	if err != nil {
		return nil, err
	}
	return writeModelToObjectDetails(&existingPolicy.PasswordComplexityPolicyWriteModel.WriteModel), nil
}

func (c *Commands) removePasswordComplexityPolicy(ctx context.Context, existingPolicy *OrgPasswordComplexityPolicyWriteModel) (*org.PasswordComplexityPolicyRemovedEvent, error) {
	err := c.eventstore.FilterToQueryReducer(ctx, existingPolicy)
	if err != nil {
		return nil, err
	}
	if existingPolicy.State == domain.PolicyStateUnspecified || existingPolicy.State == domain.PolicyStateRemoved {
		return nil, zerrors.ThrowNotFound(nil, "ORG-ADgs2", "Errors.Org.PasswordComplexityPolicy.NotFound")
	}
	orgAgg := OrgAggregateFromWriteModel(&existingPolicy.WriteModel)
	return org.NewPasswordComplexityPolicyRemovedEvent(ctx, orgAgg), nil
}

func (c *Commands) removePasswordComplexityPolicyIfExists(ctx context.Context, orgID string) (*org.PasswordComplexityPolicyRemovedEvent, error) {
	existingPolicy, err := c.orgPasswordComplexityPolicyWriteModelByID(ctx, orgID)
	if err != nil {
		return nil, err
	}
	if existingPolicy.State != domain.PolicyStateActive {
		return nil, nil
	}
	orgAgg := OrgAggregateFromWriteModel(&existingPolicy.WriteModel)
	return org.NewPasswordComplexityPolicyRemovedEvent(ctx, orgAgg), nil
}
