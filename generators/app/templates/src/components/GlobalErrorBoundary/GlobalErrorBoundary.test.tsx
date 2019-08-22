import React from 'react'

import { render } from 'utils/test'

import GlobalErrorBoundary from './GlobalErrorBoundary'

describe(GlobalErrorBoundary.name, () => {
	it('renders "hello"', () => {
		const { getByText } = render(
			<GlobalErrorBoundary>hello</GlobalErrorBoundary>,
		)
		expect(getByText('hello')).toBeDefined()
	})

	it('renders "Something went wrong." when an error is thrown', () => {
		const spy = jest.spyOn(console, 'error').mockImplementation(() => {})

		const Throw = () => {
			throw new Error('bad')
		}

		const { getByText } = render(
			<GlobalErrorBoundary>
				<Throw />
			</GlobalErrorBoundary>,
		)

		expect(getByText('Something went wrong.')).toBeDefined()

		spy.mockRestore()
	})
})
