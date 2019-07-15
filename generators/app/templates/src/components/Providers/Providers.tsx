import React, { FC } from 'react'
import { addLocaleData, IntlProvider } from 'react-intl'
import defaultLocaleData from 'react-intl/locale-data/en'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Store as ReduxStore, DeepPartial } from 'redux'

import RootActions from 'actions'
import RootState from 'store/RootState'

addLocaleData(defaultLocaleData)

export interface ProvidersProps {
	store?: ReduxStore<DeepPartial<RootState>, RootActions>
}

const Providers: FC<ProvidersProps> = ({ children, store }) => {
	const P: FC = () => (
		<IntlProvider locale="en">
			<BrowserRouter>{children}</BrowserRouter>
		</IntlProvider>
	)
	return store ? (
		<Provider store={store}>
			<P />
		</Provider>
	) : (
		<P />
	)
}

export default Providers
