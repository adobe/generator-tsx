import update from 'immutability-helper'

import { types } from 'actions/barBaz'
import createReducer from 'helpers/createReducer'
import FakeState from 'models/FakeState'

export interface BarBazState {
	fakeState: FakeState
}

const defaultState: BarBazState = {
	fakeState: {},
}

export default createReducer('barBaz', defaultState)(
	(state, action: types.BarBazActions) => {
		switch (action.type) {
			case types.SET_FAKE_STATE:
				return update(defaultState, {
					fakeState: { $set: action.fakeState },
				})
			default:
				return state
		}
	},
)
