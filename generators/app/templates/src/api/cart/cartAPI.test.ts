import fetchMock from 'fetch-mock'

import Cart from 'models/Cart'

import { fetchCart } from '.'

describe('/api/cart module', () => {
	beforeEach(() => {
		fetchMock.reset()
	})

	describe('getCart', () => {
		it('resolves with a cart object', async () => {
			const cart: Cart = {
				items: [],
				subtotal: {
					amount: 0,
				},
			}
			fetchMock.getOnce('/api/cart.json', JSON.stringify(cart))
			expect.assertions(1)

			const successResult = await fetchCart()

			expect(successResult).toEqual(cart)
		})
	})
})
