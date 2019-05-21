import React from 'react'
import { DeepPartial } from 'redux'

import RootState from 'store/RootState'
import { renderWithRedux } from 'utils/test'

import QuxQuux, { QuxQuuxProps } from '.'

describe('QuxQuux', () => {
	it('renders content', () => {
		const content = render().getByText('content')

		expect(content).not.toBeNull()
	})

	const defaultProps: QuxQuuxProps = {}

	function render({
		props = {},
		state = {},
	}: {
		props?: Partial<QuxQuuxProps>
		state?: DeepPartial<RootState>
	} = {}) {
		return renderWithRedux(<QuxQuux {...defaultProps} {...props} />, { state })
	}
})
