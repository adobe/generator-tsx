import { app, mockStore } from 'utils/test'

import * as actions from './globalActions'
import * as types from './globalActionTypes'

describe('global actions', () => {
	const store = mockStore()
	const localStorage = app.localStorage

	beforeEach(() => {
		store.clearActions()
		localStorage.clear()
	})

	describe(actions.persistTheme.name, () => {
		it('dispatches PERSIST_THEME', async () => {
			await store.dispatch(actions.persistTheme('light'))

			expect(store.getActions()).toEqual([
				{ type: types.PERSIST_THEME, name: 'light' },
			])
		})

		it('saves theme name into localStorage', async () => {
			await store.dispatch(actions.persistTheme('light'))

			expect(localStorage.getItem('theme')).toBe('light')
		})
	})
})
