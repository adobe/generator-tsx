import fetchMock from 'fetch-mock'

import BazQux from 'models/BazQux'

import { fetchBazQux } from '.'

describe('/api/bazQux module', () => {
	beforeEach(() => {
		fetchMock.reset()
	})

	describe('getBazQux', () => {
		it('resolves with a BazQux object', async () => {
			const bazQux: BazQux = {}
			fetchMock.getOnce('/api/bazQux.json', JSON.stringify(bazQux))
			expect.assertions(1)

			const successResult = await fetchBazQux()

			expect(successResult).toEqual(bazQux)
		})
	})
})
