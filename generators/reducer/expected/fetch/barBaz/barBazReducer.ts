import { types } from 'actions/barBaz'
import FakeModel from 'models/FakeModel'
import createReducer from 'utils/createReducer'

export interface BarBazState extends FakeModel {
	errors: Error[]
	loading: boolean
}

const defaultState: BarBazState = {
	errors: [],
	loading: false,
}

export default createReducer<typeof defaultState, types.BarBazActions>(
	'barBaz',
)((draft, action) => {
	switch (action.type) {
		case types.FETCH_FAKE_MODEL_FAILURE:
			draft.errors = action.errors
		case types.FETCH_FAKE_MODEL_REQUEST:
			draft.loading = true
		case types.FETCH_FAKE_MODEL_SUCCESS:
			Object.assign(draft, action.fakeModel)
	}
})
