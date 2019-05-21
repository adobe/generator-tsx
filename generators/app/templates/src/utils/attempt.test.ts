import attempt from './attempt'

describe('attempt', () => {
	const noop = () => {}

	describe('when provided a function named "noop"', () => {
		it('returns a function', () => {
			expect(typeof attempt(noop)).toBe('function')
		})

		it('returns a function named "attempt(noop)"', () => {
			expect(attempt(noop).name).toBe('attempt(noop)')
		})
	})

	describe('when provided an anonymous function', () => {
		it('returns a function named "attempt()"', () => {
			expect(attempt(() => {}).name).toBe('attempt()')
		})
	})

	describe('when calling the result wrapper function', () => {
		it('returns [wrapperResult] if original fn returns a value', () => {
			expect(attempt(() => 42)()).toEqual([42])
		})

		it('returns [undefined, Error] if original fn throws an Error', () => {
			const err = new Error('err')

			const result = attempt(() => {
				throw err
			})()

			expect(result).toEqual([undefined, err])
		})

		it('supports overriding type of original function', () => {
			const result = attempt<(x: number) => void>(noop)

			expect(result(42)).toEqual([undefined])
		})

		it('supports defining + receiving the type of the thrown value', () => {
			const [, reason] = attempt(throwNumber)<number>()

			expect(reason as number).toBe(42)
		})

		/**
		 * @throws 42
		 */
		function throwNumber(): never {
			throw 42
		}
	})
})
