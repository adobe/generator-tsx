import { types } from 'actions/barBaz'
import FakeState from 'models/FakeState'
import createReducer from 'utils/createReducer'

export interface BarBazState {
	fakeState: FakeState
}

const defaultState: BarBazState = {
	fakeState: {},
}

export default createReducer<typeof defaultState, types.BarBazActions>(
	'barBaz',
)((draft, action) => {
	switch (action.type) {
		case types.SET_FAKE_STATE:
			draft.fakeState = action.fakeState
	}
})
