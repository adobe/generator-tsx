import React from 'react'
import { render } from 'react-dom'
import 'ts-helpers'

import App from 'components/App/App'
import createProviders from 'helpers/createProviders'
import configureStore from 'store/configureStore'

import './index.css'
import * as serviceWorker from './serviceWorker'

const Providers = createProviders(configureStore())

const renderApp = () =>
	render(
		<Providers>
			<App />
		</Providers>,
		document.getElementById('root'),
	)

if (process.env.NODE_ENV !== 'production' && module.hot) {
	module.hot.accept('./components/App', renderApp)
}

renderApp()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
