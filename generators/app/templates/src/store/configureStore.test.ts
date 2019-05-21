import configureStore from './configureStore'

describe('configureStore', () => {
	it('returns a default store', () => {
		expect(Object.keys(configureStore())).toEqual([
			'dispatch',
			'subscribe',
			'getState',
			'replaceReducer',
		])
	})
})
