import React from 'react'

import { renderWithRedux, wait } from 'utils/test'

import About from '.'

describe(About.name, () => {
	it('renders document title: About', async () => {
		render()

		await wait(() => {
			expect(document.title).toBe('About')
		})
	})

	function render() {
		return renderWithRedux(<About />)
	}
})
