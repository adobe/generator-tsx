import React from 'react'
import { injectIntl, IntlShape } from 'react-intl'

import gif from './spinner.gif'
import svg from './spinner.svg'

interface SpinnerProps extends React.ObjectHTMLAttributes<HTMLObjectElement> {}

const Spinner: React.FC<SpinnerProps & { intl: IntlShape }> = props => {
	const label = props.intl.formatMessage({
		id: 'spinner',
		defaultMessage: 'Spinner',
	})
	return (
		<object
			aria-label={label}
			data={svg}
			data-testid="spinner"
			role="img"
			type="image/svg+xml"
			{...props}
		>
			<img src={gif} alt={label} />
		</object>
	)
}

export default injectIntl(Spinner)
