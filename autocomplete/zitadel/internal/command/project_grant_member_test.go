package command

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"golang.org/x/text/language"

	"github.com/zitadel/zitadel/internal/api/authz"
	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/eventstore"
	"github.com/zitadel/zitadel/internal/eventstore/v1/models"
	"github.com/zitadel/zitadel/internal/repository/project"
	"github.com/zitadel/zitadel/internal/repository/user"
	"github.com/zitadel/zitadel/internal/zerrors"
)

func TestCommandSide_AddProjectGrantMember(t *testing.T) {
	type fields struct {
		eventstore   *eventstore.Eventstore
		zitadelRoles []authz.RoleMapping
	}
	type args struct {
		ctx    context.Context
		member *domain.ProjectGrantMember
	}
	type res struct {
		want *domain.ProjectGrantMember
		err  func(error) bool
	}
	tests := []struct {
		name   string
		fields fields
		args   args
		res    res
	}{
		{
			name: "invalid member, error",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
				),
			},
			args: args{
				ctx: context.Background(),
				member: &domain.ProjectGrantMember{
					ObjectRoot: models.ObjectRoot{
						AggregateID: "project1",
					},
				},
			},
			res: res{
				err: zerrors.IsErrorInvalidArgument,
			},
		},
		{
			name: "invalid roles, error",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
				),
			},
			args: args{
				ctx: context.Background(),
				member: &domain.ProjectGrantMember{
					ObjectRoot: models.ObjectRoot{
						AggregateID: "project1",
					},
					GrantID: "projectgrant1",
					UserID:  "user1",
					Roles:   []string{"PROJECT_GRANT_OWNER"},
				},
			},
			res: res{
				err: zerrors.IsErrorInvalidArgument,
			},
		},
		{
			name: "user not existing, precondition error",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
					expectFilter(),
				),
				zitadelRoles: []authz.RoleMapping{
					{
						Role: "PROJECT_GRANT_OWNER",
					},
				},
			},
			args: args{
				ctx: context.Background(),
				member: &domain.ProjectGrantMember{
					ObjectRoot: models.ObjectRoot{
						AggregateID: "project1",
					},
					GrantID: "projectgrant1",
					UserID:  "user1",
					Roles:   []string{"PROJECT_GRANT_OWNER"},
				},
			},
			res: res{
				err: zerrors.IsPreconditionFailed,
			},
		},
		{
			name: "member already exists, precondition error",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
					expectFilter(
						eventFromEventPusher(
							user.NewHumanAddedEvent(context.Background(),
								&user.NewAggregate("user1", "org1").Aggregate,
								"username1",
								"firstname1",
								"lastname1",
								"nickname1",
								"displayname1",
								language.German,
								domain.GenderMale,
								"email1",
								true,
							),
						),
					),
					expectFilter(
						eventFromEventPusher(
							project.NewProjectGrantMemberAddedEvent(context.Background(),
								&project.NewAggregate("project1", "org1").Aggregate,
								"user1",
								"projectgrant1",
							),
						),
					),
				),
				zitadelRoles: []authz.RoleMapping{
					{
						Role: "PROJECT_GRANT_OWNER",
					},
				},
			},
			args: args{
				ctx: context.Background(),
				member: &domain.ProjectGrantMember{
					ObjectRoot: models.ObjectRoot{
						AggregateID: "project1",
					},
					GrantID: "projectgrant1",
					UserID:  "user1",
					Roles:   []string{"PROJECT_GRANT_OWNER"},
				},
			},
			res: res{
				err: zerrors.IsErrorAlreadyExists,
			},
		},
		{
			name: "member add uniqueconstraint err, already exists",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
					expectFilter(
						eventFromEventPusher(
							user.NewHumanAddedEvent(context.Background(),
								&user.NewAggregate("user1", "org1").Aggregate,
								"username1",
								"firstname1",
								"lastname1",
								"nickname1",
								"displayname1",
								language.German,
								domain.GenderMale,
								"email1",
								true,
							),
						),
					),
					expectFilter(),
					expectPushFailed(zerrors.ThrowAlreadyExists(nil, "ERROR", "internal"),
						project.NewProjectGrantMemberAddedEvent(context.Background(),
							&project.NewAggregate("project1", "").Aggregate,
							"user1",
							"projectgrant1",
							[]string{"PROJECT_GRANT_OWNER"}...,
						),
					),
				),
				zitadelRoles: []authz.RoleMapping{
					{
						Role: "PROJECT_GRANT_OWNER",
					},
				},
			},
			args: args{
				ctx: context.Background(),
				member: &domain.ProjectGrantMember{
					ObjectRoot: models.ObjectRoot{
						AggregateID: "project1",
					},
					GrantID: "projectgrant1",
					UserID:  "user1",
					Roles:   []string{"PROJECT_GRANT_OWNER"},
				},
			},
			res: res{
				err: zerrors.IsErrorAlreadyExists,
			},
		},
		{
			name: "member add, ok",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
					expectFilter(
						eventFromEventPusher(
							user.NewHumanAddedEvent(context.Background(),
								&user.NewAggregate("user1", "org1").Aggregate,
								"username1",
								"firstname1",
								"lastname1",
								"nickname1",
								"displayname1",
								language.German,
								domain.GenderMale,
								"email1",
								true,
							),
						),
					),
					expectFilter(),
					expectPush(
						project.NewProjectGrantMemberAddedEvent(context.Background(),
							&project.NewAggregate("project1", "").Aggregate,
							"user1",
							"projectgrant1",
							[]string{"PROJECT_GRANT_OWNER"}...,
						),
					),
				),
				zitadelRoles: []authz.RoleMapping{
					{
						Role: "PROJECT_GRANT_OWNER",
					},
				},
			},
			args: args{
				ctx: context.Background(),
				member: &domain.ProjectGrantMember{
					ObjectRoot: models.ObjectRoot{
						AggregateID: "project1",
					},
					UserID:  "user1",
					GrantID: "projectgrant1",
					Roles:   []string{"PROJECT_GRANT_OWNER"},
				},
			},
			res: res{
				want: &domain.ProjectGrantMember{
					ObjectRoot: models.ObjectRoot{
						AggregateID: "project1",
					},
					GrantID: "projectgrant1",
					UserID:  "user1",
					Roles:   []string{"PROJECT_GRANT_OWNER"},
				},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			r := &Commands{
				eventstore:   tt.fields.eventstore,
				zitadelRoles: tt.fields.zitadelRoles,
			}
			got, err := r.AddProjectGrantMember(tt.args.ctx, tt.args.member)
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

func TestCommandSide_ChangeProjectGrantMember(t *testing.T) {
	type fields struct {
		eventstore   *eventstore.Eventstore
		zitadelRoles []authz.RoleMapping
	}
	type args struct {
		ctx    context.Context
		member *domain.ProjectGrantMember
	}
	type res struct {
		want *domain.ProjectGrantMember
		err  func(error) bool
	}
	tests := []struct {
		name   string
		fields fields
		args   args
		res    res
	}{
		{
			name: "invalid member, error",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
				),
			},
			args: args{
				ctx: context.Background(),
				member: &domain.ProjectGrantMember{
					ObjectRoot: models.ObjectRoot{
						AggregateID: "project1",
					},
				},
			},
			res: res{
				err: zerrors.IsErrorInvalidArgument,
			},
		},
		{
			name: "invalid roles, error",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
				),
			},
			args: args{
				ctx: context.Background(),
				member: &domain.ProjectGrantMember{
					ObjectRoot: models.ObjectRoot{
						AggregateID: "project1",
					},
					GrantID: "projectgrant1",
					UserID:  "user1",
					Roles:   []string{"PROJECT_OWNER"},
				},
			},
			res: res{
				err: zerrors.IsErrorInvalidArgument,
			},
		},
		{
			name: "member not existing, not found error",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
					expectFilter(),
				),
				zitadelRoles: []authz.RoleMapping{
					{
						Role: "PROJECT_GRANT_OWNER",
					},
				},
			},
			args: args{
				ctx: context.Background(),
				member: &domain.ProjectGrantMember{
					ObjectRoot: models.ObjectRoot{
						AggregateID: "project1",
					},
					GrantID: "projectgrant1",
					UserID:  "user1",
					Roles:   []string{"PROJECT_GRANT_OWNER"},
				},
			},
			res: res{
				err: zerrors.IsNotFound,
			},
		},
		{
			name: "member not changed, precondition error",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
					expectFilter(
						eventFromEventPusher(
							project.NewProjectGrantMemberAddedEvent(context.Background(),
								&project.NewAggregate("project1", "org1").Aggregate,
								"user1",
								"projectgrant1",
								[]string{"PROJECT_GRANT_OWNER"}...,
							),
						),
					),
				),
				zitadelRoles: []authz.RoleMapping{
					{
						Role: "PROJECT_GRANT_OWNER",
					},
				},
			},
			args: args{
				ctx: context.Background(),
				member: &domain.ProjectGrantMember{
					ObjectRoot: models.ObjectRoot{
						AggregateID: "project1",
					},
					GrantID: "projectgrant1",
					UserID:  "user1",
					Roles:   []string{"PROJECT_GRANT_OWNER"},
				},
			},
			res: res{
				err: zerrors.IsPreconditionFailed,
			},
		},
		{
			name: "member change, ok",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
					expectFilter(
						eventFromEventPusher(
							project.NewProjectGrantMemberAddedEvent(context.Background(),
								&project.NewAggregate("project1", "org1").Aggregate,
								"user1",
								"projectgrant1",
								[]string{"PROJECT_GRANT_OWNER"}...,
							),
						),
					),
					expectPush(
						project.NewProjectGrantMemberChangedEvent(context.Background(),
							&project.NewAggregate("project1", "org1").Aggregate,
							"user1",
							"projectgrant1",
							[]string{"PROJECT_GRANT_OWNER", "PROJECT_GRANT_VIEWER"}...,
						),
					),
				),
				zitadelRoles: []authz.RoleMapping{
					{
						Role: "PROJECT_GRANT_OWNER",
					},
					{
						Role: "PROJECT_GRANT_VIEWER",
					},
				},
			},
			args: args{
				ctx: context.Background(),
				member: &domain.ProjectGrantMember{
					ObjectRoot: models.ObjectRoot{
						AggregateID: "project1",
					},
					GrantID: "projectgrant1",
					UserID:  "user1",
					Roles:   []string{"PROJECT_GRANT_OWNER", "PROJECT_GRANT_VIEWER"},
				},
			},
			res: res{
				want: &domain.ProjectGrantMember{
					ObjectRoot: models.ObjectRoot{
						ResourceOwner: "org1",
						AggregateID:   "project1",
					},
					GrantID: "projectgrant1",
					UserID:  "user1",
					Roles:   []string{"PROJECT_GRANT_OWNER", "PROJECT_GRANT_VIEWER"},
				},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			r := &Commands{
				eventstore:   tt.fields.eventstore,
				zitadelRoles: tt.fields.zitadelRoles,
			}
			got, err := r.ChangeProjectGrantMember(tt.args.ctx, tt.args.member)
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

func TestCommandSide_RemoveProjectGrantMember(t *testing.T) {
	type fields struct {
		eventstore *eventstore.Eventstore
	}
	type args struct {
		ctx       context.Context
		projectID string
		grantID   string
		userID    string
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
			name: "invalid member projectid missing, error",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
				),
			},
			args: args{
				ctx:       context.Background(),
				projectID: "",
				userID:    "user1",
				grantID:   "projectgrant1",
			},
			res: res{
				err: zerrors.IsErrorInvalidArgument,
			},
		},
		{
			name: "invalid member userid missing, error",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
				),
			},
			args: args{
				ctx:       context.Background(),
				projectID: "project1",
				userID:    "",
				grantID:   "projectgrant1",
			},
			res: res{
				err: zerrors.IsErrorInvalidArgument,
			},
		},
		{
			name: "invalid member grantid missing, error",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
				),
			},
			args: args{
				ctx:       context.Background(),
				projectID: "project1",
				userID:    "user1",
				grantID:   "",
			},
			res: res{
				err: zerrors.IsErrorInvalidArgument,
			},
		},
		{
			name: "member not existing, not found err",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
					expectFilter(),
				),
			},
			args: args{
				ctx:       context.Background(),
				projectID: "project1",
				userID:    "user1",
				grantID:   "projectgrant1",
			},
			res: res{
				err: zerrors.IsNotFound,
			},
		},
		{
			name: "member remove, ok",
			fields: fields{
				eventstore: eventstoreExpect(
					t,
					expectFilter(
						eventFromEventPusher(
							project.NewProjectGrantMemberAddedEvent(context.Background(),
								&project.NewAggregate("project1", "org1").Aggregate,
								"user1",
								"projectgrant1",
								[]string{"PROJECT_OWNER"}...,
							),
						),
					),
					expectPush(
						project.NewProjectGrantMemberRemovedEvent(context.Background(),
							&project.NewAggregate("project1", "org1").Aggregate,
							"user1",
							"projectgrant1",
						),
					),
				),
			},
			args: args{
				ctx:       context.Background(),
				projectID: "project1",
				userID:    "user1",
				grantID:   "projectgrant1",
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
			got, err := r.RemoveProjectGrantMember(tt.args.ctx, tt.args.projectID, tt.args.userID, tt.args.grantID)
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
