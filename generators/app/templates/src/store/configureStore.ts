import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkMiddleware, ThunkDispatch } from 'redux-thunk'

import RootActions from 'actions'
import BrowserApp from 'BrowserApp'
import rootReducer from 'reducers'

import RootState from './RootState'

export default function configureStore(app: BrowserApp) {
	const extraThunkArgument = { app }
	const thunkMiddleware = thunk.withExtraArgument(
		extraThunkArgument,
	) as ThunkMiddleware<RootState, RootActions, typeof extraThunkArgument>
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

	const store = createStore<
		RootState,
		RootActions,
		{
			dispatch: ThunkDispatch<
				RootState,
				typeof extraThunkArgument,
				RootActions
			>
		},
		{}
	>(rootReducer, app.loadState(), composedEnhancers)

	/* istanbul ignore next */
	if (process.env.NODE_ENV !== 'production' && module.hot) {
		module.hot.accept('../reducers', () => store.replaceReducer(rootReducer))
	}

	return store
}
