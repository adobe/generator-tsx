import { styled } from 'linaria/react'
import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { connect } from 'react-redux'

import { fetchCart } from 'actions/cart'
import useTheme from 'helpers/useTheme'
import Theme from 'models/Theme'
import RootState from 'store/RootState'

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
		<Root>
			<Helmet>
				<title>Home</title>
			</Helmet>
			<Header>
				<Logo src={logo} alt="logo" />
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
			</Header>
		</Root>
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

const Root = styled.div`
	text-align: center;
`

const Header = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: calc(10px + 2vmin);
`

const Logo = styled.img`
	animation: spin infinite 20s linear;
	height: 40vmin;
	pointer-events: none;
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`
