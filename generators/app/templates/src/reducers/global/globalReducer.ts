import update from 'immutability-helper'

import { types } from 'actions/global'
import createReducer from 'helpers/createReducer'
import Theme from 'models/Theme'
import darkTheme from 'themes/dark'

export interface GlobalState {
	theme: Theme
}

const defaultState: GlobalState = {
	theme: darkTheme,
}

export default createReducer('global', defaultState)(
	(state, action: types.GlobalActions) => {
		switch (action.type) {
			case types.SET_THEME:
				return update(defaultState, {
					theme: { $set: action.theme },
				})
			default:
				return state
		}
	},
)
