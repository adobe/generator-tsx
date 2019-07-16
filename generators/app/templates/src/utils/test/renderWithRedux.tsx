import React, { ReactElement } from 'react'
import { DeepPartial } from 'redux'

import Providers from 'components/Providers'
import RootState from 'store/RootState'

import mockStore from './mockStore'
import { CustomRenderOptions, render } from './reactTestingLibrary'

interface RenderWithReduxOptions extends CustomRenderOptions {
	state?: DeepPartial<RootState>
	store?: ReturnType<typeof mockStore>
}

export default function renderWithRedux(
	ui: ReactElement<any>,
	options: RenderWithReduxOptions = {},
) {
	const { state = {}, store = mockStore(state) } = options
	return {
		...render(ui, {
			wrapper: ({ children }) => <Providers {...{ children, store }} />,
			...options,
		}),
		store,
	}
}
