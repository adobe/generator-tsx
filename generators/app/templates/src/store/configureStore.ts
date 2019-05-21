import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { DeepPartial } from 'ts-essentials'

import RootActions from 'actions'
import rootReducer from 'reducers'

import RootState from './RootState'

export default function configureStore(
	preloadedState: DeepPartial<RootState> = {},
) {
	const thunkMiddleware = thunk as ThunkMiddleware<RootState, RootActions>
	const middlewareEnhancer =
		process.env.NODE_ENV === 'development'
			? /* istanbul ignore next */
			  applyMiddleware(thunkMiddleware, require('redux-logger').logger)
			: applyMiddleware(thunkMiddleware)

	const composedEnhancers =
		process.env.NODE_ENV === 'development'
			? /* istanbul ignore next */
			  composeWithDevTools(middlewareEnhancer)
			: compose(middlewareEnhancer)

	const store = createStore<RootState, RootActions, {}, {}>(
		rootReducer,
		preloadedState,
		composedEnhancers,
	)

	/* istanbul ignore next */
	if (process.env.NODE_ENV !== 'production' && module.hot) {
		module.hot.accept('../reducers', () => store.replaceReducer(rootReducer))
	}

	return store
}
