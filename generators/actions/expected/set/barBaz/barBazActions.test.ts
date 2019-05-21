import { mockStore } from 'utils/test'

import * as actions from './barBazActions'
import * as types from './barBazActionTypes'

describe('barBaz actions', () => {
	const store = mockStore()

	beforeEach(() => {
		store.clearActions()
	})

	describe('setFakeState', () => {
		it('dispatches SET_FAKE_STATE', async () => {
			const fakeState = {}
			const expectedActions = [{ type: types.SET_FAKE_STATE, fakeState }]
			expect.assertions(1)

			await store.dispatch(actions.setFakeState(fakeState))

			expect(store.getActions()).toEqual(expectedActions)
		})
	})
})
