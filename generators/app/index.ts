/*
Copyright 2019 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/
import pickBy from '@queso/pick-by'
import chalk from 'chalk'
import globby from 'globby'
import { join } from 'path'
import Generator from 'yeoman-generator'
import yosay from 'yosay'

import inputs, { Answers } from './inputs'

import pkgRelayLinaria from './templates/package.relay.linaria.json'
import pkgRelayModules from './templates/package.relay.modules.json'

type Options = Partial<
	Answers & {
		build: boolean
	}
>

export = class AppGenerator extends Generator {
	protected answers = {} as Answers
	public options: Options = {}

	public constructor(args: string | string[], opts: Options) {
		super(args, opts)
		this.options.namespace = 'tsx'
		this._setupArguments()
		this._setupOptions()
	}

	public async prompting() {
		inputs.forEach(({ name, type = '', filter, validationError, store }) => {
			const value = filter ? filter(this.options[name]) : this.options[name]
			this.options[name] = value
			let valid = true
			if (Array.isArray(type)) {
				if (type.indexOf(value) === -1) {
					this._error(
						new TypeError(
							`${name} is not one of ${this._formatType(type)}`,
						),
					)
					valid = false
				}
			} else if (validationError && type.constructor !== Boolean && !value) {
				this._error(new Error(validationError))
				valid = false
			}
			if (!valid) {
				this.options[name] = undefined
			} else if (store && value !== null) {
				this.config.set('promptValues', {
					...this.config.get('promptValues'),
					[name]: value,
				})
			}
		})

		const remaining = inputs.filter(
			x => typeof this.options[x.name] === 'undefined',
		)
		if (!remaining.length) {
			return
		}

		this._welcome()

		try {
			const githubUsername = await this.user.github.username()
			/* istanbul ignore next */
			const input = remaining.find(x => x.name === 'githubUsername')
			/* istanbul ignore next */
			if (githubUsername && input) {
				input.default = githubUsername
			}
		} catch (err) {
			// noop
		}

		this.answers = await this.prompt(
			remaining.map(
				({
					choices,
					default: _default,
					description,
					filter,
					name,
					store,
					type = '',
					validationError,
					when,
				}) =>
					({
						default:
							typeof _default === 'function'
								? (_default as (this: Generator) => unknown).call(this)
								: _default,
						...pickBy({
							type: choices
								? 'list'
								: type.constructor === Boolean
								? 'confirm'
								: '',
							name,
							choices,
							filter,
							store,
							message: description,
							validate:
								validationError && filter
									? /* istanbul ignore next */
									  (raw: string) => !!filter(raw) || validationError
									: choices &&
									  /* istanbul ignore next */
									  ((raw: string) =>
											/* istanbul ignore next */
											(choices as string[]).indexOf(raw) !== -1 ||
											`${name} must be one of ${this._formatType(
												type,
											)}`),
							when: when ? when.call(this) : !this.options[name],
						}),
					} as Generator.Question<Answers>),
			),
		)
	}

	public configuring() {
		const optionsPlusAnswers = { ...this.options, ...this.answers }
		const { graphqlClient } = optionsPlusAnswers
		const files = [
			'_redirects',
			'.vscode',
			'.editorconfig',
			'.github',
			'__gitignore',
			'.prettierignore',
			'.watchmanconfig',
			'craco.config.js',
			'tsconfig.json',
			...(graphqlClient === 'relay' ? ['.gqlconfig', 'codegen.yml'] : []),
		].filter(Boolean) as string[]
		files.forEach(filename => {
			this.fs.copy(
				this.templatePath(filename),
				this.destinationPath(filename.replace(/^__/, '.')),
				optionsPlusAnswers,
			)
		})
	}

	public async writing() {
		const optionsPlusAnswers = { ...this.options, ...this.answers }
		const { css, graphqlClient } = optionsPlusAnswers
		/* istanbul ignore if */
		if (!css) {
			return
		}
		const files = [
			'public',
			'src',
			'README.md',
			graphqlClient && 'server',
			...(await resolveTildePath(css)),
			...(await resolveTildePath(graphqlClient)),
			...(await resolveTildePath(graphqlClient, css)),
		].filter(Boolean) as string[]

		async function resolveTildePath(...args: (string | false)[]) {
			return globby(join(`~${args.filter(Boolean).join('_')}`, '**'), {
				cwd: join(__dirname, 'templates'),
			})
		}

		files.forEach(filename => {
			this.fs.copyTpl(
				this.templatePath(filename),
				this.destinationPath(
					filename[0] === '~'
						? filename.replace(/^~[^/]+\//, '')
						: filename,
				),
				optionsPlusAnswers,
			)
		})
		const pkg = this.destinationPath('package.json')
		this.fs.copyTpl(
			this.templatePath('package.base.json'),
			pkg,
			optionsPlusAnswers,
		)
		if (css === 'linaria') {
			if (graphqlClient === 'relay') {
				this.fs.extendJSON(pkg, pkgRelayLinaria)
			}
			this.fs.delete(
				this.destinationPath('src/components/Layout/Layout.css'),
			)
		} else if (graphqlClient === 'relay') {
			this.fs.extendJSON(pkg, pkgRelayModules)
		}
	}

	public install() {
		const { css, graphqlClient } = { ...this.options, ...this.answers }
		const deps = [
			'@loadable/component@^5',
			'@queso/camel-case@^0',
			'@queso/kebab-case@^1',
			'@reach/router@^1',
			'full-icu@^1',
			'immer@^4',
			'ky@^0',
			'ky-universal@^0',
			'pathjoin@^0',
			'react@^16',
			'react-dom@^16',
			'react-helmet-async@^1',
			'react-intl@^3',
			'react-redux@^7',
			'react-theme-context@^2',
			'redux@^4',
			'redux-thunk@^2',
			'tslib@^1',
		]
		if (graphqlClient === 'relay') {
			deps.push(...['babel-plugin-relay@^5', 'react-relay@^5'])
		}
		this.spawnCommandSync('git', ['init', '--quiet'])
		this.npmInstall(deps, {
			save: true,
		})
		const devDeps = [
			'@craco/craco@^5',
			'@jedmao/redux-mock-store@^2',
			'@jedmao/storage@^2',
			'@jedmao/tsconfig',
			'@testing-library/react@^9',
			'@types/fetch-mock@^7',
			'@types/jest@^24',
			'@types/loadable__component@^5',
			'@types/node@^12',
			'@types/reach__router@^1',
			'@types/react@^16',
			'@types/react-dom@^16',
			'@types/react-redux@^7',
			'@types/react-router-dom@^4',
			'@types/redux-logger@^3',
			'@types/webpack-env@^1',
			'concurrently@^4',
			'cross-env@^5',
			'fetch-mock@^7',
			'husky@^3',
			'jest-fetch-mock@^2',
			'lint-staged@^9',
			'prettier@^1',
			'react-scripts@^3',
			'redux-devtools-extension@^2',
			'redux-logger@^3',
			'rimraf@^3',
			'ts-essentials@^3',
			'typescript@^3',
		]
		if (graphqlClient === 'relay') {
			devDeps.push(
				...[
					'@graphql-codegen/cli@^1',
					'@graphql-codegen/introspection@^1',
					'@graphql-codegen/typescript@^1',
					'@graphql-codegen/typescript-graphql-files-modules@^1',
					'@graphql-codegen/typescript-operations@^1',
					'@graphql-codegen/typescript-resolvers@^1',
					'@playlyfe/gql@^2',
					'@types/graphql@^14',
					'@types/react-relay@^5',
					'graphql@^14',
					'graphql-tag-pluck@^0',
					'relay-compiler@^5',
					'relay-compiler-language-typescript@^4',
					'relay-test-utils@^5',
				],
			)
		}
		if (css === 'linaria') {
			devDeps.push(
				...[
					'core-js@^2', // TODO: https://github.com/callstack/linaria/issues/420
					'craco-linaria@^1',
					'linaria@^1',
				],
			)
		}
		this.npmInstall(devDeps, {
			'save-dev': true,
		})
	}

	public end() {
		/* istanbul ignore if */
		if (!this.options.__test__) {
			const optionsPlusAnswers = { ...this.options, ...this.answers }
			this.spawnCommandSync('npm', ['install', '--package-lock-only'])
			if (optionsPlusAnswers.graphqlClient === 'relay') {
				this.spawnCommandSync('npm', ['run', 'postinstall'])
			}
			if (optionsPlusAnswers.build) {
				this.spawnCommand('npm', ['run', 'build'])
			}
		}
	}

	private _setupArguments() {
		inputs
			.filter(x => 'required' in x)
			.forEach(({ name, type = '', description, required }) => {
				this.argument(name, {
					type: type.constructor as Generator.ArgumentConfig['type'],
					description,
					required,
				})
			})
	}

	private _setupOptions() {
		this.option('__test__', {
			type: Boolean,
			hide: true,
		})
		inputs
			.filter(x => !('required' in x))
			.forEach(({ alias, choices, description, name, type = '' }) => {
				this.option(
					name,
					pickBy({
						type: Array.isArray(type)
							? String
							: (type.constructor as Generator.OptionConfig['type']),
						alias,
						description:
							description && choices
								? `${description} ${this._formatType(type)}`
								: description,
					}),
				)
			})
	}

	private _error(error: Error) {
		this.log(chalk.red(error.toString()))
	}

	private _formatType(value: string | boolean | string[]) {
		return `[${(value as string[]).join('|')}]`
	}

	private _welcome() {
		this.log(yosay(`Welcome to the tiptop ${chalk.red('tsx')} generator!`))

		this.log(
			[
				chalk.red('CRA'),
				chalk.magenta('TypeScript'),
				chalk.yellow('React'),
				chalk.green('Redux'),
				chalk.cyan('Router'),
				chalk.blue('Testing Library'),
			].join(' + '),
		)

		this.log()
	}
}
