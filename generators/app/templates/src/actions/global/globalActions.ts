import ThunkAction from 'actions/ThunkAction'
import themes from 'themes'

import * as types from './globalActionTypes'

export function persistTheme(name: keyof typeof themes): ThunkAction<void> {
	return async (dispatch, _getState, { app }) => {
		dispatch({ type: types.PERSIST_THEME, name })
		app.localStorage.setItem('theme', name)
	}
}
