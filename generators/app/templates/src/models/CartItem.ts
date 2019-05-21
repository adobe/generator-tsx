import Currency from './Currency'

export default interface CartItem {
	brand?: string
	color?: string
	expires?: Date
	locale?: string
	price: Currency
	quantity: number
	returnable?: boolean
	size?: string
	title: string
	url: string
}
