import { Router, RouteComponentProps } from '@reach/router'
import React, { FC } from 'react'

import renderWithRouter from './renderWithRouter'

const App: FC = () => (
	<Router>
		<Home path="/en" />
		<Foo path="/foo" />
	</Router>
)

const Home: FC<RouteComponentProps> = () => <>Welcome</>

const Foo: FC<RouteComponentProps> = () => <>bar</>

describe('renderWithRouter', () => {
	it('renders "Welcome" by default', () => {
		const { getByText } = renderWithRouter(<App />)

		expect(getByText('Welcome')).toBeDefined()
	})

	it('renders "bar" when initial route is "/foo"', async () => {
		const { getByText } = renderWithRouter(<App />, { route: '/foo' })

		expect(await getByText('bar')).toBeDefined()
	})
})
