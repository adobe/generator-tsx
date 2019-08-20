import React from 'react'
import { DeepPartial } from 'redux'
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils'

import RootState from 'store/RootState'
import { renderWithRedux } from 'utils/test'

import Home, { HomeProps } from '.'

describe(Home.name, () => {
	let environment: ReturnType<typeof createMockEnvironment>

	beforeEach(() => {
		environment = createMockEnvironment()
	})

	it('renders loading state', () => {
		const rendered = render()

		expect(rendered.getByTestId('spinner')).toBeDefined()
	})

	it('renders mock value for field "hello"', () => {
		const rendered = render()

		environment.mock.resolveMostRecentOperation(MockPayloadGenerator.generate)

		expect(rendered.getByText('<mock-value-for-field-"hello">')).toBeDefined()
	})

	it('renders error state', () => {
		const rendered = render()
		const err = new Error('ERROR_MESSAGE')

		environment.mock.rejectMostRecentOperation(err)

		expect(rendered.getByText(`Error! ${err.message}`)).toBeDefined()
	})

	const defaultProps: HomeProps = {}

	function render({
		props = {},
		state = {},
	}: {
		props?: Partial<HomeProps>
		state?: DeepPartial<RootState>
	} = {}) {
		return renderWithRedux(
			<Home
				{...{
					...defaultProps,
					environment,
					...props,
				}}
			/>,
			{
				state,
			},
		)
	}
})
