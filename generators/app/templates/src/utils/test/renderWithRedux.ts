import { ReactElement } from 'react'
import { DeepPartial } from 'redux'
import { MockStoreEnhanced } from 'redux-mock-store'

import RootActions from 'actions'
import RootState from 'store/RootState'
import createProviders from 'helpers/createProviders'

import mockStore from './mockStore'
import { CustomRenderOptions, render } from './reactTestingLibrary'

interface RenderWithReduxOptions extends CustomRenderOptions {
	state?: DeepPartial<RootState>
	store?: MockStoreEnhanced<DeepPartial<RootState>, RootActions>
}

export default function renderWithRedux(
	ui: ReactElement<any>,
	options: RenderWithReduxOptions = {},
) {
	const { state, store = mockStore(state) } = options
	return {
		...render(ui, { wrapper: createProviders(store), ...options }),
		store,
	}
}
