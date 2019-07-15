import loadable from '@loadable/component'
import React, { FC, ReactElement } from 'react'
import Helmet from 'react-helmet'
import { addLocaleData, IntlProvider } from 'react-intl'
import { Route, Switch } from 'react-router-dom'

import Layout from 'components/Layout'
import { routes as localeRoutes } from 'components/LocalesMenu'
import { routes as navRoutes } from 'components/Nav'
import { joinRoutePaths } from 'helpers/string'
import Locale from 'models/Locale'

const Routes: FC = () => {
	return (
		<Switch>
			{localeRoutes.reduce(
				(allRoutes, { locale, path: localePath }) => {
					allRoutes.push(
						...navRoutes.map(({ Component, path: relativePath }) => {
							const path = joinRoutePaths(localePath, relativePath)
							return (
								<Route exact key={path} path={path}>
									<AsyncIntlProvider locale={locale}>
										<Layout localePath={localePath}>
											{locale && (
												<Helmet htmlAttributes={{ lang: locale }} />
											)}
											<Component />
										</Layout>
									</AsyncIntlProvider>
								</Route>
							)
						}),
					)
					return allRoutes
				},
				[] as ReactElement[],
			)}
			<Route component={AsyncNotFound} />
		</Switch>
	)
}

const AsyncIntlProvider = loadable<{ locale?: Locale }>(
	async ({ locale }) => {
		if (!locale) {
			return ({ children }) => <>{children}</>
		}
		const [{ default: localeData }, messages] = await Promise.all([
			import(`react-intl/locale-data/${locale.split('-')[0]}`),
			import(`translations/${locale}.json`),
		])
		addLocaleData(localeData)
		return ({ children }) => (
			<IntlProvider defaultLocale="en" {...{ children, locale, messages }} />
		)
	},
	{
		fallback: <>Loading locale...</>,
	},
)

const AsyncNotFound = loadable(async () => {
	const { default: NotFound } = await import('../NotFound')
	return () => (
		<Layout>
			<NotFound />
		</Layout>
	)
})

export default Routes
