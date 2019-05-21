import { Reducer } from 'redux'
import { DeepReadonly } from 'ts-essentials'

import RootActions from 'actions'

export default function createReducer<T>(name: string, defaultState: T) {
	return <A extends RootActions>(
		callback: (state: DeepReadonly<T>, action: A) => DeepReadonly<T>,
	) => {
		const reducer: Reducer<DeepReadonly<T>, A> = (
			previousState = defaultState as DeepReadonly<T>,
			action: A,
		) => callback(previousState, action)
		return Object.defineProperty(reducer, 'name', {
			value: `${name}Reducer`,
			configurable: true,
		}) as typeof reducer
	}
}
