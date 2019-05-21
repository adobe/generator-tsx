import mockStore from './mockStore'

describe('mockStore', () => {
	it('creates a store that can dispatch', () => {
		const store = mockStore()
		const action = { type: 'FOO' }

		store.dispatch(action)

		expect(store.getActions()).toEqual([action])
	})
})
