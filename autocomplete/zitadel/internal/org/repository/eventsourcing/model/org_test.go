package model

import (
	"encoding/json"
	"testing"

	"github.com/zitadel/zitadel/internal/eventstore"
	es_models "github.com/zitadel/zitadel/internal/eventstore/v1/models"
	"github.com/zitadel/zitadel/internal/org/model"
	"github.com/zitadel/zitadel/internal/repository/org"
)

func TestOrgFromEvents(t *testing.T) {
	type args struct {
		event []eventstore.Event
		org   *Org
	}
	tests := []struct {
		name   string
		args   args
		result *Org
	}{
		{
			name: "org from events, ok",
			args: args{
				event: []eventstore.Event{
					&es_models.Event{AggregateID: "ID", Seq: 1, Typ: org.OrgAddedEventType},
				},
				org: &Org{Name: "OrgName"},
			},
			result: &Org{ObjectRoot: es_models.ObjectRoot{AggregateID: "ID"}, State: int32(model.OrgStateActive), Name: "OrgName"},
		},
		{
			name: "org from events, nil org",
			args: args{
				event: []eventstore.Event{
					&es_models.Event{AggregateID: "ID", Seq: 1, Typ: org.OrgAddedEventType},
				},
				org: nil,
			},
			result: &Org{ObjectRoot: es_models.ObjectRoot{AggregateID: "ID"}, State: int32(model.OrgStateActive)},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if tt.args.org != nil {
				data, _ := json.Marshal(tt.args.org)
				tt.args.event[0].(*es_models.Event).Data = data
			}
			result, _ := OrgFromEvents(tt.args.org, tt.args.event...)
			if result.Name != tt.result.Name {
				t.Errorf("got wrong result name: expected: %v, actual: %v ", tt.result.Name, result.Name)
			}
		})
	}
}

func TestAppendEvent(t *testing.T) {
	type args struct {
		event *es_models.Event
		org   *Org
	}
	tests := []struct {
		name   string
		args   args
		result *Org
	}{
		{
			name: "append added event",
			args: args{
				event: &es_models.Event{AggregateID: "ID", Seq: 1, Typ: org.OrgAddedEventType},
				org:   &Org{Name: "OrgName"},
			},
			result: &Org{ObjectRoot: es_models.ObjectRoot{AggregateID: "ID"}, State: int32(model.OrgStateActive), Name: "OrgName"},
		},
		{
			name: "append change event",
			args: args{
				event: &es_models.Event{AggregateID: "ID", Seq: 1, Typ: org.OrgChangedEventType, Data: []byte(`{"name": "OrgName}`)},
				org:   &Org{Name: "OrgNameChanged"},
			},
			result: &Org{ObjectRoot: es_models.ObjectRoot{AggregateID: "ID"}, State: int32(model.OrgStateActive), Name: "OrgNameChanged"},
		},
		{
			name: "append deactivate event",
			args: args{
				event: &es_models.Event{AggregateID: "ID", Seq: 1, Typ: org.OrgDeactivatedEventType},
			},
			result: &Org{ObjectRoot: es_models.ObjectRoot{AggregateID: "ID"}, State: int32(model.OrgStateInactive)},
		},
		{
			name: "append reactivate event",
			args: args{
				event: &es_models.Event{AggregateID: "ID", Seq: 1, Typ: org.OrgReactivatedEventType},
			},
			result: &Org{ObjectRoot: es_models.ObjectRoot{AggregateID: "ID"}, State: int32(model.OrgStateActive)},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if tt.args.org != nil {
				data, _ := json.Marshal(tt.args.org)
				tt.args.event.Data = data
			}
			result := &Org{}
			result.AppendEvent(tt.args.event)
			if result.State != tt.result.State {
				t.Errorf("got wrong result state: expected: %v, actual: %v ", tt.result.State, result.State)
			}
			if result.Name != tt.result.Name {
				t.Errorf("got wrong result name: expected: %v, actual: %v ", tt.result.Name, result.Name)
			}
			if result.ObjectRoot.AggregateID != tt.result.ObjectRoot.AggregateID {
				t.Errorf("got wrong result id: expected: %v, actual: %v ", tt.result.ObjectRoot.AggregateID, result.ObjectRoot.AggregateID)
			}
		})
	}
}
