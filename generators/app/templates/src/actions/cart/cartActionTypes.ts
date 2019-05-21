import Cart from 'models/Cart'

import Action from '../Action'

export const FETCH_CART_REQUEST = 'FETCH_CART_REQUEST'
export interface FetchCartRequest extends Action<typeof FETCH_CART_REQUEST> {}

export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS'
export interface FetchCartSuccess extends Action<typeof FETCH_CART_SUCCESS> {
	cart: Cart
}

export const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE'
export interface FetchCartFailure extends Action<typeof FETCH_CART_FAILURE> {
	errors: Error[]
}

export type CartActions = FetchCartRequest | FetchCartSuccess | FetchCartFailure
