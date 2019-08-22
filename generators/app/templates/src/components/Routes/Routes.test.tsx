import React from 'react'

import zhTranslations from 'translations/zh.json'
import { wait } from 'utils/test'

import Routes from '.'
import renderWithRouter, {
	RenderWithRouterOptions,
} from 'utils/test/renderWithRouter'

describe('Routes component', () => {
	it('redirects from "/" to "/en"', async () => {
		const spy = jest.spyOn(console, 'error').mockImplementation(() => {})

		render({ route: '/' })

		await wait(() => {
			expect(document.title).toBe('Home')
		})

		spy.mockRestore()
	})

	it('changes the title to "Home" when navigating to "/en"', async () => {
		render()

		await wait(() => {
			expect(document.title).toBe('Home')
		})
	})

	it(`changes the title from "About" to "${zhTranslations.about}" when navigating from "/en/about" to "/zh/about"`, async () => {
		const {
			history: { navigate },
		} = render({ route: '/en/about' })

		await wait(() => {
			expect(document.title).toBe('About')
		})

		await navigate('/zh/about')

		await wait(() => {
			expect(document.title).toBe(zhTranslations.about)
		})
	})

	it('renders "No match" when navigating to a bad route', async () => {
		const { container } = render({
			route: '/en/something-that-does-not-match',
		})

		expect(container.innerHTML).toMatch('No match')
	})

	function render(options?: RenderWithRouterOptions) {
		return renderWithRouter(<Routes />, options)
	}
})
