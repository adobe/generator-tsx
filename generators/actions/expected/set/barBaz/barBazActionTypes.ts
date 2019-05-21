import FakeState from 'models/FakeState'

import Action from '../Action'

export const SET_FAKE_STATE = 'SET_FAKE_STATE'
export interface SetFakeState extends Action<typeof SET_FAKE_STATE> {
	fakeState: FakeState
}

export type BarBazActions = SetFakeState
