import { DeepPartial } from 'redux'
import configureMockStore, { MockStoreCreator } from 'redux-mock-store'
import thunk, { ThunkMiddleware } from 'redux-thunk'

import RootActions from 'actions'
import RootState from 'store/RootState'

export default (preloadedState =>
	configureMockStore([thunk as ThunkMiddleware<RootState, RootActions>])(
		preloadedState,
	)) as MockStoreCreator<DeepPartial<RootState>, any>
