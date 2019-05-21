import React from 'react'
import { DeepPartial } from 'redux'

import RootState from 'store/RootState'
import { renderWithRedux } from 'utils/test'

import <%= name %>, { <%= name %>Props } from '.'

describe('<%= name %>', () => {
	it('renders content', () => {
		const content = render().getByText('content')

		expect(content).not.toBeNull()
	})

	const defaultProps: <%= name %>Props = {}

	function render({
		props = {},
		state = {},
	}: {
		props?: Partial<<%= name %>Props>
		state?: DeepPartial<RootState>
	} = {}) {
		return renderWithRedux(<<%= name %> {...defaultProps} {...props} />, { state })
	}
})
