import React, { FC } from 'react'
import Helmet from 'react-helmet'
import { injectIntl, InjectedIntlProps } from 'react-intl'

const NotFound: FC<InjectedIntlProps> = props => {
	const title = props.intl.formatMessage({
		id: 'notFound.title',
		defaultMessage: 'Page Not Found',
	})
	return (
		<>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<h1>{title}</h1>
		</>
	)
}

export default injectIntl(NotFound)
