import { mockStore } from 'utils/test'

import * as actions from './barBazActions'
import * as types from './barBazActionTypes'

describe('barBaz actions', () => {
	const store = mockStore()

	beforeEach(() => {
		store.clearActions()
	})

	describe('quxQuux', () => {
		it('dispatches QUX_QUUX', async () => {
			const expectedActions = [{ type: types.QUX_QUUX }]
			expect.assertions(1)

			await store.dispatch(actions.quxQuux())

			expect(store.getActions()).toEqual(expectedActions)
		})
	})
})
