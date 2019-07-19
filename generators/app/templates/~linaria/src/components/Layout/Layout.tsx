import React, { FC } from 'react'

import LocalesMenu from 'components/LocalesMenu'
import Nav from 'components/Nav'
import ToggleTheme from 'components/ToggleTheme'
import AppTheme from 'themes/AppTheme'

import LayoutStyles from './Layout.styles'

export interface LayoutProps {
	localePath?: string
}

const Layout: FC<LayoutProps> = ({ children, localePath = '/' }) => {
	AppTheme.context().useLayoutEffect({
		classNames: [LayoutStyles],
	})
	return (
		<>
			<LocalesMenu />
			<ToggleTheme />
			<Nav prefix={localePath} />
			{children}
		</>
	)
}

export default Layout
