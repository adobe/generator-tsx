import resolveFetch from 'helpers/resolveFetch'
import <%= model %> from 'models/<%= model %>'

export function fetch<%= model %>() {
	return resolveFetch<<%= model %>>(fetch('/api/<%= camelCase(model) %>.json'))
}
