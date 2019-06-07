import RootActions from 'actions'

export default async function testReducer<T, A extends RootActions>(
	reducer: (state: Readonly<T> | undefined, action: A) => Readonly<T>,
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
		expectedState: Partial<T> | ((newState: Readonly<T>) => void),
		customItName?: string,
	) {
		it(customItName || `handles ${action.type}`, () => {
			expect.hasAssertions()
			const newState = reducer(
				(initialState as Readonly<T>) || void 0,
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
