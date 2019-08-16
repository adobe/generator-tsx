import { Query } from './generated'

export default class Root implements Query {
	public get hello() {
		return 'Hello world!'
	}
}
