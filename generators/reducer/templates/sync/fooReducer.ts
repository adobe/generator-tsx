import { types } from 'actions/<%= name %>'
import <%= sentenceCase(subject) %> from 'models/<%= sentenceCase(subject) %>'
import createReducer from 'utils/createReducer'

export interface <%= sentenceCase(name) %>State {
	<%= subject %>: <%= sentenceCase(subject) %>
}

const defaultState: <%= sentenceCase(name) %>State = {
	<%= subject %>: {},
}

export default createReducer<typeof defaultState, types.<%= sentenceCase(name) %>Actions>(
	'<%= name %>',
)((draft, action) => {
	switch (action.type) {
		case types.<%= snakeCase(actionName).toUpperCase() %>:
			draft.<%= subject %> = action.<%= subject %>
	}
})
