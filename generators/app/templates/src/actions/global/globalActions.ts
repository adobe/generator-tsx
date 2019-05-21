import Theme from 'models/Theme'

import * as types from './globalActionTypes'

export function setTheme(theme: Theme): types.SetTheme {
	return { type: types.SET_THEME, theme }
}
