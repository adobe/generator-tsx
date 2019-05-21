/*
Copyright 2019 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/
/* eslint-env jest */
import fs from 'fs-extra'
import * as path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'

describe('tsx:api', () => {
	it('creates expected API client files', async () => {
		await helpers
			.run(__dirname)
			.withGenerators([[helpers.createDummyGenerator(), 'tsx:model']])
			.withArguments(['Bar / Baz qux'])
			.withOptions({ model: 'BazQux' })

		const expectedFiles = [
			'bar/bazQux/index.ts',
			'bar/bazQux/bazQuxAPI.ts',
			'bar/bazQux/bazQuxAPI.test.ts',
		]
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/api', filename),
				fs
					.readFileSync(path.join(__dirname, `./expected/${filename}`))
					.toString(),
			)
		}
	})

	it('creates expected API client files via options', async () => {
		await helpers
			.run(__dirname)
			.withGenerators([[helpers.createDummyGenerator(), 'tsx:model']])
			.withOptions({ model: 'BazQux', name: 'bar/bazQux' })

		const expectedFiles = [
			'bar/bazQux/index.ts',
			'bar/bazQux/bazQuxAPI.ts',
			'bar/bazQux/bazQuxAPI.test.ts',
		]
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/api', filename),
				fs
					.readFileSync(path.join(__dirname, `./expected/${filename}`))
					.toString(),
			)
		}
	})

	it('writes no files if options are not provides', async () => {
		await helpers.run(__dirname).withArguments(['Bar / Baz qux'])

		const nonExpectedFiles = [
			'bar/bazQux/index.ts',
			'bar/bazQux/bazQuxAPI.ts',
			'bar/bazQux/bazQuxAPI.test.ts',
		]
		for (const filename of nonExpectedFiles) {
			assert.noFile(path.join('src/api', filename))
		}
	})
})
