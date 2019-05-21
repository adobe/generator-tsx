import React from 'react'
import Helmet from 'react-helmet'
import { injectIntl, InjectedIntlProps } from 'react-intl'

const NotFound: React.SFC<InjectedIntlProps> = props => {
	const title = props.intl.formatMessage({ id: 'notFound.title' })
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
