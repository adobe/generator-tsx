/*eslint-disable no-throw-literal*/
import { Omit } from 'ts-essentials'

import ResponseError from 'models/ResponseError'
import ResponsePayload from 'models/ResponsePayload'

export default async function resolveFetch<TBody extends any>(
	fetching: Promise<Response>,
	{
		afterResponse = () => undefined,
	}: {
		/**
		 * Runs immediately after a `Response` is received, but before any status
		 * errors are thrown. This is an opportunity to throw custom errors that
		 * relate specifically to expectations of this API response.
		 */
		afterResponse?: (response: Response) => never | void
	} = {},
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

	afterResponse(response)

	if (!response.ok) {
		throw [
			new ResponseError({
				code: `STATUS_${response.status}`,
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
	return (responsePayload as Omit<typeof responsePayload, 'errors'>) as TBody
}
