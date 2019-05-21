import React from 'react'
import { Link, MemoryRouter } from 'react-router-dom'

import darkTheme from 'themes/dark'
import translations from 'translations/en.json'
import { fireEvent, renderWithRedux, waitForElement } from 'utils/test'

import App from '.'

describe('App component', () => {
	it('renders "Home" by default', () => {
		expect(render().getByText('Home')).not.toBeUndefined()
	})

	it('renders "Page Not Found" after clicking a bad link', async () => {
		const result = render(
			<>
				<App />
				<Link to="/bad-link">Bad Link</Link>
			</>,
		)

		fireEvent.click(result.getByText('Bad Link'))

		expect(
			await waitForElement(() =>
				result.getByText(translations['notFound.title']),
			),
		).not.toBeUndefined()
	})

	function render(element = <App />) {
		return renderWithRedux(<MemoryRouter>{element}</MemoryRouter>, {
			state: {
				cart: {
					subtotal: {
						amount: 0,
					},
				},
				global: {
					theme: darkTheme,
				},
			},
		})
	}
})
