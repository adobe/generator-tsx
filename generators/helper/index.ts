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
		name: string
	} = {
		name: '',
	}

	public constructor(args: string | string[], opts: {}) {
		super(args, opts)
		this.argument('name', { type: String })
	}

	public writing() {
		const parts = this.options.name.split('/').map(camelCase)
		const name = parts[parts.length - 1]
		;['foo.ts', 'foo.test.ts'].forEach(filename => {
			this.fs.copyTpl(
				this.templatePath(filename),
				this.destinationPath(
					`src/helpers/${filename.replace(/^foo/, parts.join('/'))}`,
				),
				{
					name,
				},
			)
		})
	}
}
