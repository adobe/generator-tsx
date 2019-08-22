import { createIntl as _createIntl, createIntlCache } from 'react-intl'

import Locale from 'models/Locale'

export function createIntl(locale: Locale) {
	return _createIntl(
		{
			defaultLocale: 'en',
			locale,
			...(locale === 'en'
				? {}
				: {
						messages: require(`translations/${locale}.json`),
				  }),
		},
		createIntlCache(),
	)
}
