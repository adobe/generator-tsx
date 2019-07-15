import React from 'react'

import { renderWithRedux } from 'utils/test'

import Nav from '.'

describe(Nav.name, () => {
	it('renders a Home link', () => {
		expect(render().getByText('Home')).not.toBeUndefined()
	})

	function render() {
		return renderWithRedux(<Nav />)
	}
})
