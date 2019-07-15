import { styled } from 'linaria/react'
import React from 'react'
import Helmet from 'react-helmet'
import { injectIntl, InjectedIntlProps } from 'react-intl'

const About: React.FC<InjectedIntlProps> = props => {
	const title = props.intl.formatMessage({
		id: 'about',
		defaultMessage: 'About',
	})
	return (
		<Root>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<Header>{title}</Header>
		</Root>
	)
}

export default injectIntl(About)

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
