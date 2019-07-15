import React from 'react'
import { Link, MemoryRouter } from 'react-router-dom'

import zhTranslations from 'translations/zh.json'
import { fireEvent, renderWithRedux, wait } from 'utils/test'

import Routes from '.'

describe('Routes component', () => {
	it('renders "Loading locale..." fallback, then "Learn React" asynchronously', async () => {
		const { findByText, getByText } = render()

		expect(getByText('Loading locale...')).toBeDefined()

		await findByText('Learn React')
	})

	it('renders "Page Not Found" after clicking a bad link', async () => {
		const { findByText, getByText } = render(
			<>
				<Routes />
				<Link to="/bad-link">Bad Link</Link>
			</>,
		)

		fireEvent.click(getByText('Bad Link'))

		expect(await findByText('Page Not Found')).toBeDefined()
	})

	testRoute('/about', 'About')
	testRoute('/zh/about', zhTranslations.about)

	function render(element = <Routes />) {
		return renderWithRedux(element)
	}

	function testRoute(path: string, expectedTitle: string) {
		it(`sets the document title to "${expectedTitle}" when navigating to ${path}`, async () => {
			render(
				<MemoryRouter initialEntries={[path]}>
					<Routes />
				</MemoryRouter>,
			)

			await wait(() => {
				expect(document.title).toBe(expectedTitle)
			})
		})
	}
})
