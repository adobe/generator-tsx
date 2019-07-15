import React, { FC } from 'react'
import { RouteProps, NavLink, NavLinkProps } from 'react-router-dom'

import Locale from 'models/Locale'

export const routes: (RouteProps & {
	locale?: Locale
	path: string
} & Pick<NavLinkProps, 'isActive'>)[] = [
	{
		path: '/',
		children: 'English (United States)',
	},
	{
		path: '/zh',
		locale: 'zh',
		children: '简体中文 （中国大陆）',
	},
]

const LocalesMenu: FC = () => (
	<menu>
		{routes.map(({ children, isActive, path }, index) => (
			<li key={index}>
				<NavLink
					activeStyle={{ color: 'red' }}
					{...{ children, isActive, to: path }}
				/>
			</li>
		))}
	</menu>
)

export default LocalesMenu
