import { types } from 'actions/<%= name %>'
import <%= sentenceCase(subject) %> from 'models/<%= sentenceCase(subject) %>'
import testReducer from 'utils/test/testReducer'

import <%= name %>Reducer from './<%= name %>Reducer'

testReducer(<%= name %>Reducer, test => {
	test(
		{ loading: false },
		{ type: types.<%= snakeCase(actionName).toUpperCase() %>_REQUEST },
		{ loading: true },
	)

	{
		const new<%= sentenceCase(subject) %>: <%= sentenceCase(subject) %> = {}
		test(
			{ /* previous state */ },
			{
				type: types.<%= snakeCase(actionName).toUpperCase() %>_SUCCESS,
				<%= camelCase(subject) %>: new<%= sentenceCase(subject) %>,
			},
			new<%= sentenceCase(subject) %>,
		)
	}

	{
		const newErrors = [new Error('test')]
		test(
			{ errors: [] },
			{
				type: types.<%= snakeCase(actionName).toUpperCase() %>_FAILURE,
				errors: newErrors,
			},
			{ errors: newErrors },
		)
	}
})
