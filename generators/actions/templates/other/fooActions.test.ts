import { mockStore } from 'utils/test'

import * as actions from './<%= folder %>Actions'
import * as types from './<%= folder %>ActionTypes'

describe('<%= folder %> actions', () => {
	const store = mockStore()

	beforeEach(() => {
		store.clearActions()
	})

	describe('<%= actionName %>', () => {
		it('dispatches <%= snakeCase(actionName).toUpperCase() %>', async () => {
			const expectedActions = [{ type: types.<%= snakeCase(actionName).toUpperCase() %> }]
			expect.assertions(1)

			await store.dispatch(actions.<%= actionName %>())

			expect(store.getActions()).toEqual(expectedActions)
		})
	})
})
