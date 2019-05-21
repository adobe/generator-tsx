import update from 'immutability-helper'

import { types } from 'actions/barBaz'
import createReducer from 'helpers/createReducer'
import FakeModel from 'models/FakeModel'

export interface BarBazState extends FakeModel {
	errors: Error[]
	loading: boolean
}

const defaultState: BarBazState = {
	errors: [],
	loading: false,
}

export default createReducer('barBaz', defaultState)(
	(state, action: types.BarBazActions) => {
		switch (action.type) {
			case types.FETCH_FAKE_MODEL_FAILURE:
				return update(defaultState, {
					errors: { $set: action.errors },
				})
			case types.FETCH_FAKE_MODEL_REQUEST:
				return update(state, {
					loading: { $set: true },
				})
			case types.FETCH_FAKE_MODEL_SUCCESS:
				return update(defaultState, {
					$merge: action.fakeModel,
				})
			default:
				return state
		}
	},
)
