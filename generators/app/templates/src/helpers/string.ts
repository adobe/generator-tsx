import pathjoin from 'pathjoin'

const trailingSlash = /\/$/
export function joinRoutePaths(...paths: string[]) {
	const joined = pathjoin(...paths)
	return joined === '/' ? joined : joined.replace(trailingSlash, '')
}
