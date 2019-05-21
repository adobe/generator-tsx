import { AnyAction } from 'redux'
import { DeepReadonly } from 'ts-essentials'

import createReducer from 'helpers/createReducer'

import testReducer from './testReducer'

const reducer = createReducer('test', { foo: 'INITIAL_STATE' })(
	(state, action: AnyAction) =>
		action.type === 'UPDATE_FOO' ? { ...state, foo: action.value } : state,
)

testReducer(reducer, test => {
	const newValue = 'NEW_VALUE'
	const expectedState = { foo: newValue }
	const action = { type: 'UPDATE_FOO', value: newValue }

	test(null, action, expectedState)
	test(null, action, expectedState, 'handles expectedState')
	test(null, action, onNewState, 'handles an expected state callback')

	function onNewState(newState: DeepReadonly<{ foo: string }>) {
		expect(newState).toEqual(expectedState)
	}
})
