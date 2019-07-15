import React, { FC } from 'react'
import { connect } from 'react-redux'

import { persistTheme } from 'actions/global'
import themes from 'themes'
import AppTheme from 'themes/AppTheme'
import { FormattedMessage } from 'react-intl'

export interface DispatchProps {
	persistTheme(name: keyof typeof themes): void
}

export const ToggleTheme: FC<DispatchProps> = ({ persistTheme }) => {
	const [theme, setTheme] = AppTheme.context().use()
	return (
		<button onClick={toggleTheme}>
			<FormattedMessage id="toggleTheme" defaultMessage="Toggle Theme" />
		</button>
	)
	function toggleTheme() {
		const key: keyof typeof themes = theme === themes.dark ? 'light' : 'dark'
		setTheme(themes[key])
		persistTheme(key)
	}
}

export default connect<void, DispatchProps>(
	null,
	{ persistTheme },
)(ToggleTheme)
