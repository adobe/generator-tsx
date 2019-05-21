import React, { FC, Fragment } from 'react'
import { addLocaleData, IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Store as ReduxStore, DeepPartial } from 'redux'

import RootActions from 'actions'
import RootState from 'store/RootState'

type Store = ReduxStore<DeepPartial<RootState>, RootActions>

export default function createProviders(
	store?: Store,
	locale = getLocale(),
): FC<{}> {
	addLocaleData([...require(`react-intl/locale-data/${locale}`)])
	const StoreProvider = store
		? ((({ children }) => <Provider {...{ children, store }} />) as FC<{}>)
		: Fragment
	return ({ children }) => (
		<StoreProvider>
			<IntlProvider
				locale={locale}
				messages={require(`../translations/${locale}`)}
			>
				<BrowserRouter>{children}</BrowserRouter>
			</IntlProvider>
		</StoreProvider>
	)
}

function getLocale() {
	return (
		(navigator || /* istanbul ignore next */ {}).language ||
		/* istanbul ignore next */ 'en-US'
	).split('-')[0]
}
