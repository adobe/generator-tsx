import React from 'react'

import { renderWithRouter } from 'utils/test'

import App from '.'

describe(App.name, () => {
	it('renders "Learn React"', async () => {
		const { getByText } = render()

		expect(getByText('Learn React')).toBeDefined()
	})

	function render() {
		return renderWithRouter(<App />)
	}
})
