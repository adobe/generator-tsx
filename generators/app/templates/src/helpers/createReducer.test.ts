import { AnyAction } from 'redux'

import createReducer from './createReducer'

describe('createReducer', () => {
	it('returns a function that updates state', () => {
		const reducer = createReducer('test', { foo: 'old' })(
			(state, action: AnyAction) => {
				return action.type === 'UPDATE_FOO'
					? { ...state, foo: 'new' }
					: state
			},
		)

		const newState = reducer(void 0, { type: 'UPDATE_FOO' })

		expect(newState).toEqual({ foo: 'new' })
	})
})
