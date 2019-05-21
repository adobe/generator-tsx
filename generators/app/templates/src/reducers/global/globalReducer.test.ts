import { types } from 'actions/global'
import darkTheme from 'themes/dark'
import lightTheme from 'themes/light'
import testReducer from 'utils/test/testReducer'

import globalReducer from './globalReducer'

testReducer(globalReducer, test => {
	test(
		{ theme: lightTheme },
		{ type: types.SET_THEME, theme: darkTheme },
		{ theme: darkTheme },
	)
})
