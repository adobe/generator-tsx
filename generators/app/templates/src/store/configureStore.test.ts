import BrowserApp from 'BrowserApp'

import configureStore from './configureStore'

describe('configureStore', () => {
	it('returns a default store', () => {
		expect(Object.keys(configureStore(new BrowserApp('test')))).toEqual([
			'dispatch',
			'subscribe',
			'getState',
			'replaceReducer',
		])
	})
})
