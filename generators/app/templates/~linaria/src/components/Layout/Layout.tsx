import { RouteComponentProps } from '@reach/router'
import React, { FC } from 'react'
import { RawIntlProvider } from 'react-intl'

import LocalesMenu from 'components/LocalesMenu'
import Nav from 'components/Nav'
import ToggleTheme from 'components/ToggleTheme'
import Locale from 'models/Locale'
import AppTheme from 'themes/AppTheme'
import { createIntl } from 'utils/intl'

import LayoutStyles from './Layout.styles'

export interface LayoutProps extends RouteComponentProps {
	locale?: Locale
}

const Layout: FC<LayoutProps> = ({ children, locale = 'en' }) => {
	AppTheme.context().useLayoutEffect({
		classNames: [LayoutStyles],
	})
	return (
		<RawIntlProvider value={createIntl(locale)}>
			<LocalesMenu />
			<ToggleTheme />
			<Nav />
			{children}
		</RawIntlProvider>
	)
}

export default Layout
