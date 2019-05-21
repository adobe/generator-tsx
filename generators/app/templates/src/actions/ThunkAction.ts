import { ThunkAction as ReduxThunkAction } from 'redux-thunk'

import RootState from 'store/RootState'

import RootActions from '.'

type ThunkAction<R = void> = ReduxThunkAction<R, RootState, void, RootActions>

export default ThunkAction
