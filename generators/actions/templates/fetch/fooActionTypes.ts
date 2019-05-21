import <%= subject %> from 'models/<%= subject %>'

import Action from '../Action'

export const <%= snakeCase(actionName).toUpperCase() %>_REQUEST = '<%= snakeCase(actionName).toUpperCase() %>_REQUEST'
export interface <%= sentenceCase(actionName) %>Request extends Action<typeof <%= snakeCase(actionName).toUpperCase() %>_REQUEST> {}

export const <%= snakeCase(actionName).toUpperCase() %>_SUCCESS = '<%= snakeCase(actionName).toUpperCase() %>_SUCCESS'
export interface <%= sentenceCase(actionName) %>Success extends Action<typeof <%= snakeCase(actionName).toUpperCase() %>_SUCCESS> {
	<%= camelCase(subject) %>: <%= subject %>
}

export const <%= snakeCase(actionName).toUpperCase() %>_FAILURE = '<%= snakeCase(actionName).toUpperCase() %>_FAILURE'
export interface <%= sentenceCase(actionName) %>Failure extends Action<typeof <%= snakeCase(actionName).toUpperCase() %>_FAILURE> {
	errors: Error[]
}

export type <%= sentenceCase(folder) %>Actions = <%= sentenceCase(actionName) %>Request | <%= sentenceCase(actionName) %>Success | <%= sentenceCase(actionName) %>Failure
