import React from 'react'

import { renderWithRedux } from 'utils/test'

import Spinner from '.'

describe(Spinner.name, () => {
	it('renders', () => {
		const { getByAltText } = render()

		expect(getByAltText('Spinner')).toBeDefined()
	})

	function render() {
		return renderWithRedux(<Spinner />)
	}
})
