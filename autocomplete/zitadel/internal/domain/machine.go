package domain

import "github.com/zitadel/zitadel/internal/eventstore/v1/models"

type Machine struct {
	models.ObjectRoot

	Username    string
	State       UserState
	Name        string
	Description string
}

func (m Machine) GetUsername() string {
	return m.Username
}

func (m Machine) GetState() UserState {
	return m.State
}

func (sa *Machine) IsValid() bool {
	return sa.Name != "" && sa.Username != ""
}
