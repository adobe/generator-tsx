import camelCase from '@queso/camel-case'
import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { Store } from 'redux'

import RootActions from 'actions'
import BrowserApp from 'BrowserApp'
import Providers from 'components/Providers'
import AppTheme from 'themes/AppTheme'
import configureStore from 'store/configureStore'
import RootState from 'store/RootState'

export default async function bootstrap(
	dependencyPath: string,
	renderRoot: (store: Store<RootState, RootActions>) => ReactNode,
): Promise<{
	app: BrowserApp
	store: Store<RootState, RootActions>
}> {
	const namespace = camelCase(dependencyPath).replace(/^components/, '')
	const app = new BrowserApp(namespace)
	const store = configureStore(app)
	const { document } = app.window

	const themeKey = app.localStorage.getItem('theme')
	const themeContext = themeKey
		? AppTheme.context((await import(`themes/${themeKey}`)).default)
		: AppTheme.context()

	return new Promise(resolve => {
		document.addEventListener('DOMContentLoaded', () => {
			render(true)
			if (process.env.NODE_ENV !== 'production' && module.hot) {
				module.hot.accept(dependencyPath, render)
			}
		})

		function render(hydrate = false) {
			ReactDOM[hydrate && !module.hot ? 'hydrate' : 'render'](
				<themeContext.Provider>
					<Providers store={store} children={renderRoot(store)} />
				</themeContext.Provider>,
				document.getElementById('root'),
				() => resolve({ app, store }),
			)
		}
	})
}
