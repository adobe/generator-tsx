import React, { FC } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { Store as ReduxStore, DeepPartial } from 'redux'

import RootActions from 'actions'
import RootState from 'store/RootState'

export interface ProvidersProps {
	store?: ReduxStore<DeepPartial<RootState>, RootActions>
}

const Providers: FC<ProvidersProps> = ({ children, store }) => {
	const P: FC = () => <HelmetProvider children={children} />
	return store ? (
		<Provider store={store}>
			<P />
		</Provider>
	) : (
		<P />
	)
}

export default Providers
