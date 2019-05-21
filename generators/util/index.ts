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
					`src/utils/${filename.replace(/^foo/, parts.join('/'))}`,
				),
				{
					name,
				},
			)
		})
	}
}
