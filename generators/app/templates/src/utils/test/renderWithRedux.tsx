import React, { Fragment, ReactElement } from 'react'
import { RawIntlProvider } from 'react-intl'
import { DeepPartial } from 'redux'

import Providers from 'components/Providers'
import RootState from 'store/RootState'

import mockStore from './mockStore'
import { CustomRenderOptions, render } from './reactTestingLibrary'
import { createIntl } from 'utils/intl'

export interface RenderWithReduxOptions extends CustomRenderOptions {
	state?: DeepPartial<RootState>
	store?: ReturnType<typeof mockStore>
}

const intl = createIntl('en')

export default function renderWithRedux(
	ui: ReactElement<any>,
	options: RenderWithReduxOptions = {},
) {
	const { state = {}, store = mockStore(state), wrapper, ...rest } = options
	const Wrapper = wrapper || Fragment
	return {
		...render(ui, {
			wrapper: ({ children }) => (
				<Wrapper>
					<RawIntlProvider value={intl}>
						<Providers {...{ children, store }} />
					</RawIntlProvider>
				</Wrapper>
			),
			...rest,
		}),
		store,
	}
}
