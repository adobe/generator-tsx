import <%= sentenceCase(subject) %> from 'models/<%= sentenceCase(subject) %>'

import * as types from './<%= folder %>ActionTypes'

export function <%= actionName %>(<%= subject %>: <%= sentenceCase(subject) %>): types.<%= sentenceCase(actionName) %> {
	return { type: types.<%= snakeCase(actionName).toUpperCase() %>, <%= subject %> }
}
