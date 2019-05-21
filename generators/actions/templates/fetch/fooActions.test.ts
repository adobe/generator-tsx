import fetchMock from 'fetch-mock'

import <%= subject %> from 'models/<%= subject %>'
import ResponseError from 'models/ResponseError'
import { mockStore } from 'utils/test'

import * as actions from './<%= folder %>Actions'
import * as types from './<%= folder %>ActionTypes'

describe('<%= folder %> actions', () => {
	const store = mockStore()

	beforeEach(() => {
		fetchMock.restore()
		store.clearActions()
	})

	describe('fetch<%= subject %>', () => {
		it('dispatches <%= snakeCase(actionName).toUpperCase() %>_SUCCESS on success', async () => {
			const <%= camelCase(subject) %>: <%= subject %> = {}
			fetchMock.getOnce('/api/<%= camelCase(subject) %>.json', { body: JSON.stringify(<%= camelCase(subject) %>) })
			const expectedActions = [
				{ type: types.<%= snakeCase(actionName).toUpperCase() %>_REQUEST },
				{ type: types.<%= snakeCase(actionName).toUpperCase() %>_SUCCESS, <%= camelCase(subject) %> },
			]
			expect.assertions(1)

			await store.dispatch(actions.fetch<%= subject %>())

			expect(store.getActions()).toEqual(expectedActions)
		})

		it('dispatches <%= snakeCase(actionName).toUpperCase() %>_FAILURE on failure', async () => {
			const message = 'ERROR_MESSAGE'
			fetchMock.getOnce('/api/<%= camelCase(subject) %>.json', {
				body: JSON.stringify({ errors: [{ message }] }),
			})
			const expectedActions = [
				{ type: types.<%= snakeCase(actionName).toUpperCase() %>_REQUEST },
				{
					type: types.<%= snakeCase(actionName).toUpperCase() %>_FAILURE,
					errors: [new ResponseError({ title: message })],
				},
			]
			expect.assertions(1)

			await store.dispatch(actions.fetch<%= subject %>())

			expect(store.getActions()).toEqual(expectedActions)
		})
	})
})
