import lightTheme from 'themes/light'
import { mockStore } from 'utils/test'

import * as actions from './globalActions'
import * as types from './globalActionTypes'

describe('global actions', () => {
	const store = mockStore()

	beforeEach(() => {
		store.clearActions()
	})

	describe('setTheme', () => {
		it('dispatches SET_THEME', async () => {
			const expectedActions = [{ type: types.SET_THEME, theme: lightTheme }]
			expect.assertions(1)

			await store.dispatch(actions.setTheme(lightTheme))

			expect(store.getActions()).toEqual(expectedActions)
		})
	})
})
