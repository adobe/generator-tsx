import React from 'react'

import { renderWithRedux } from 'utils/test'

import Nav from '.'

describe('Nav component', () => {
	it('renders a Home link', () => {
		expect(render().getByText('Home')).not.toBeUndefined()
	})

	function render() {
		return renderWithRedux(<Nav />)
	}
})
