import BazQux from 'models/BazQux'
import resolveFetch from 'utils/resolveFetch'

export function fetchBazQux() {
	return resolveFetch<BazQux>(fetch('/api/bazQux.json'))
}
