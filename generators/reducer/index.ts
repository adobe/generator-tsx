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
import snakeCase from '@queso/snake-case'
import Generator from 'yeoman-generator'

import sentenceCase from '../utils'

export = class ReducerGenerator extends Generator {
	public options: {
		name: string
		subject?: string
		verb?: string
	} = {
		name: '',
	}

	public constructor(
		args: string | string[],
		opts: {
			name?: string
			subject?: string
			verb?: string
		},
	) {
		super(args, opts)
		this.options = { ...this.options, ...opts }
		if (!opts.name) {
			this.argument('name', { type: String })
		}
	}

	public initializing() {
		const { name, subject, verb } = this.options
		if (!subject || !verb) {
			this.composeWith('tsx:actions', {
				folder: name,
				scenarios: ['fetching data', 'setting state'],
			})
		}
	}

	public writing() {
		const { subject, verb } = this.options
		if (!subject || !verb) {
			return
		}
		const name = camelCase(this.options.name)
		const actionName = verb + sentenceCase(subject)
		;['index.ts', 'fooReducer.ts', 'fooReducer.test.ts'].forEach(filename => {
			this.fs.copyTpl(
				this.templatePath(`${verb}/${filename}`),
				this.destinationPath(
					`src/reducers/${name}/${filename.replace(/^foo/, name)}`,
				),
				{
					actionName,
					camelCase,
					name,
					sentenceCase,
					snakeCase,
					subject,
				},
			)
		})
	}
}
