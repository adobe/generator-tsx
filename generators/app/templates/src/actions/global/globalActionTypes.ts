import Theme from 'models/Theme'

import Action from '../Action'

export const SET_THEME = 'SET_THEME'
export interface SetTheme extends Action<typeof SET_THEME> {
	theme: Theme
}

export type GlobalActions = SetTheme
