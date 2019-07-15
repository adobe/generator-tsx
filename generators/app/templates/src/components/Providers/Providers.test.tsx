import React from 'react'
import { FormattedMessage } from 'react-intl'
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
		<FormattedMessage id="test" defaultMessage="message" />
		{fromState}
	</React.Fragment>
)

const ConnectedFoo = connect<{}, {}, {}, FakeState>(state => ({
	fromState: state.fromState,
}))(Foo)

describe(Providers.name, () => {
	it('provides a working translation provider', () => {
		const rendered = render(
			<Providers>
				<Foo />
			</Providers>,
		).getByText('message')

		expect(rendered).toBeDefined()
	})

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
