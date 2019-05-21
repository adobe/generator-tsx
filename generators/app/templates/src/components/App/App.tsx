import React, { lazy, Suspense } from 'react'
import Helmet from 'react-helmet'
import { Route, Switch } from 'react-router-dom'

import Nav from '../Nav'
import Spinner from '../Spinner'

const Home = lazy(() => import('../Home'))
const NotFound = lazy(() => import('../NotFound'))

const App: React.SFC = () => (
	<>
		<Helmet>
			<title>React App</title>
		</Helmet>
		<Nav />
		<Suspense fallback={<Spinner />}>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route component={NotFound} />
			</Switch>
		</Suspense>
	</>
)

export default App
