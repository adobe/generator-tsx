import { types } from 'actions/<%= name %>'
import testReducer from 'utils/test/testReducer'

import <%= name %>Reducer from './<%= name %>Reducer'

testReducer(<%= name %>Reducer, test => {
	test(
		{ <%= subject %>: 'PREVIOUS_VALUE' },
		{ type: types.<%= snakeCase(actionName).toUpperCase() %>, <%= subject %>: 'EXPECTED_VALUE' },
		{ <%= subject %>: 'EXPECTED_VALUE' },
	)
})
