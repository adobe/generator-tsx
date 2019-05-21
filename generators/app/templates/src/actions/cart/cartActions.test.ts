import fetchMock from 'fetch-mock'

import Cart from 'models/Cart'
import ResponseError from 'models/ResponseError'
import { mockStore } from 'utils/test'

import * as actions from './cartActions'
import * as types from './cartActionTypes'

describe('cart actions', () => {
	const store = mockStore()

	beforeEach(() => {
		fetchMock.restore()
		store.clearActions()
	})

	describe('fetchCart', () => {
		it('dispatches FETCH_CART_SUCCESS on success', async () => {
			const cart: Cart = {
				items: [],
				subtotal: {
					amount: 0,
				},
			}
			fetchMock.getOnce('/api/cart.json', { body: JSON.stringify(cart) })
			const expectedActions = [
				{ type: types.FETCH_CART_REQUEST },
				{ type: types.FETCH_CART_SUCCESS, cart },
			]
			expect.assertions(1)

			await store.dispatch(actions.fetchCart())

			expect(store.getActions()).toEqual(expectedActions)
		})

		it('dispatches FETCH_CART_FAILURE on failure', async () => {
			const message = 'ERROR_MESSAGE'
			fetchMock.getOnce('/api/cart.json', {
				body: JSON.stringify({ errors: [{ message }] }),
			})
			const expectedActions = [
				{ type: types.FETCH_CART_REQUEST },
				{
					type: types.FETCH_CART_FAILURE,
					errors: [new ResponseError({ title: message })],
				},
			]
			expect.assertions(1)

			await store.dispatch(actions.fetchCart())

			expect(store.getActions()).toEqual(expectedActions)
		})
	})
})
