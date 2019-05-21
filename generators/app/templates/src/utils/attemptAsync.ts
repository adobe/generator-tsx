/**
 * Wraps an async function in a try...catch.
 *
 * @category Util
 * @returns A new function that wraps the original function in a try...catch.
 * @example
```ts
const add = (x: number, y: number) => Promise.resolve(x + y)
await attemptAsync(add)(1, 2)
// => [3]

const rejects = () => Promise.reject(new Error())
attemptAsync(rejects)()
// => [undefined, Error]
```
 */
export default function attemptAsync<
	TFunc extends (...args: any[]) => Promise<TResult>,
	TResult extends any = any
>(
	/**
	 * The function to wrap in a try...catch.
	 */
	func: TFunc,
) {
	return Object.defineProperty(wrapper, 'name', {
		value: `attemptAsync(${func.name})`,
		configurable: true,
	}) as typeof wrapper
	/**
	 * This is a wrapper function provided by `attemptAsync`, which calls
	 * the original function inside of a try...catch.
	 */
	async function wrapper<TReason = Error>(...args: Parameters<TFunc>) {
		try {
			return [await func(...args)] as [TResult]
		} catch (reason) {
			return [, reason as TReason] as [void, TReason]
		}
	}
}
