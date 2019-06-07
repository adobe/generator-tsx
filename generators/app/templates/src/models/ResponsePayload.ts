import { Merge } from 'ts-essentials'

import ResponseError from './ResponseError'

/**
 * Expected API response payload.
 */
type ResponsePayload<T = {}> = Merge<
	T,
	{
		errors: Array<Omit<ResponseError, 'message' | 'name'>>
	}
>

export default ResponsePayload
