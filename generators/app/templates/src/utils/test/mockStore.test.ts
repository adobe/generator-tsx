import { types } from 'actions/global'

import mockStore, { app, extraThunkArgument } from './mockStore'

describe('mockStore', () => {
	it('creates a mock store that saves a dispatched action', () => {
		const store = mockStore()
		const action: types.PersistTheme = { type: 'PERSIST_THEME', name: 'dark' }

		store.dispatch(action)

		expect(store.getActions()[0]).toBe(action)
	})

	it('exports app === extraThunkArgument.app', () => {
		expect(app).toBe(extraThunkArgument.app)
	})
})
