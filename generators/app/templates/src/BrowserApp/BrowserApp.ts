/* eslint-env browser */
import { DeepPartial } from 'ts-essentials'

import RootState from 'store/RootState'

export default class BrowserApp<TState = RootState> {
	public localStorage: Storage
	public window: Window
	private localStorageKey = `${this.namespace}.state`

	public constructor(
		private namespace: string,
		options: {
			localStorage?: Storage
			window?: Window
		} = {},
	) {
		this.window = options.window || window
		this.localStorage = options.localStorage || this.window.localStorage
	}

	public loadState(): DeepPartial<TState> {
		try {
			const serializedState = this.localStorage.getItem(this.localStorageKey)
			return serializedState ? JSON.parse(serializedState) : {}
		} catch (err) {
			const e2 = new Error('Unable to load state.')
			e2.stack = err.stack
			throw e2
		}
	}

	public saveState(state: DeepPartial<TState>) {
		try {
			this.localStorage.setItem(this.localStorageKey, JSON.stringify(state))
		} catch (err) {
			const e2 = new Error('Unable to save state.')
			e2.stack = err.stack
			throw e2
		}
	}
}
