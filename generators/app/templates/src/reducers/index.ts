import { combineReducers } from 'redux'

import cart from './cart'
import global from './global'

export default combineReducers({
	cart,
	global,
})
