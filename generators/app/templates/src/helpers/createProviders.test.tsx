import React from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { render } from '@testing-library/react'

import translations from 'translations/en.json'
import { mockStore } from 'utils/test'

import createProviders from './createProviders'

interface FakeState {
	fromState?: string
}

type StateProps = Pick<FakeState, 'fromState'>

const Foo: React.FC<StateProps> = ({ fromState = 'DEFAULT' }) => (
	<React.Fragment>
		<FormattedMessage id="test" />
		{fromState}
	</React.Fragment>
)

const ConnectedFoo = connect<{}, {}, {}, FakeState>(state => ({
	fromState: state.fromState,
}))(Foo)

describe('createProviders', () => {
	it('provides a working translation provider', () => {
		const Providers = createProviders()

		const rendered = render(
			<Providers>
				<Foo />
			</Providers>,
		).getByText(translations.test)

		expect(rendered).not.toBeUndefined()
	})

	it('provides a working store provider', () => {
		const Providers = createProviders(
			mockStore(({ fromState: 'FROM_STATE' } as FakeState) as any),
		)

		const rendered = render(
			<Providers>
				<ConnectedFoo />
			</Providers>,
		).getByText('FROM_STATE')

		expect(rendered).not.toBeUndefined()
	})
})
