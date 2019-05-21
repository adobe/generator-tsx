import { types } from 'actions/barBaz'
import FakeModel from 'models/FakeModel'
import testReducer from 'utils/test/testReducer'

import barBazReducer from './barBazReducer'

testReducer(barBazReducer, test => {
	test(
		{ loading: false },
		{ type: types.FETCH_FAKE_MODEL_REQUEST },
		{ loading: true },
	)

	{
		const newFakeModel: FakeModel = {}
		test(
			{ /* previous state */ },
			{
				type: types.FETCH_FAKE_MODEL_SUCCESS,
				fakeModel: newFakeModel,
			},
			newFakeModel,
		)
	}

	{
		const newErrors = [new Error('test')]
		test(
			{ errors: [] },
			{
				type: types.FETCH_FAKE_MODEL_FAILURE,
				errors: newErrors,
			},
			{ errors: newErrors },
		)
	}
})
