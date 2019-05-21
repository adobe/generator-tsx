import { types } from 'actions/barBaz'
import testReducer from 'utils/test/testReducer'

import barBazReducer from './barBazReducer'

testReducer(barBazReducer, test => {
	test(
		{ fakeState: 'PREVIOUS_VALUE' },
		{ type: types.SET_FAKE_STATE, fakeState: 'EXPECTED_VALUE' },
		{ fakeState: 'EXPECTED_VALUE' },
	)
})
