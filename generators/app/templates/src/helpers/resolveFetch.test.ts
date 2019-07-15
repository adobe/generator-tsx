import ky from 'ky-universal'

import ResponseError from 'models/ResponseError'
import ResponsePayload from 'models/ResponsePayload'

import resolveFetch from './resolveFetch'

describe('resolveFetch', () => {
	beforeEach(() => {
		global.fetch.resetMocks()
	})

	it('resolves a payload with an expected shape', async () => {
		const expected = { foo: 'bar' }
		global.fetch.mockResponseOnce(JSON.stringify(expected))

		const successResult = await resolveFetch(ky('noop'))

		expect(successResult).toEqual(expected)
	})

	it('throws if the fetch fails', async () => {
		const fakeError = new Error('fail')
		global.fetch.mockRejectOnce(fakeError)
		expect.assertions(3)

		try {
			await resolveFetch(ky('noop'))
		} catch (errors) {
			expect(errors!.length).toBe(1)
			expect(errors[0] instanceof ResponseError).toBe(true)
			expect(errors![0].code).toBe('API_NO_FETCH')
		}
	})

	it('throws if response status is 500', async () => {
		global.fetch.mockResponseOnce(JSON.stringify({}), { status: 500 })
		expect.assertions(3)

		try {
			await resolveFetch(ky('noop'))
		} catch (errors) {
			expect(errors!.length).toBe(1)
			expect(errors[0] instanceof ResponseError).toBe(true)
			expect(errors![0].code).toBe('API_NO_FETCH')
		}
	})

	it('throws if response body is not parseable', async () => {
		global.fetch.mockResponseOnce('NOT_PARSEABLE')
		expect.assertions(3)

		try {
			await resolveFetch(ky('noop'))
		} catch (errors) {
			expect(errors!.length).toBe(1)
			expect(errors[0] instanceof ResponseError).toBe(true)
			expect(errors![0].code).toBe('API_NO_PARSE')
		}
	})

	it('throws an array of two payload errors', async () => {
		const payload: ResponsePayload = {
			errors: [{ title: 'ERROR_TITLE_1' }, { title: 'ERROR_TITLE_2' }],
		}
		global.fetch.mockResponseOnce(JSON.stringify(payload))
		expect.assertions(5)

		try {
			await resolveFetch(ky('noop'))
		} catch (errors) {
			expect(errors!.length).toBe(2)
			expect(errors[0] instanceof ResponseError).toBe(true)
			expect(errors![0].title).toBe('ERROR_TITLE_1')
			expect(errors[1] instanceof ResponseError).toBe(true)
			expect(errors![1].title).toBe('ERROR_TITLE_2')
		}
	})
})
