import React from 'react'

import App from './components/App'
import bootstrap from './helpers/bootstrap'

import * as serviceWorker from './serviceWorker'

bootstrap('./components/App', () => <App />)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
