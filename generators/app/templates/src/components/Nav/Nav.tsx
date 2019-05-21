import React from 'react'
import { Link } from 'react-router-dom'

const Nav: React.SFC = () => (
	<nav>
		<ul>
			<li>
				<Link to="/">Home</Link>
			</li>
		</ul>
	</nav>
)

export default Nav
