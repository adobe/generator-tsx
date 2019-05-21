import React from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import gif from './spinner.gif'
import svg from './spinner.svg'

interface SpinnerProps extends React.ObjectHTMLAttributes<HTMLObjectElement> {}

const Spinner: React.FC<SpinnerProps & InjectedIntlProps> = props => (
	<object type="image/svg+xml" data={svg} {...props}>
		<img src={gif} alt={props.intl.formatMessage({ id: 'spinner' })} />
	</object>
)

export default injectIntl(Spinner)
