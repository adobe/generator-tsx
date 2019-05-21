import { DeepReadonly } from 'ts-essentials'

import RootActions from 'actions'

export default async function testReducer<T, A extends RootActions>(
	reducer: (state: DeepReadonly<T> | undefined, action: A) => DeepReadonly<T>,
	callback: (test: typeof testReducer) => void,
) {
	describe(reducer.name, () => {
		it('returns initial state', () => {
			expect(reducer(undefined, {} as any)).toMatchSnapshot()
		})
		callback(testReducer)
	})

	function testReducer(
		initialState: Partial<T> | undefined | null,
		action: A,
		expectedState: Partial<T> | ((newState: DeepReadonly<T>) => void),
		customItName?: string,
	) {
		it(customItName || `handles ${action.type}`, () => {
			expect.hasAssertions()
			const newState = reducer(
				(initialState as DeepReadonly<T>) || void 0,
				action,
			)
			if (typeof expectedState === 'function') {
				expectedState(newState)
				return
			}
			expect(newState).toEqual(expect.objectContaining(expectedState))
		})
	}
}
