import React from 'react'
import { FormattedMessage } from 'react-intl'

import translations from 'translations/en.json'

import { render } from './reactTestingLibrary'

const Foo: React.FC = () => <FormattedMessage id="test" />

describe('reactTestingLibrary', () => {
	describe('render', () => {
		it('renders translated text', () => {
			const rendered = render(<Foo />).getByText(translations.test)

			expect(rendered).not.toBeUndefined()
		})
	})
})
