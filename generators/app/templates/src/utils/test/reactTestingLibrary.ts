import { ReactElement } from 'react'
import { render, RenderOptions } from 'react-testing-library'
import { Omit } from 'ts-essentials'

import createProviders from 'helpers/createProviders'

export interface CustomRenderOptions extends Omit<RenderOptions, 'queries'> {}

const Providers = createProviders()
function customRender(ui: ReactElement<any>, options?: CustomRenderOptions) {
	return render(ui, { wrapper: Providers, ...options })
}

export * from 'react-testing-library'

export { customRender as render }
