import configureMockStore from '@jedmao/redux-mock-store'
import Storage from '@jedmao/storage'
import thunk, { ThunkDispatch } from 'redux-thunk'

import RootActions from 'actions'
import BrowserApp from 'BrowserApp'
import RootState from 'store/RootState'

export const app = new BrowserApp('test', { localStorage: new Storage() })
export const extraThunkArgument = { app }
const middlewares = [thunk.withExtraArgument(extraThunkArgument)]

export default configureMockStore<
	RootState,
	RootActions,
	ThunkDispatch<RootState, typeof extraThunkArgument, RootActions>
>(middlewares)
