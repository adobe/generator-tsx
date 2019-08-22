import { RouteComponentProps } from '@reach/router'
import { styled } from 'linaria/react'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import {
	FormattedMessage,
	FormattedHTMLMessage,
	injectIntl,
	IntlShape,
} from 'react-intl'
import { connect } from 'react-redux'
import { graphql } from 'babel-plugin-relay/macro'
import { QueryRenderer } from 'react-relay'
import { Environment } from 'relay-runtime'

import configEnvironment from 'config/environment'
import RootState from 'store/RootState'

import Spinner from 'components/Spinner'
import { HomeQueryResponse } from '__generated__/HomeQuery.graphql'

import logo from './logo.svg'

export interface HomeProps extends RouteComponentProps {
	environment?: Environment
}

const Home: React.FC<HomeProps & { intl: IntlShape }> = ({
	environment = configEnvironment,
	intl,
}) => {
	return (
		<Root>
			<Helmet>
				<title>
					{intl.formatMessage({
						id: 'nav.home',
						defaultMessage: 'Home',
					})}
				</title>
			</Helmet>
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
				<QueryRenderer<{ response: HomeQueryResponse; variables: {} }>
					{...{
						environment,
						query: graphql`
							query HomeQuery {
								hello
							}
						`,
						variables: {},
						render({ error, props }) {
							if (error) {
								return <div>Error! {error.message}</div>
							}
							if (!props) {
								return <Spinner />
							}
							return <div>{props.hello}</div>
						},
					}}
				/>
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
