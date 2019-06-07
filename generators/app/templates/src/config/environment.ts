import {
	Environment,
	Network,
	RecordSource,
	Store,
	Variables,
} from 'relay-runtime'

async function fetchQuery(operation: any, variables: Variables) {
	const response = await fetch('/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: operation.text,
			variables,
		}),
	})
	return response.json()
}

export default new Environment({
	network: Network.create(fetchQuery),
	store: new Store(new RecordSource()),
})
