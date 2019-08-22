import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { injectIntl, IntlShape } from 'react-intl'

import styles from './About.module.css'

export interface AboutProps extends RouteComponentProps {}

const About: React.FC<AboutProps & { intl: IntlProps }> = props => {
	const title = props.intl.formatMessage({
		id: 'about',
		defaultMessage: 'About',
	})
	return (
		<div className={styles.root}>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<div className={styles.header}>{title}</div>
		</div>
	)
}

export default injectIntl(About)
