import React from 'react'

import { render } from './reactTestingLibrary'

const Foo: React.FC = () => null

describe('reactTestingLibrary', () => {
	describe('render', () => {
		it('returns getByText method', () => {
			const { getByText } = render(<Foo />)

			expect(getByText).toBeDefined()
		})
	})
})
