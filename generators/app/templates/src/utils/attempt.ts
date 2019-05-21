/**
 * Wraps a function in a try...catch.
 *
 * @category Util
 * @returns A new function that wraps the original function in a try...catch.
 * @example
```ts
const add = (x: number, y: number) => x + y
attempt(add)(1, 2)
// => [3]

const throws = () => { throw new Error() }
attempt(throws)()
// => [undefined, Error]
```
 */
export default function attempt<TFunc extends (...args: any[]) => any>(
	/**
	 * The function to wrap in a try...catch.
	 */
	func: TFunc,
) {
	return Object.defineProperty(wrapper, 'name', {
		value: `attempt(${func.name})`,
		configurable: true,
	}) as typeof wrapper
	/**
	 * This is a wrapper function provided by `attempt`, which calls
	 * the original function inside of a try...catch.
	 */
	function wrapper<TReason = Error>(
		...args: Parameters<TFunc>
	): [ReturnType<TFunc>?, TReason?] {
		try {
			return [func(...args)]
		} catch (reason) {
			return [, reason]
		}
	}
}
