import ky from 'ky-universal'
import {
	Environment,
	Network,
	RecordSource,
	Store,
	Variables,
	GraphQLResponse,
} from 'relay-runtime'

async function fetchQuery(operation: any, variables: Variables) {
	return await ky
		.post('/graphql', {
			json: {
				query: operation.text,
				variables,
			},
		})
		.json<GraphQLResponse>()
}

export default new Environment({
	network: Network.create(fetchQuery),
	store: new Store(new RecordSource()),
})
