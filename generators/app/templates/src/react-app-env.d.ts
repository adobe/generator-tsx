/// <reference types="react-scripts" />

declare module 'babel-plugin-relay/macro' {
	export { graphql } from 'react-relay'
}

declare module 'pathjoin' {
	/**
	 * Join posix-style paths.
	 */
	export default function pathjoin(...paths: string[]): string
}

declare module 'relay-test-utils'
