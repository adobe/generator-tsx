import Generator from 'yeoman-generator'

export = class extends Generator {
	public options: {
		localeTag?: string
	} = {}

	public constructor(args: string | string[], opts: {}) {
		super(args, opts)
		this.argument('localeTag', { type: String })
	}

	public writing() {
		this.fs.copy(
			this.destinationPath('src/translations/en.json'),
			this.destinationPath(
				`src/translations/${this.options.localeTag}.json`,
			),
		)
	}
}
