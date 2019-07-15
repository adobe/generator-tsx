import { types } from 'actions/global'
import createReducer from 'helpers/createReducer'

const defaultState = {}

export default createReducer('global', defaultState)(
	(state, action: types.GlobalActions) => {
		switch (action.type) {
			default:
				return state
		}
	},
)
