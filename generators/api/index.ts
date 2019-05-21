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
import Generator from 'yeoman-generator'

export = class extends Generator {
	public options: {
		model?: string
		name: string
	} = {
		name: '',
	}

	public constructor(
		args: string | string[],
		opts: {
			model?: string
			name?: string
		},
	) {
		super(args, opts)
		this.options = { ...this.options, ...opts }
		if (!opts.name) {
			this.argument('name', { type: String })
		}
	}

	public initializing() {
		if (this.options.model) {
			this.composeWith('tsx:model', {
				name: this.options.model,
			})
		}
	}

	public writing() {
		const { model } = this.options
		if (!this.options.model) {
			return
		}
		const apiPath = this.options.name.split('/').map(camelCase)
		const name = apiPath[apiPath.length - 1]
		;['index.ts', 'fooAPI.ts', 'fooAPI.test.ts'].forEach(filename => {
			this.fs.copyTpl(
				this.templatePath(filename),
				this.destinationPath(
					`src/api/${apiPath.join('/')}/${filename.replace(/^foo/, name)}`,
				),
				{
					camelCase,
					model,
					name,
				},
			)
		})
	}
}
