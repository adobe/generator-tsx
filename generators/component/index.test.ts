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

describe('tsx:component', () => {
	it('creates expected component files', async () => {
		await helpers.run(__dirname).withArguments(['Bar baz / qux quux'])

		const expectedFiles = [
			'barBaz/QuxQuux/index.ts',
			'barBaz/QuxQuux/QuxQuux.tsx',
			'barBaz/QuxQuux/QuxQuux.test.tsx',
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
