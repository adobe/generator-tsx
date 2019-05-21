/* eslint-env jest */
import fs from 'fs-extra'
import * as path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'

describe('tsx:component', () => {
	it('creates expected component files', async () => {
		await helpers.run(__dirname).withArguments(['Bar baz / qux quux'])

		const expectedFiles = [
			'barBaz/QuxQuux/index.ts',
			'barBaz/QuxQuux/QuxQuux.tsx',
			'barBaz/QuxQuux/QuxQuux.test.tsx',
			'barBaz/QuxQuux/QuxQuux.module.css',
		]
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/components', filename),
				fs
					.readFileSync(path.join(__dirname, `./expected/${filename}`))
					.toString(),
			)
		}
	})
})
