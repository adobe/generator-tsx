import { ThunkAction as ReduxThunkAction } from 'redux-thunk'

import RootState from 'store/RootState'

import RootActions from '.'
import BrowserApp from 'BrowserApp'

type ThunkAction<R = void> = ReduxThunkAction<
	R,
	RootState,
	{ app: BrowserApp },
	RootActions
>

export default ThunkAction
