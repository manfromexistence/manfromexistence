package deviceauth

import (
	"context"
	"time"

	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/eventstore"
)

const (
	eventTypePrefix   eventstore.EventType = "device.authorization."
	AddedEventType                         = eventTypePrefix + "added"
	ApprovedEventType                      = eventTypePrefix + "approved"
	CanceledEventType                      = eventTypePrefix + "canceled"
)

type AddedEvent struct {
	*eventstore.BaseEvent `json:"-"`

	ClientID   string
	DeviceCode string
	UserCode   string
	Expires    time.Time
	Scopes     []string
	Audience   []string
	State      domain.DeviceAuthState
}

func (e *AddedEvent) SetBaseEvent(b *eventstore.BaseEvent) {
	e.BaseEvent = b
}

func (e *AddedEvent) Payload() any {
	return e
}

func (e *AddedEvent) UniqueConstraints() []*eventstore.UniqueConstraint {
	return NewAddUniqueConstraints(e.DeviceCode, e.UserCode)
}

func NewAddedEvent(
	ctx context.Context,
	aggregate *eventstore.Aggregate,
	clientID string,
	deviceCode string,
	userCode string,
	expires time.Time,
	scopes []string,
	audience []string,
) *AddedEvent {
	return &AddedEvent{
		eventstore.NewBaseEventForPush(
			ctx, aggregate, AddedEventType,
		),
		clientID, deviceCode, userCode, expires, scopes, audience, domain.DeviceAuthStateInitiated}
}

type ApprovedEvent struct {
	*eventstore.BaseEvent `json:"-"`

	Subject         string
	UserAuthMethods []domain.UserAuthMethodType
	AuthTime        time.Time
}

func (e *ApprovedEvent) SetBaseEvent(b *eventstore.BaseEvent) {
	e.BaseEvent = b
}

func (e *ApprovedEvent) Payload() any {
	return e
}

func (e *ApprovedEvent) UniqueConstraints() []*eventstore.UniqueConstraint {
	return nil
}

func NewApprovedEvent(
	ctx context.Context,
	aggregate *eventstore.Aggregate,
	subject string,
	userAuthMethods []domain.UserAuthMethodType,
	authTime time.Time,
) *ApprovedEvent {
	return &ApprovedEvent{
		eventstore.NewBaseEventForPush(
			ctx, aggregate, ApprovedEventType,
		),
		subject,
		userAuthMethods,
		authTime,
	}
}

type CanceledEvent struct {
	*eventstore.BaseEvent `json:"-"`

	Reason domain.DeviceAuthCanceled
}

func (e *CanceledEvent) SetBaseEvent(b *eventstore.BaseEvent) {
	e.BaseEvent = b
}

func (e *CanceledEvent) Payload() any {
	return e
}

func (e *CanceledEvent) UniqueConstraints() []*eventstore.UniqueConstraint {
	return nil
}

func NewCanceledEvent(ctx context.Context, aggregate *eventstore.Aggregate, reason domain.DeviceAuthCanceled) *CanceledEvent {
	return &CanceledEvent{eventstore.NewBaseEventForPush(ctx, aggregate, CanceledEventType), reason}
}
