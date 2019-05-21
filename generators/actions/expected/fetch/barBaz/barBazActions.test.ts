import fetchMock from 'fetch-mock'

import FakeModel from 'models/FakeModel'
import ResponseError from 'models/ResponseError'
import { mockStore } from 'utils/test'

import * as actions from './barBazActions'
import * as types from './barBazActionTypes'

describe('barBaz actions', () => {
	const store = mockStore()

	beforeEach(() => {
		fetchMock.restore()
		store.clearActions()
	})

	describe('fetchFakeModel', () => {
		it('dispatches FETCH_FAKE_MODEL_SUCCESS on success', async () => {
			const fakeModel: FakeModel = {}
			fetchMock.getOnce('/api/fakeModel.json', { body: JSON.stringify(fakeModel) })
			const expectedActions = [
				{ type: types.FETCH_FAKE_MODEL_REQUEST },
				{ type: types.FETCH_FAKE_MODEL_SUCCESS, fakeModel },
			]
			expect.assertions(1)

			await store.dispatch(actions.fetchFakeModel())

			expect(store.getActions()).toEqual(expectedActions)
		})

		it('dispatches FETCH_FAKE_MODEL_FAILURE on failure', async () => {
			const message = 'ERROR_MESSAGE'
			fetchMock.getOnce('/api/fakeModel.json', {
				body: JSON.stringify({ errors: [{ message }] }),
			})
			const expectedActions = [
				{ type: types.FETCH_FAKE_MODEL_REQUEST },
				{
					type: types.FETCH_FAKE_MODEL_FAILURE,
					errors: [new ResponseError({ title: message })],
				},
			]
			expect.assertions(1)

			await store.dispatch(actions.fetchFakeModel())

			expect(store.getActions()).toEqual(expectedActions)
		})
	})
})
