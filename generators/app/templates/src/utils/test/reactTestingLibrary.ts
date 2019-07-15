import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

import Providers from 'components/Providers'

export interface CustomRenderOptions extends Omit<RenderOptions, 'queries'> {}

function customRender(ui: ReactElement<any>, options?: CustomRenderOptions) {
	return render(ui, { wrapper: Providers, ...options })
}

export * from '@testing-library/react'

export { customRender as render }
