import resolveFetch from 'helpers/resolveFetch'
import Cart from 'models/Cart'

export function fetchCart() {
	return resolveFetch<Cart>(fetch('/api/cart.json'))
}
