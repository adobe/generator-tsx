import * as <%= api %>API from 'api/<%= api %>'
import <%= subject %> from 'models/<%= subject %>'
import ResponseError from 'models/ResponseError'

import ThunkAction from '../ThunkAction'

import * as types from './<%= folder %>ActionTypes'

export function <%= actionName %>(): ThunkAction<void> {
	return async dispatch => {
		dispatch(<%= actionName %>Request())
		try {
			dispatch(<%= actionName %>Success(await <%= api %>API.<%= actionName %>()))
		} catch (errors) {
			dispatch(<%= actionName %>Failure(errors))
		}
	}

	function <%= actionName %>Request(): types.<%= sentenceCase(actionName) %>Request {
		return { type: types.<%= snakeCase(actionName).toUpperCase() %>_REQUEST }
	}

	function <%= actionName %>Success(<%= camelCase(subject) %>: <%= subject %>): types.<%= sentenceCase(actionName) %>Success {
		return { type: types.<%= snakeCase(actionName).toUpperCase() %>_SUCCESS, <%= camelCase(subject) %> }
	}

	function <%= actionName %>Failure(errors: ResponseError[]): types.<%= sentenceCase(actionName) %>Failure {
		return { type: types.<%= snakeCase(actionName).toUpperCase() %>_FAILURE, errors }
	}
}
