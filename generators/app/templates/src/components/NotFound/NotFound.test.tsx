import React from 'react'

import { renderWithRedux } from 'utils/test'

import NotFound from '.'

describe(NotFound.name, () => {
	it('renders "Page Not Found" title', () => {
		const { getByText } = render()

		expect(getByText('Page Not Found')).not.toBeUndefined()
	})

	function render() {
		return renderWithRedux(<NotFound />)
	}
})
