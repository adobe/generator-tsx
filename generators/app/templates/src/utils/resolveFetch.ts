/*eslint-disable no-throw-literal*/
import ResponseError from 'models/ResponseError'
import ResponsePayload from 'models/ResponsePayload'

export default async function resolveFetch<TBody extends any>(
	fetching: Promise<Response>,
) {
	let response: Response
	try {
		response = await fetching
	} catch (error) {
		throw [
			new ResponseError({
				code: 'NO_FETCH',
				stack: (error as Error).stack,
			}),
		]
	}

	let responsePayload: ResponsePayload<TBody>

	try {
		responsePayload = await response.json()
	} catch (error) {
		throw [
			new ResponseError({
				code: 'NO_PARSE',
				stack: (error as Error).stack,
			}),
		]
	}

	const errors = responsePayload.errors as ResponseError[]
	if (Array.isArray(errors) && errors.length) {
		throw errors.map(errorData => new ResponseError(errorData))
	}

	/**
	 * Intentionally omit non-TBody props from the result type,
	 * because errors have already been dealt with.
	 */
	return (responsePayload as Omit<ResponsePayload, 'errors'>) as TBody
}
