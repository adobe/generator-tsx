import React from 'react'

import { fireEvent, renderWithRedux } from 'utils/test'

import themes from 'themes'
import AppTheme from 'themes/AppTheme'

import { ToggleTheme } from './ToggleTheme'

describe(ToggleTheme.name, () => {
	it('toggles a theme', async () => {
		const persistTheme = jest.fn()
		const { getByText } = render({ persistTheme })
		const toggleTheme = getByText('Toggle Theme')
		const setProperty = jest.spyOn(
			document.documentElement.style,
			'setProperty',
		)

		fireEvent.click(toggleTheme)

		expect(persistTheme).toHaveBeenCalledWith('light')
		expect(setProperty.mock.calls[0]).toEqual([
			'--background-color',
			themes.light.backgroundColor,
		])

		setProperty.mockClear()
		fireEvent.click(toggleTheme)

		expect(persistTheme).toHaveBeenLastCalledWith('dark')
		expect(setProperty.mock.calls[0]).toEqual([
			'--background-color',
			themes.dark.backgroundColor,
		])

		setProperty.mockRestore()
	})

	function render({
		persistTheme = jest.fn(),
	}: Partial<React.ComponentProps<typeof ToggleTheme>> = {}) {
		const themeContext = AppTheme.context()
		const App = () => {
			themeContext.useLayoutEffect()
			return <ToggleTheme {...{ persistTheme }} />
		}
		return renderWithRedux(
			<themeContext.Provider>
				<App />
			</themeContext.Provider>,
		)
	}
})
