import ThemeContext from 'react-theme-context'

import dark from './dark'

/**
 * A singleton class for storing the app ThemeContext.
 */
export default class AppTheme {
	private static _context: ThemeContext<typeof dark>
	/* istanbul ignore next */
	private constructor() {}
	public static context(initialTheme = dark) {
		return this._context || (this._context = new ThemeContext(initialTheme))
	}
}
