import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

import createProviders from 'helpers/createProviders'

export interface CustomRenderOptions extends Omit<RenderOptions, 'queries'> {}

const Providers = createProviders()
function customRender(ui: ReactElement<any>, options?: CustomRenderOptions) {
	return render(ui, { wrapper: Providers, ...options })
}

export * from '@testing-library/react'

export { customRender as render }
