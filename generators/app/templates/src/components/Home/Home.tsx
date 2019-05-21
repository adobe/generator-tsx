import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { connect } from 'react-redux'

import { fetchCart } from 'actions/cart'
import useTheme from 'helpers/useTheme'
import Theme from 'models/Theme'
import RootState from 'store/RootState'

import styles from './Home.module.css'
import logo from './logo.svg'

interface StateProps extends Pick<RootState, 'cart'> {
	theme: Theme
}

interface DispatchProps {
	getCart(): void
}

export interface HomeProps {}

const Home: React.FC<HomeProps & StateProps & DispatchProps> = ({
	cart,
	getCart,
	theme,
}) => {
	useEffect(() => {
		getCart()
	}, [getCart])
	useTheme(theme)
	return (
		<div className={styles.root}>
			<Helmet>
				<title>Home</title>
			</Helmet>
			<header className={styles.header}>
				<img src={logo} className={styles.logo} alt="logo" />
				<p>
					<FormattedHTMLMessage id="home.instructions" />
				</p>
				<a
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FormattedMessage id="home.learn" />
				</a>
				{JSON.stringify(cart.subtotal.amount)}
			</header>
		</div>
	)
}

export default connect<StateProps, DispatchProps, void, RootState>(
	state => ({
		cart: state.cart,
		theme: state.global.theme,
	}),
	{
		getCart: fetchCart,
	},
)(Home)
