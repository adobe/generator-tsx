/*
Copyright 2019 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/
import chalk from 'chalk'
import Generator from 'yeoman-generator'
import yosay from 'yosay'

interface Answers extends Generator.Answers {
	appname: string
	gitEmail: string
	gitName: string
	githubUsername: string
	version: string
}

export = class extends Generator {
	private answers = {} as Answers

	public async prompting() {
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

		let githubUsername: string
		try {
			githubUsername = await this.user.github.username()
		} catch (err) {
			/* istanbul ignore next */
			githubUsername = ''
		}

		this.answers = await this.prompt([
			{
				name: 'appname',
				message: 'project name',
				default: this.appname,
			},
			{
				name: 'version',
				message: 'version',
				default: '0.0.0',
			},
			{
				name: 'githubUsername',
				message: 'GitHub username',
				default: githubUsername,
				store: true,
			},
			{
				name: 'gitName',
				message: 'Your name (public)',
				default: await this.user.git.name(),
				store: true,
			},
			{
				name: 'gitEmail',
				message: 'Your email (public)',
				default: await this.user.git.email(),
				store: true,
			},
		])
	}

	public configuring() {
		;[
			'.vscode',
			'.editorconfig',
			'_gitignore',
			'.gqlconfig',
			'.markdownlint.json',
			'.prettierignore',
			'.travis.yml',
			'.watchmanconfig',
			'codegen.yml',
			'config',
			'tsconfig.json',
		].forEach(filename => {
			this.fs.copy(
				this.templatePath(filename),
				this.destinationPath(filename.replace(/^_/, '.')),
			)
		})
	}

	public writing() {
		;['public', 'server', 'src', 'package.json', 'README.md'].forEach(
			filename => {
				this.fs.copyTpl(
					this.templatePath(filename),
					this.destinationPath(filename),
					this.answers,
				)
			},
		)
	}

	public install() {
		this.npmInstall(
			[
				'@loadable/component@^5',
				'@queso/camel-case@^0',
				'@queso/kebab-case@^1',
				'babel-plugin-relay@5',
				'immutability-helper@^3',
				'ky@^0',
				'ky-universal@^0',
				'pathjoin@^0',
				'react@^16',
				'react-dom@^16',
				'react-helmet@^5',
				'react-intl@^2',
				'react-redux@^7',
				'react-relay@5',
				'react-router-dom@^5',
				'react-theme-context@^2',
				'redux@^4',
				'redux-thunk@^2',
			],
			{
				save: true,
			},
		)
		this.npmInstall(
			[
				'@craco/craco@5',
				'@graphql-codegen/cli@1',
				'@graphql-codegen/introspection@1',
				'@graphql-codegen/typescript@1',
				'@graphql-codegen/typescript-graphql-files-modules@1',
				'@graphql-codegen/typescript-operations@1',
				'@graphql-codegen/typescript-resolvers@1',
				'@jedmao/redux-mock-store@^2',
				'@jedmao/storage@^2',
				'@jedmao/tsconfig',
				'@playlyfe/gql@2',
				'@testing-library/react@8',
				'@types/fetch-mock@^7',
				'@types/graphql@14',
				'@types/jest@^24',
				'@types/loadable__component@^5',
				'@types/node@^12',
				'@types/react@^16',
				'@types/react-dom@^16',
				'@types/react-helmet@^5',
				'@types/react-intl@^2',
				'@types/react-redux@^7',
				'@types/react-relay@5',
				'@types/react-router-dom@^4',
				'@types/redux-logger@^3',
				'@types/redux-mock-store@^1',
				'@types/webpack-env@^1',
				'concurrently@4',
				'core-js@2', // TODO: https://github.com/callstack/linaria/issues/420
				'fetch-mock@^7',
				'graphql@14',
				'graphql-tag-pluck@^0',
				'husky@^3',
				'jest-fetch-mock@^2',
				'linaria@1',
				'lint-staged@^9',
				'prettier@^1',
				'react-scripts@^3',
				'redux-devtools-extension@^2',
				'redux-logger@^3',
				'relay-compiler@5',
				'relay-compiler-language-typescript@4',
				'relay-test-utils@5',
				'rimraf@^2',
				'ts-essentials@^3',
				'ts-helpers@1',
				'typescript@^3',
			],
			{
				'save-dev': true,
			},
		)
		this.spawnCommandSync('npm', ['run', 'postinstall'])
	}
}
