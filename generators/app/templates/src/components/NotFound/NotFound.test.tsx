import React from 'react'

import translations from 'translations/en.json'
import { renderWithRedux } from 'utils/test'

import NotFound from '.'

describe('NotFound component', () => {
	it('renders "Page Not Found" title', () => {
		expect(
			render().getByText(translations['notFound.title']),
		).not.toBeUndefined()
	})

	function render() {
		return renderWithRedux(<NotFound />)
	}
})
