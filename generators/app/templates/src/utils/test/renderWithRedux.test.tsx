import React from 'react'
import { connect } from 'react-redux'

import renderWithRedux from './renderWithRedux'

interface FakeState {
	fromState?: string
}

type FooProps = Pick<FakeState, 'fromState'>

const Foo: React.FC<FooProps> = ({ fromState = 'NOT_FROM_STATE' }) => (
	<React.Fragment>{fromState}</React.Fragment>
)

const ConnectedFoo = connect<{}, {}, {}, FakeState>(state => ({
	fromState: state.fromState,
}))(Foo)

describe('renderWithRedux', () => {
	it('renders an unconnected component', () => {
		const rendered = renderWithRedux(<Foo />).getByText('NOT_FROM_STATE')

		expect(rendered).toBeDefined()
	})

	it("renders connected component's prop from state", () => {
		const rendered = renderWithRedux(<ConnectedFoo />, {
			state: ({
				fromState: 'FROM_STATE',
			} as FakeState) as any,
		}).getByText('FROM_STATE')

		expect(rendered).toBeDefined()
	})
})
