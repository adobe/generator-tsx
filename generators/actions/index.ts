/*
Copyright 2019 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/
import camelCase from '@queso/camel-case'
import pick from '@queso/pick'
import snakeCase from '@queso/snake-case'
import Generator from 'yeoman-generator'

import sentenceCase from '../utils'

const scenarios = {
	'fetching data': 'fetch',
	'setting state': 'set',
	other: '',
}

interface Answers extends Generator.Answers {
	api: string
	scenario: keyof typeof scenarios
	subject: string
}

interface Options {
	folder: string
	scenarios: (keyof typeof scenarios)[]
}

export = class ActionsGenerator extends Generator {
	public options: Options = {
		folder: 'foo',
		scenarios: Object.keys(scenarios) as (keyof typeof scenarios)[],
	}

	private answers: Answers = {
		api: 'foo',
		scenario: 'fetching data',
		subject: 'foo',
	}

	public constructor(
		args: string | string[],
		opts: {
			folder?: string
			scenarios?: (keyof typeof scenarios)[]
		},
	) {
		super(args, opts)
		this.options = { ...this.options, ...opts }
		if (!opts.folder) {
			this.argument('folder', { type: String })
		}
	}

	public async prompting() {
		this.answers = await this.prompt([
			{
				type: 'list',
				name: 'scenario',
				message: 'Select a scenario',
				choices: Object.keys(pick(scenarios, ...this.options.scenarios)),
				default: this.answers.scenario,
			},
			{
				name: 'subject',
				message: 'What model are you fetching?',
				default: 'Foo',
				filter: sentenceCamelCase,
				when: answers => answers.scenario === 'fetching data',
			},
			{
				name: 'subject',
				message: 'What state are you setting?',
				default: 'foo',
				filter: camelCase,
				when: answers => answers.scenario === 'setting state',
			},
			{
				name: 'subject',
				message: 'Name of first action',
				default: 'foo',
				filter: camelCase,
				when: answers => answers.scenario === 'other',
			},
			{
				name: 'api',
				message: 'Name of API client',
				default: this.answers.api,
				filter: camelCase,
				when: answers => answers.scenario === 'fetching data',
			},
		])
	}

	public writing() {
		const folder = camelCase(this.options.folder)
		const { api, scenario, subject } = this.answers
		const verb = scenarios[scenario]
		const actionName = verb ? `${verb}${sentenceCamelCase(subject)}` : subject
		;[
			'index.ts',
			'fooActions.ts',
			'fooActions.test.ts',
			'fooActionTypes.ts',
		].forEach(filename => {
			this.fs.copyTpl(
				this.templatePath(`${verb || scenario}/${filename}`),
				this.destinationPath(
					`src/actions/${folder}/${filename.replace(/^foo/, folder)}`,
				),
				{
					api,
					actionName,
					camelCase,
					folder,
					sentenceCase,
					snakeCase,
					subject,
				},
			)
		})

		const index = this.destinationPath('src/actions/index.ts')
		this.fs.write(
			index,
			[
				`import { ${sentenceCase(
					folder,
				)}Actions } from './${folder}/${folder}ActionTypes'`,
				`${this.fs.read(index)}\t| ${sentenceCase(folder)}Actions\n`,
			].join('\n'),
		)

		switch (scenario) {
			case 'other':
				return
			case 'fetching data': {
				const apiClientPath = this.destinationPath(
					`src/api/${api}/index.ts`,
				)
				if (!this.fs.exists(apiClientPath)) {
					this.composeWith('tsx:api', {
						model: subject,
						name: api,
					})
				}
				break
			}
			case 'setting state': {
				const modelPath = this.destinationPath(
					`src/models/${sentenceCase(subject)}.ts`,
				)
				if (!this.fs.exists(modelPath)) {
					this.composeWith('tsx:model', { name: subject })
				}
				break
			}
		}

		const reducerPath = this.destinationPath(
			`src/reducers/${folder}/index.ts`,
		)
		if (!this.fs.exists(reducerPath)) {
			this.composeWith('tsx:reducer', { name: folder, subject, verb })
		}
	}
}

function sentenceCamelCase(value: string) {
	return sentenceCase(camelCase(value))
}
