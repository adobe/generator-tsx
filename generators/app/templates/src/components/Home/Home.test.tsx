import React from 'react'
import { DeepPartial } from 'redux'

import RootState from 'store/RootState'
import { renderWithRedux } from 'utils/test'

import Home from '.'

describe(Home.name, () => {
	it('renders a logo', () => {
		const rendered = render()

		expect(rendered.getByAltText('logo')).toBeDefined()
	})

	function render({
		state = {},
	}: {
		state?: DeepPartial<RootState>
	} = {}) {
		return renderWithRedux(<Home />, {
			state,
		})
	}
})
