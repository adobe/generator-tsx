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

export default createReducer<typeof defaultState, types.<%= sentenceCase(name) %>Actions>(
	'<%= name %>',
)((draft, action) => {
	switch (action.type) {
		case types.<%= snakeCase(actionName).toUpperCase() %>_FAILURE:
			draft.errors = action.errors
		case types.<%= snakeCase(actionName).toUpperCase() %>_REQUEST:
			draft.loading = true
		case types.<%= snakeCase(actionName).toUpperCase() %>_SUCCESS:
			Object.assign(draft, action.<%= camelCase(subject) %>)
	}
})
