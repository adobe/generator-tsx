import testReducer from 'utils/test/testReducer'

import globalReducer from './globalReducer'

testReducer(globalReducer, test => {
	test({ foo: 'VALUE' }, {} as any, { foo: 'VALUE' })
})
