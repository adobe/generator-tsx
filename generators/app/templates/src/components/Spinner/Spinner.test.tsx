import React from 'react'

import translations from 'translations/en.json'
import { renderWithRedux } from 'utils/test'

import Spinner from '.'

describe('Spinner component', () => {
	it('renders', () => {
		expect(render().getByAltText(translations['spinner'])).not.toBeUndefined()
	})

	function render() {
		return renderWithRedux(<Spinner />)
	}
})
