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
			'.gitignore',
			'.markdownlint.json',
			'.travis.yml',
			'config',
			'tsconfig.json',
		].forEach(filename => {
			this.fs.copy(
				this.templatePath(filename),
				this.destinationPath(filename),
			)
		})
	}

	public writing() {
		;['public', 'src', 'package.json', 'README.md'].forEach(filename => {
			this.fs.copyTpl(
				this.templatePath(filename),
				this.destinationPath(filename),
				this.answers,
			)
		})
	}

	public install() {
		this.npmInstall(
			[
				'@queso/kebab-case@^1',
				'immutability-helper@^3',
				'react@^16',
				'react-dom@^16',
				'react-helmet@^5',
				'react-intl@^2',
				'react-redux@^7',
				'react-router-dom@^5',
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
				'@jedmao/tsconfig',
				'@types/fetch-mock@^7',
				'@types/jest@^24',
				'@types/node@^12',
				'@types/react@^16',
				'@types/react-dom@^16',
				'@types/react-helmet@^5',
				'@types/react-intl@^2',
				'@types/react-redux@^7',
				'@types/react-router-dom@^4',
				'@types/redux-logger@^3',
				'@types/redux-mock-store@^1',
				'@types/webpack-env@^1',
				// TODO: https://github.com/callstack/linaria/issues/420
				'core-js@2',
				'fetch-mock@^7',
				'husky@^2',
				'jest-fetch-mock@^2',
				'linaria@1',
				'lint-staged@^8',
				'prettier@^1',
				'react-scripts@^3',
				'react-testing-library@^7',
				'redux-devtools-extension@^2',
				'redux-logger@^3',
				'redux-mock-store@^1',
				'rimraf@^2',
				'ts-essentials@^2',
				'typescript@^3',
			],
			{
				'save-dev': true,
			},
		)
	}
}
