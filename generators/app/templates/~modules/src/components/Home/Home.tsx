import React from 'react'
import {
	FormattedMessage,
	FormattedHTMLMessage,
	injectIntl,
	InjectedIntlProps,
} from 'react-intl'
import { connect } from 'react-redux'

import RootState from 'store/RootState'

import styles from './Home.module.css'
import logo from './logo.svg'

const Home: React.FC<InjectedIntlProps> = ({ intl }) => {
	return (
		<div className={styles.root}>
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
