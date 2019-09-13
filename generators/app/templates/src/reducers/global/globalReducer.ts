import { types } from 'actions/global'
import createReducer from 'utils/createReducer'

const defaultState = {}

export default createReducer<typeof defaultState, types.GlobalActions>(
	'global',
)((/* draft, action */) => undefined)
