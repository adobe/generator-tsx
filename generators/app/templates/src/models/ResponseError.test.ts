import ResponseError from './ResponseError'

describe('ResponseError model', () => {
	it('has a default code, detail, name and title', () => {
		const error = new ResponseError()

		expect(JSON.parse(JSON.stringify(error))).toEqual({
			code: 'API_UNKNOWN',
			detail: 'Please report error code: API_UNKNOWN.',
			name: 'ResponseError',
			title: 'Sorry! Something went wrong. Try again.',
		})
	})

	it('accepts optional props in the constructor', () => {
		const options: Partial<ResponseError> = {
			code: 'NEW_CODE',
			detail: 'NEW_DETAIL',
			id: 'NEW_ID',
			links: {
				about: 'NEW_LINKS_ABOUT',
			},
			meta: 'NEW_META',
			source: {
				parameter: 'NEW_SOURCE_PARAMETER',
				pointer: 'NEW_SOURCE_POINTER',
			},
			stack: 'NEW_STACK',
			status: 'NEW_STATUS',
			title: 'NEW_TITLE',
		}
		const error = new ResponseError(options)

		expect(error.stack).toBe(options.stack)
		delete options.stack
		expect(JSON.parse(JSON.stringify(error))).toEqual({
			...options,
			code: 'API_NEW_CODE',
			name: 'ResponseError',
		})
	})

	it('provides a message as an alias to the title', () => {
		const error = new ResponseError()

		expect((error.message = 'NEW_MESSAGE')).toBe(error.title)
		expect(error.title).toBe('NEW_MESSAGE')
		expect((error.title = 'NEW_TITLE')).toBe(error.message)
		expect(error.message).toBe('NEW_TITLE')
	})
})
