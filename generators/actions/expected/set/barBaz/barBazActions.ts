import FakeState from 'models/FakeState'

import * as types from './barBazActionTypes'

export function setFakeState(fakeState: FakeState): types.SetFakeState {
	return { type: types.SET_FAKE_STATE, fakeState }
}
