import resolveFetch from 'helpers/resolveFetch'
import BazQux from 'models/BazQux'

export function fetchBazQux() {
	return resolveFetch<BazQux>(fetch('/api/bazQux.json'))
}
