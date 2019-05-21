import CartItem from './CartItem'
import Currency from './Currency'

export default interface Cart {
	items: CartItem[]
	subtotal: Currency
}
