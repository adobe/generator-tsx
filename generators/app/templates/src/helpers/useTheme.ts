import kebabCase from '@queso/kebab-case'
import { useLayoutEffect } from 'react'

import Theme from 'models/Theme'

export default function useTheme(theme: Theme) {
	useLayoutEffect(() => {
		for (const key in theme) {
			document.documentElement.style.setProperty(
				`--${kebabCase(key)}`,
				theme[key as keyof Theme],
			)
		}
	}, [theme])
}
