package command

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/eventstore"
	"github.com/zitadel/zitadel/internal/eventstore/v1/models"
	"github.com/zitadel/zitadel/internal/repository/org"
	"github.com/zitadel/zitadel/internal/repository/policy"
	"github.com/zitadel/zitadel/internal/zerrors"
)

func TestCommandSide_AddPasswordComplexityPolicy(t *testing.T) {
	type fields struct {
		eventstore *eventstore.Eventstore
	}
	type args struct {
		ctx    context.Context
		orgID  string
		policy *domain.PasswordComplexityPolicy
	}
	type res struct {
		want *domain.PasswordComplexityPolicy
		err  func(error) bool
	}
	tests := []struct {
		name   string
		fields fields
		args   args
		res    res
	}{
		{
			name: "org id missing, invalid argument error",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
				),
			},
			args: args{
				ctx: context.Background(),
				policy: &domain.PasswordComplexityPolicy{
					MinLength:    0,
					HasUppercase: true,
					HasLowercase: true,
					HasNumber:    true,
					HasSymbol:    true,
				},
			},
			res: res{
				err: zerrors.IsErrorInvalidArgument,
			},
		},
		{
			name: "policy already existing, already exists error",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
					expectFilter(
						eventFromEventPusher(
							org.NewPasswordComplexityPolicyAddedEvent(context.Background(),
								&org.NewAggregate("org1").Aggregate,
								8,
								true, true, true, true,
							),
						),
					),
				),
			},
			args: args{
				ctx:   context.Background(),
				orgID: "org1",
				policy: &domain.PasswordComplexityPolicy{
					MinLength:    8,
					HasUppercase: true,
					HasLowercase: true,
					HasNumber:    true,
					HasSymbol:    true,
				},
			},
			res: res{
				err: zerrors.IsErrorAlreadyExists,
			},
		},
		{
			name: "add policy,ok",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
					expectFilter(),
					expectPush(
						org.NewPasswordComplexityPolicyAddedEvent(context.Background(),
							&org.NewAggregate("org1").Aggregate,
							8,
							true, true, true, true,
						),
					),
				),
			},
			args: args{
				ctx:   context.Background(),
				orgID: "org1",
				policy: &domain.PasswordComplexityPolicy{
					MinLength:    8,
					HasUppercase: true,
					HasLowercase: true,
					HasNumber:    true,
					HasSymbol:    true,
				},
			},
			res: res{
				want: &domain.PasswordComplexityPolicy{
					ObjectRoot: models.ObjectRoot{
						AggregateID:   "org1",
						ResourceOwner: "org1",
					},
					MinLength:    8,
					HasUppercase: true,
					HasLowercase: true,
					HasNumber:    true,
					HasSymbol:    true,
				},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			r := &Commands{
				eventstore: tt.fields.eventstore,
			}
			got, err := r.AddPasswordComplexityPolicy(tt.args.ctx, tt.args.orgID, tt.args.policy)
			if tt.res.err == nil {
				assert.NoError(t, err)
			}
			if tt.res.err != nil && !tt.res.err(err) {
				t.Errorf("got wrong err: %v ", err)
			}
			if tt.res.err == nil {
				assert.Equal(t, tt.res.want, got)
			}
		})
	}
}

