import loadable, { LoadableComponent } from '@loadable/component'
import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { NavLink, RouteProps } from 'react-router-dom'

import { joinRoutePaths } from 'helpers/string'

export const routes: (RouteProps & {
	Component: LoadableComponent<any>
	path: string
})[] = [
	{
		path: '',
		children: <FormattedMessage id="nav.home" defaultMessage="Home" />,
		Component: loadable(() => import('../Home')),
	},
	{
		path: 'about',
		children: <FormattedMessage id="nav.about" defaultMessage="About" />,
		Component: loadable(() => import('../About')),
	},
]

export interface NavProps {
	prefix?: string
}

const Nav: FC<NavProps> = ({ prefix = '' }) => (
	<nav>
		<ul>
			{routes.map(({ children, exact, path }, index) => (
				<li key={index}>
					<NavLink
						{...{
							activeStyle: { color: 'red' },
							children,
							exact,
							to: joinRoutePaths(prefix, path),
						}}
					/>
				</li>
			))}
		</ul>
	</nav>
)

export default Nav
