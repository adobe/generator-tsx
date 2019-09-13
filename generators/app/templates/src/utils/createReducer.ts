import produce, { Draft } from 'immer'

import RootActions from 'actions'

export default function createReducer<T, A extends RootActions>(name: string) {
	return (recipe: (draft: Draft<Partial<T>>, action: A) => void) => {
		const reducer = produce(recipe)
		return Object.defineProperty(reducer, 'name', {
			value: `${name}Reducer`,
			configurable: true,
		}) as typeof reducer
	}
}
