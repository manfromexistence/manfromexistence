package command

import (
	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/eventstore"
	"github.com/zitadel/zitadel/internal/repository/policy"
)

type SecondFactorWriteModel struct {
	eventstore.WriteModel
	MFAType domain.SecondFactorType
	State   domain.FactorState
}

func (wm *SecondFactorWriteModel) Reduce() error {
	for _, event := range wm.Events {
		switch e := event.(type) {
		case *policy.SecondFactorAddedEvent:
			wm.MFAType = e.MFAType
			wm.State = domain.FactorStateActive
		case *policy.SecondFactorRemovedEvent:
			wm.MFAType = e.MFAType
			wm.State = domain.FactorStateRemoved
		case *policy.LoginPolicyRemovedEvent:
			wm.State = domain.FactorStateRemoved
		}
	}
	return wm.WriteModel.Reduce()
}

type MultiFactorWriteModel struct {
	eventstore.WriteModel
	MFAType domain.MultiFactorType
	State   domain.FactorState
}

func (wm *MultiFactorWriteModel) Reduce() error {
	for _, event := range wm.Events {
		switch e := event.(type) {
		case *policy.MultiFactorAddedEvent:
			wm.MFAType = e.MFAType
			wm.State = domain.FactorStateActive
		case *policy.MultiFactorRemovedEvent:
			wm.MFAType = e.MFAType
			wm.State = domain.FactorStateRemoved
		case *policy.LoginPolicyRemovedEvent:
			wm.State = domain.FactorStateRemoved
		}
	}
	return wm.WriteModel.Reduce()
}
