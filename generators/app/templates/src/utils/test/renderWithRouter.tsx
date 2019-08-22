import {
	createHistory,
	createMemorySource,
	History,
	LocationProvider,
} from '@reach/router'
import React, { ReactElement } from 'react'

import renderWithRedux, { RenderWithReduxOptions } from './renderWithRedux'

export interface RenderWithRouterOptions extends RenderWithReduxOptions {
	history?: History
	route?: string
}

export default function renderWithRouter(
	ui: ReactElement<any>,
	{
		route = '/en',
		history = createHistory(createMemorySource(route)),
		...rest
	}: RenderWithRouterOptions = {},
) {
	return {
		...renderWithRedux(ui, {
			wrapper: ({ children }) => (
				<LocationProvider {...{ children, history }} />
			),
			...rest,
		}),
		history,
	}
}
