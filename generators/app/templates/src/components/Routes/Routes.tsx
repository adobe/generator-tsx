import { Redirect, Router, RouteComponentProps } from '@reach/router'
import React, { FC } from 'react'

import About from 'components/About'
import Home from 'components/Home'
import Layout from 'components/Layout'

const Routes: FC = () => {
	return (
		<Router>
			<Redirect from="/" to="/en" />
			<Layout path="/:locale">
				<Home path="/" />
				<About path="/about" />
				<NoMatch default />
			</Layout>
		</Router>
	)
}

const NoMatch: FC<RouteComponentProps> = () => <div>No match</div>

export default Routes
