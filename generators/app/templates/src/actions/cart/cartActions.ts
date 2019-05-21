import * as cartAPI from 'api/cart'
import Cart from 'models/Cart'
import ResponseError from 'models/ResponseError'

import ThunkAction from '../ThunkAction'

import * as types from './cartActionTypes'

export function fetchCart(): ThunkAction<void> {
	return async dispatch => {
		dispatch(fetchCartRequest())
		try {
			dispatch(fetchCartSuccess(await cartAPI.fetchCart()))
		} catch (errors) {
			dispatch(fetchCartFailure(errors))
		}
	}

	function fetchCartRequest(): types.FetchCartRequest {
		return { type: types.FETCH_CART_REQUEST }
	}

	function fetchCartSuccess(cart: Cart): types.FetchCartSuccess {
		return { type: types.FETCH_CART_SUCCESS, cart }
	}

	function fetchCartFailure(errors: ResponseError[]): types.FetchCartFailure {
		return { type: types.FETCH_CART_FAILURE, errors }
	}
}
