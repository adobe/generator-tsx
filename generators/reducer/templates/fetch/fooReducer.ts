import update from 'immutability-helper'

import { types } from 'actions/<%= name %>'
import <%= sentenceCase(subject) %> from 'models/<%= sentenceCase(subject) %>'
import createReducer from 'utils/createReducer'

export interface <%= sentenceCase(name) %>State extends <%= sentenceCase(subject) %> {
	errors: Error[]
	loading: boolean
}

const defaultState: <%= sentenceCase(name) %>State = {
	errors: [],
	loading: false,
}

export default createReducer('<%= name %>', defaultState)(
	(state, action: types.<%= sentenceCase(name) %>Actions) => {
		switch (action.type) {
			case types.<%= snakeCase(actionName).toUpperCase() %>_FAILURE:
				return update(defaultState, {
					errors: { $set: action.errors },
				})
			case types.<%= snakeCase(actionName).toUpperCase() %>_REQUEST:
				return update(state, {
					loading: { $set: true },
				})
			case types.<%= snakeCase(actionName).toUpperCase() %>_SUCCESS:
				return update(defaultState, {
					$merge: action.<%= camelCase(subject) %>,
				})
			default:
				return state
		}
	},
)