func TestCommandSide_ChangePasswordComplexityPolicy(t *testing.T) {
	type fields struct {
		eventstore *eventstore.Eventstore
	}
	type args struct {
		ctx    context.Context
		orgID  string
		policy *domain.PasswordComplexityPolicy
	}
	type res struct {
		want *domain.PasswordComplexityPolicy
		err  func(error) bool
	}
	tests := []struct {
		name   string
		fields fields
		args   args
		res    res
	}{
		{
			name: "org id missing, invalid argument error",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
				),
			},
			args: args{
				ctx: context.Background(),
				policy: &domain.PasswordComplexityPolicy{
					MinLength:    0,
					HasUppercase: true,
					HasLowercase: true,
					HasNumber:    true,
					HasSymbol:    true,
				},
			},
			res: res{
				err: zerrors.IsErrorInvalidArgument,
			},
		},
		{
			name: "policy not existing, not found error",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
					expectFilter(),
				),
			},
			args: args{
				ctx:   context.Background(),
				orgID: "org1",
				policy: &domain.PasswordComplexityPolicy{
					MinLength:    8,
					HasUppercase: true,
					HasLowercase: true,
					HasNumber:    true,
					HasSymbol:    true,
				},
			},
			res: res{
				err: zerrors.IsNotFound,
			},
		},
		{
			name: "no changes, precondition error",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
					expectFilter(
						eventFromEventPusher(
							org.NewPasswordComplexityPolicyAddedEvent(context.Background(),
								&org.NewAggregate("org1").Aggregate,
								8,
								true, true, true, true,
							),
						),
					),
				),
			},
			args: args{
				ctx:   context.Background(),
				orgID: "org1",
				policy: &domain.PasswordComplexityPolicy{
					MinLength:    8,
					HasUppercase: true,
					HasLowercase: true,
					HasNumber:    true,
					HasSymbol:    true,
				},
			},
			res: res{
				err: zerrors.IsPreconditionFailed,
			},
		},
		{
			name: "change, ok",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
					expectFilter(
						eventFromEventPusher(
							org.NewPasswordComplexityPolicyAddedEvent(context.Background(),
								&org.NewAggregate("org1").Aggregate,
								8,
								true, true, true, true,
							),
						),
					),
					expectPush(
						newPasswordComplexityPolicyChangedEvent(context.Background(), "org1", 10, false, false, false, false),
					),
				),
			},
			args: args{
				ctx:   context.Background(),
				orgID: "org1",
				policy: &domain.PasswordComplexityPolicy{
					MinLength:    10,
					HasUppercase: false,
					HasLowercase: false,
					HasNumber:    false,
					HasSymbol:    false,
				},
			},
			res: res{
				want: &domain.PasswordComplexityPolicy{
					ObjectRoot: models.ObjectRoot{
						AggregateID:   "org1",
						ResourceOwner: "org1",
					},
					MinLength:    10,
					HasUppercase: false,
					HasLowercase: false,
					HasNumber:    false,
					HasSymbol:    false,
				},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			r := &Commands{
				eventstore: tt.fields.eventstore,
			}
			got, err := r.ChangePasswordComplexityPolicy(tt.args.ctx, tt.args.orgID, tt.args.policy)
			if tt.res.err == nil {
				assert.NoError(t, err)
			}
			if tt.res.err != nil && !tt.res.err(err) {
				t.Errorf("got wrong err: %v ", err)
			}
			if tt.res.err == nil {
				assert.Equal(t, tt.res.want, got)
			}
		})
	}
}

func TestCommandSide_RemovePasswordComplexityPolicy(t *testing.T) {
	type fields struct {
		eventstore *eventstore.Eventstore
	}
	type args struct {
		ctx   context.Context
		orgID string
	}
	type res struct {
		want *domain.ObjectDetails
		err  func(error) bool
	}
	tests := []struct {
		name   string
		fields fields
		args   args
		res    res
	}{
		{
			name: "org id missing, invalid argument error",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
				),
			},
			args: args{
				ctx: context.Background(),
			},
			res: res{
				err: zerrors.IsErrorInvalidArgument,
			},
		},
		{
			name: "policy not existing, not found error",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
					expectFilter(),
				),
			},
			args: args{
				ctx:   context.Background(),
				orgID: "org1",
			},
			res: res{
				err: zerrors.IsNotFound,
			},
		},
		{
			name: "remove, ok",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
					expectFilter(
						eventFromEventPusher(
							org.NewPasswordComplexityPolicyAddedEvent(context.Background(),
								&org.NewAggregate("org1").Aggregate,
								8,
								true, true, true, true,
							),
						),
					),
					expectPush(
						org.NewPasswordComplexityPolicyRemovedEvent(context.Background(),
							&org.NewAggregate("org1").Aggregate),
					),
				),
			},
			args: args{
				ctx:   context.Background(),
				orgID: "org1",
			},
			res: res{
				want: &domain.ObjectDetails{
					ResourceOwner: "org1",
				},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			r := &Commands{
				eventstore: tt.fields.eventstore,
			}
			got, err := r.RemovePasswordComplexityPolicy(tt.args.ctx, tt.args.orgID)
			if tt.res.err == nil {
				assert.NoError(t, err)
			}
			if tt.res.err != nil && !tt.res.err(err) {
				t.Errorf("got wrong err: %v ", err)
			}
			if tt.res.err == nil {
				assert.Equal(t, tt.res.want, got)
			}
		})
	}
}

func newPasswordComplexityPolicyChangedEvent(ctx context.Context, orgID string, minLength uint64, hasUpper, hasLower, hasNumber, hasSymbol bool) *org.PasswordComplexityPolicyChangedEvent {
	event, _ := org.NewPasswordComplexityPolicyChangedEvent(ctx,
		&org.NewAggregate(orgID).Aggregate,
		[]policy.PasswordComplexityPolicyChanges{
			policy.ChangeMinLength(minLength),
			policy.ChangeHasUppercase(hasUpper),
			policy.ChangeHasLowercase(hasLower),
			policy.ChangeHasSymbol(hasNumber),
			policy.ChangeHasNumber(hasSymbol),
		},
	)
	return event
}
