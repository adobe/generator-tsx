import { types } from 'actions/cart'
import Cart from 'models/Cart'
import testReducer from 'utils/test/testReducer'

import cartReducer from './cartReducer'

testReducer(cartReducer, test => {
	test(
		{ loading: false },
		{ type: types.FETCH_CART_REQUEST },
		{ loading: true },
	)

	{
		const newCart: Cart = {
			items: [],
			subtotal: {
				amount: 42,
			},
		}
		test(
			{
				items: [],
				subtotal: {
					amount: 0,
				},
			},
			{
				type: types.FETCH_CART_SUCCESS,
				cart: newCart,
			},
			newCart,
		)
	}

	{
		const newErrors = [new Error('test')]
		test(
			{ errors: [] },
			{
				type: types.FETCH_CART_FAILURE,
				errors: newErrors,
			},
			{ errors: newErrors },
		)
	}
})
