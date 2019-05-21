import update from 'immutability-helper'

import { types } from 'actions/cart'
import createReducer from 'helpers/createReducer'
import Cart from 'models/Cart'

export interface CartState extends Cart {
	errors: Error[]
	loading: boolean
}

const defaultState: CartState = {
	errors: [],
	items: [],
	loading: false,
	subtotal: {
		amount: 0,
	},
}

export default createReducer('cart', defaultState)(
	(state, action: types.CartActions) => {
		switch (action.type) {
			case types.FETCH_CART_FAILURE:
				return update(defaultState, {
					errors: { $set: action.errors },
				})
			case types.FETCH_CART_REQUEST:
				return update(state, {
					loading: { $set: true },
				})
			case types.FETCH_CART_SUCCESS:
				return update(defaultState, {
					$merge: action.cart,
				})
			default:
				return state
		}
	},
)
