import React from 'react'
import { DeepPartial } from 'redux'

import RootState from 'store/RootState'
import darkTheme from 'themes/dark'
import translations from 'translations/en.json'
import { renderWithRedux } from 'utils/test'

import Home, { HomeProps } from '.'

describe('Home', () => {
	it('renders translated text', () => {
		const learnText = render({
			state: {
				cart: {
					subtotal: {
						amount: 0,
					},
				},
				global: {
					theme: darkTheme,
				},
			},
		}).getByText(translations['home.learn'])

		expect(learnText).not.toBeNull()
	})

	const defaultProps: HomeProps = {}

	function render({
		props = {},
		state = {},
	}: {
		props?: Partial<HomeProps>
		state?: DeepPartial<RootState>
	} = {}) {
		return renderWithRedux(<Home {...defaultProps} {...props} />, { state })
	}
})
