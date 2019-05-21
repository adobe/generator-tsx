/* eslint-env jest */
import fs from 'fs-extra'
import * as path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'

describe('tsx:model', () => {
	it('creates a model via argument', async () => {
		await helpers.run(__dirname).withArguments(['Bar / Baz qux'])
		const expectedFiles = ['bar/BazQux.ts']
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/models', filename),
				fs
					.readFileSync(path.join(__dirname, `./expected/${filename}`))
					.toString(),
			)
		}
	})

	it('creates a model via options', async () => {
		await helpers.run(__dirname).withOptions({ name: 'Bar / Baz qux' })
		const expectedFiles = ['bar/BazQux.ts']
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/models', filename),
				fs
					.readFileSync(path.join(__dirname, `./expected/${filename}`))
					.toString(),
			)
		}
	})

	it('creates a model via prompt', async () => {
		await helpers.run(__dirname).withPrompts({ model: 'bar/BazQux' })
		const expectedFiles = ['bar/BazQux.ts']
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/models', filename),
				fs
					.readFileSync(path.join(__dirname, `./expected/${filename}`))
					.toString(),
			)
		}
	})
})
