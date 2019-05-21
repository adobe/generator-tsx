import fetchMock from 'fetch-mock'

import <%= model %> from 'models/<%= model %>'

import { fetch<%= model %> } from '.'

describe('/api/<%= name %> module', () => {
	beforeEach(() => {
		fetchMock.reset()
	})

	describe('get<%= model %>', () => {
		it('resolves with a <%= model %> object', async () => {
			const <%= camelCase(model) %>: <%= model %> = {}
			fetchMock.getOnce('/api/<%= camelCase(model) %>.json', JSON.stringify(<%= camelCase(model) %>))
			expect.assertions(1)

			const successResult = await fetch<%= model %>()

			expect(successResult).toEqual(<%= camelCase(model) %>)
		})
	})
})
