import camelCase from '@queso/camel-case'
import Generator from 'yeoman-generator'

import sentenceCase from '../utils'

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
		const name = sentenceCase(parts[parts.length - 1])
		parts.splice(-1, 1, name)
		;['index.ts', 'Foo.tsx', 'Foo.test.tsx', 'Foo.module.css'].forEach(
			filename => {
				this.fs.copyTpl(
					this.templatePath(filename),
					this.destinationPath(
						`src/components/${parts.join('/')}/${filename.replace(
							/^Foo/,
							name,
						)}`,
					),
					{
						name,
					},
				)
			},
		)
	}
}
