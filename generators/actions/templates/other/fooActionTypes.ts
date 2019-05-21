import Action from '../Action'

export const <%= snakeCase(actionName).toUpperCase() %> = '<%= snakeCase(actionName).toUpperCase() %>'
export interface <%= sentenceCase(actionName) %> extends Action<typeof <%= snakeCase(actionName).toUpperCase() %>> {}

export type <%= sentenceCase(folder) %>Actions = <%= sentenceCase(actionName) %>
