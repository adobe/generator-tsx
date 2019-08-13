import React from 'react'
import Helmet from 'react-helmet'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import styles from './About.module.css'

const About: React.FC<InjectedIntlProps> = props => {
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
