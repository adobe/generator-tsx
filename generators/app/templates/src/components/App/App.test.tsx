import React from 'react'

import { renderWithRedux } from 'utils/test'

import App from '.'

describe(App.name, () => {
	it('renders "Learn React"', async () => {
		const { findByText } = render()

		expect(await findByText('Learn React')).toBeDefined()
	})

	function render() {
		return renderWithRedux(<App />)
	}
})
