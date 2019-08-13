import { styled } from 'linaria/react'
import React from 'react'
import {
	FormattedMessage,
	FormattedHTMLMessage,
	injectIntl,
	InjectedIntlProps,
} from 'react-intl'
import { connect } from 'react-redux'

import RootState from 'store/RootState'

import logo from './logo.svg'

const Home: React.FC<InjectedIntlProps> = ({ intl }) => {
	return (
		<Root>
			<Header>
				<Logo src={logo} alt="logo" />
				<p>
					<FormattedHTMLMessage
						id="home.instructions"
						defaultMessage="Edit <code>src/components/Home/Home.tsx</code> and save to reload."
					/>
				</p>
				<a
					href={intl.formatMessage({
						id: 'home.learnHref',
						defaultMessage: 'https://reactjs.org/',
					})}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FormattedMessage id="home.learn" defaultMessage="Learn React" />
				</a>
			</Header>
		</Root>
	)
}

export default connect<void, void, void, RootState>(null)(injectIntl(Home))

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
