import camelCase from '@queso/camel-case'
import snakeCase from '@queso/snake-case'
import Generator from 'yeoman-generator'

import sentenceCase from '../utils'

interface Answers extends Generator.Answers {
	model: string
}

export = class extends Generator {
	public options: {
		name?: string
	} = {}

	public answers: Answers = {
		model: 'Foo',
	}

	public constructor(args: string | string[], opts: { name: string }) {
		super(args, opts)
		if (opts.name) {
			this.options.name = opts.name
		} else {
			this.argument('name', { type: String, required: false })
		}
	}

	public async prompting() {
		if (this.options.name) {
			return
		}
		this.answers = (await this.prompt([
			{
				name: 'model',
				message: 'What model are you fetching?',
				default: this.answers.model,
				filter: fixModelPath,
			},
		])) as Answers
	}

	public configuring() {
		this.config.set(
			'model',
			splitModelPath(
				this.options.name
					? fixModelPath(this.options.name)
					: this.answers.model,
			),
		)
	}

	public writing() {
		const [name, modelPath] = this.config.get('model')
		this.fs.copyTpl(
			this.templatePath('Model.ts'),
			this.destinationPath(`src/models/${modelPath}.ts`),
			{
				name,
				sentenceCase,
				snakeCase,
			},
		)
	}

	public end() {
		this.config.delete('model')
	}
}

function splitModelPath(modelPath: string) {
	const parts = fixModelPath(modelPath).split('/')
	const name = parts[parts.length - 1]
	return [name, modelPath]
}

function fixModelPath(name: string) {
	const modelPath = name.split('/').map(camelCase)
	const fixedName = sentenceCase(modelPath[modelPath.length - 1])
	modelPath.splice(-1, 1, fixedName)
	return modelPath.join('/')
}
