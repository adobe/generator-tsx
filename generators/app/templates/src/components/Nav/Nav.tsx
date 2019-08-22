import { Link, LinkProps } from '@reach/router'
import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'

const NavLink: FC<LinkProps<any>> = ({ children, to }) => (
	<li>
		<Link
			children={children}
			getProps={({ isCurrent }) =>
				isCurrent ? { style: { color: 'red' } } : {}
			}
			to={to}
		/>
	</li>
)

const Nav: FC = () => (
	<nav>
		<ul>
			<NavLink to=".">
				<FormattedMessage id="nav.home" defaultMessage="Home" />
			</NavLink>
			<NavLink to="about">
				<FormattedMessage id="nav.about" defaultMessage="About" />
			</NavLink>
		</ul>
	</nav>
)

export default Nav
