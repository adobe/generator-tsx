import * as types from './<%= folder %>ActionTypes'

export function <%= actionName %>(): types.<%= sentenceCase(actionName) %> {
	return { type: types.<%= snakeCase(actionName).toUpperCase() %> }
}
