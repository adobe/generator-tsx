/* eslint-env jest */
import fs from 'fs-extra'
import * as path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'

describe('tsx:helper', () => {
	it('creates an empty helper function', async () => {
		await helpers.run(__dirname).withArguments(['Bar baz / Qux quux'])

		const expectedFiles = ['barBaz/quxQuux.ts']
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/helpers', filename),
				fs
					.readFileSync(path.join(__dirname, `./expected/${filename}`))
					.toString(),
			)
		}
	})
})
