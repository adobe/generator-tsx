/**
 * https://jsonapi.org/format/#error-objects
 */
export default class ResponseError<TMeta = {}> extends Error {
	public name = 'ResponseError'
	/**
	 * A unique identifier for this particular occurrence of the problem.
	 */
	public id?: string
	/**
	 * https://jsonapi.org/format/#document-links
	 */
	public links?: {
		/**
		 * A [link](https://jsonapi.org/format/#document-links) that leads to
		 * further details about this particular occurrence of the problem.
		 */
		about: string
	}
	/**
	 * The HTTP status code applicable to this problem.
	 */
	public status?: string
	/**
	 * An application-specific error code.
	 */
	public code?: string
	/**
	 * A short, human-readable summary of the problem that **SHOULD NOT** change
	 * from occurrence to occurrence of the problem, except for purposes of
	 * localization.
	 * @alias `message`
	 */
	public title?: string
	/**
	 * A human-readable explanation specific to this occurence of the problem.
	 * Like `title`, this field's value can be localized.
	 */
	public detail?: string
	/**
	 * Contains references to the source of the error.
	 */
	public source?: {
		/**
		 * A JSON `Pointer` [RFC6901](https://tools.ietf.org/html/rfc6901) to
		 * the associated entity in the request document [e.g., `"/data"` for
		 * a primary data object, or `"/data/attributes/title"` for a specific
		 * attribute].
		 */
		pointer?: string
		/**
		 * A string indicating which URI query parameter caused the error.
		 */
		parameter?: string
	}
	/**
	 * A [meta object](http://www.google.com) containing non-standard
	 * meta-information about the error.
	 */
	public meta?: TMeta
	/**
	 * @alias `title`
	 */
	public get message() {
		return this.title!
	}
	public set message(value: string) {
		this.title = value
	}
	constructor(
		errorData: Partial<Omit<ResponseError, 'message' | 'name'>> = {},
	) {
		super()
		Object.assign(this, errorData)
		this.title = this.title || 'Sorry! Something went wrong. Try again.'
		this.code = `API_${this.code || 'UNKNOWN'}`
		this.detail = this.detail || `Please report error code: ${this.code}.`
	}
}
