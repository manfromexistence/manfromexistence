package command

import (
	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/eventstore"
	"github.com/zitadel/zitadel/internal/repository/policy"
)

type PasswordAgePolicyWriteModel struct {
	eventstore.WriteModel

	ExpireWarnDays uint64
	MaxAgeDays     uint64
	State          domain.PolicyState
}

func (wm *PasswordAgePolicyWriteModel) Reduce() error {
	for _, event := range wm.Events {
		switch e := event.(type) {
		case *policy.PasswordAgePolicyAddedEvent:
			wm.ExpireWarnDays = e.ExpireWarnDays
			wm.MaxAgeDays = e.MaxAgeDays
			wm.State = domain.PolicyStateActive
		case *policy.PasswordAgePolicyChangedEvent:
			if e.ExpireWarnDays != nil {
				wm.ExpireWarnDays = *e.ExpireWarnDays
			}
			if e.MaxAgeDays != nil {
				wm.MaxAgeDays = *e.MaxAgeDays
			}
		case *policy.PasswordAgePolicyRemovedEvent:
			wm.State = domain.PolicyStateRemoved
		}
	}
	return wm.WriteModel.Reduce()
}
