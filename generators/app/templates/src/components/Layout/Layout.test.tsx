import React from 'react'

import { renderWithRedux } from 'utils/test'

import LayoutStyles from './Layout.styles'
import Layout from '.'

describe('Layout component', () => {
	it('adds LayoutStyles class name to the html element', () => {
		render()

		expect(document.documentElement.className).toBe(LayoutStyles)
	})

	function render() {
		return renderWithRedux(<Layout />)
	}
})
