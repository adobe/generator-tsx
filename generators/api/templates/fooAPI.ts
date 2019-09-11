import <%= model %> from 'models/<%= model %>'
import resolveFetch from 'utils/resolveFetch'

export function fetch<%= model %>() {
	return resolveFetch<<%= model %>>(fetch('/api/<%= camelCase(model) %>.json'))
}
