import { Query } from '../../models'

export default class Root implements Query {
	public get hello() {
		return 'Hello world!'
	}
}
