import update from 'immutability-helper'

import { types } from 'actions/<%= name %>'
import <%= sentenceCase(subject) %> from 'models/<%= sentenceCase(subject) %>'
import createReducer from 'utils/createReducer'

export interface <%= sentenceCase(name) %>State {
	<%= subject %>: <%= sentenceCase(subject) %>
}

const defaultState: <%= sentenceCase(name) %>State = {
	<%= subject %>: {},
}

export default createReducer('<%= name %>', defaultState)(
	(state, action: types.<%= sentenceCase(name) %>Actions) => {
		switch (action.type) {
			case types.<%= snakeCase(actionName).toUpperCase() %>:
				return update(defaultState, {
					<%= subject %>: { $set: action.<%= subject %> },
				})
			default:
				return state
		}
	},
)
