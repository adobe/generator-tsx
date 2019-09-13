import { AnyAction } from 'redux'

import createReducer from './createReducer'

describe('createReducer', () => {
	it('returns a function that updates state', () => {
		const reducer = createReducer<{ foo: string }, AnyAction>('test')(
			(draft, action) => {
				if (action.type === 'UPDATE_FOO') {
					draft.foo = 'new'
				}
			},
		)

		const newState = reducer({}, { type: 'UPDATE_FOO' })

		expect(newState).toEqual({ foo: 'new' })
	})
})
