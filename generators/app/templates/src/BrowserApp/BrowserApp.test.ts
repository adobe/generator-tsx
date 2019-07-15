import Storage from '@jedmao/storage'

import BrowserApp from './BrowserApp'

describe(BrowserApp.name, () => {
	const localStorage = new Storage()
	const app = new BrowserApp<FakeState>('test', { localStorage })

	interface FakeState {
		foo: string
		bar: number
	}

	beforeEach(() => {
		localStorage.clear()
	})

	describe('#loadState', () => {
		it('loads state from test.state', () => {
			localStorage.setItem('test.state', '{"fake": "data"}')

			expect(app.loadState()).toEqual({ fake: 'data' })
		})

		it('throws when unable to read state', () => {
			localStorage.setItem('test.state', "can't parse this")

			expect(() => app.loadState()).toThrow('Unable to load state.')
		})
	})

	describe('#saveState', () => {
		it('saves state in test.state', () => {
			const fakeState = { foo: 'data', bar: 42 }

			app.saveState(fakeState)

			expect(localStorage.getItem('test.state')).toEqual(
				JSON.stringify(fakeState),
			)
		})

		it('throws when trying to save a function into state', () => {
			expect(() => app.saveState((() => {}) as any)).toThrow(
				'Unable to save state.',
			)
		})
	})
})
