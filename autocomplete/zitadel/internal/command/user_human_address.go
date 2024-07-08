package command

import (
	"context"

	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/telemetry/tracing"
	"github.com/zitadel/zitadel/internal/zerrors"
)

func (c *Commands) ChangeHumanAddress(ctx context.Context, address *domain.Address) (*domain.Address, error) {
	existingAddress, err := c.addressWriteModel(ctx, address.AggregateID, address.ResourceOwner)
	if err != nil {
		return nil, err
	}
	if existingAddress.State == domain.AddressStateUnspecified || existingAddress.State == domain.AddressStateRemoved {
		return nil, zerrors.ThrowPreconditionFailed(nil, "COMMAND-0pLdo", "Errors.User.Address.NotFound")
	}
	userAgg := UserAggregateFromWriteModel(&existingAddress.WriteModel)
	changedEvent, hasChanged, err := existingAddress.NewChangedEvent(ctx, userAgg, address.Country, address.Locality, address.PostalCode, address.Region, address.StreetAddress)
	if err != nil {
		return nil, err
	}
	if !hasChanged {
		return nil, zerrors.ThrowPreconditionFailed(nil, "COMMAND-3M0cs", "Errors.User.Address.NotChanged")
	}
	pushedEvents, err := c.eventstore.Push(ctx, changedEvent)
	if err != nil {
		return nil, err
	}
	err = AppendAndReduce(existingAddress, pushedEvents...)
	if err != nil {
		return nil, err
	}
	return writeModelToAddress(existingAddress), nil
}

func (c *Commands) addressWriteModel(ctx context.Context, userID, resourceOwner string) (writeModel *HumanAddressWriteModel, err error) {
	ctx, span := tracing.NewSpan(ctx)
	defer func() { span.EndWithError(err) }()

	writeModel = NewHumanAddressWriteModel(userID, resourceOwner)
	err = c.eventstore.FilterToQueryReducer(ctx, writeModel)
	if err != nil {
		return nil, err
	}
	return writeModel, nil
}
