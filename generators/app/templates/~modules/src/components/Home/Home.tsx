import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import {
	FormattedMessage,
	FormattedHTMLMessage,
	injectIntl,
	IntlShape,
} from 'react-intl'
import { connect } from 'react-redux'

import RootState from 'store/RootState'

import styles from './Home.module.css'
import logo from './logo.svg'

export interface HomeProps extends RouteComponentProps {}

const Home: React.FC<HomeProps & { intl: IntlShape }> = ({ intl }) => {
	return (
		<div className={styles.root}>
			<Helmet>
				<title>
					{intl.formatMessage({
						id: 'nav.home',
						defaultMessage: 'Home',
					})}
				</title>
			</Helmet>
			<div className={styles.header}>
				<img className={styles.logo} src={logo} alt="logo" />
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
			</div>
		</div>
	)
}

export default connect<void, void, void, RootState>(null)(injectIntl(Home))
