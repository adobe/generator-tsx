import attemptAsync from './attemptAsync'

describe('attemptAsync', () => {
	const noopAsync = () => Promise.resolve()

	describe('when provided a function named "noopAsync"', () => {
		it('returns a function', () => {
			expect(typeof attemptAsync(noopAsync)).toBe('function')
		})

		it('returns a function named "attemptAsync(noopAsync)"', () => {
			expect(attemptAsync(noopAsync).name).toBe('attemptAsync(noopAsync)')
		})
	})

	describe('when provided an anonymous function', () => {
		it('returns a function named "attemptAsync()"', () => {
			const { name } = attemptAsync(() => Promise.resolve())

			expect(name).toBe('attemptAsync()')
		})
	})

	describe('when calling the result wrapper function', () => {
		it('resolves [wrapperResult] if original fn returns a value', async () => {
			const result = await attemptAsync(() => Promise.resolve(42))()

			expect(result).toEqual([42])
		})

		it('resolves [undefined, Error] if original fn throws an Error', async () => {
			const err = new Error('err')

			const result = await attemptAsync(() => Promise.reject(err))()

			expect(result).toEqual([undefined, err])
		})

		it('supports overriding type of original function', async () => {
			const result = await attemptAsync(noopAsync as (
				x: number,
			) => Promise<void>)(42)

			expect(result).toEqual([undefined])
		})

		it('supports defining + receiving the type of the thrown value', async () => {
			const [, reason] = await attemptAsync(rejectNumber)<number>()

			expect(reason as number).toBe(42)
		})

		/**
		 * @throws 42
		 */
		function rejectNumber() {
			return Promise.reject(42)
		}
	})
})
