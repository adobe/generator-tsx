import React from 'react'
import { connect } from 'react-redux'
import { render } from '@testing-library/react'

import { mockStore } from 'utils/test'

import Providers from './Providers'

interface FakeState {
	fromState?: string
}

type StateProps = Pick<FakeState, 'fromState'>

const Foo: React.FC<StateProps> = ({ fromState = 'DEFAULT' }) => (
	<React.Fragment>
		<p>{fromState}</p>
	</React.Fragment>
)

const ConnectedFoo = connect<{}, {}, {}, FakeState>(state => ({
	fromState: state.fromState,
}))(Foo)

describe(Providers.name, () => {
	it('provides a working store provider', () => {
		const store = mockStore(({ fromState: 'FROM_STATE' } as FakeState) as any)

		const rendered = render(
			<Providers store={store}>
				<ConnectedFoo />
			</Providers>,
		).getByText('FROM_STATE')

		expect(rendered).toBeDefined()
	})
})
