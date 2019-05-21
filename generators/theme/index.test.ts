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

describe('tsx:theme', () => {
	it('creates expected theme files', async () => {
		await helpers
			.run(__dirname)
			.inTmpDir(dir => {
				fs.copySync(
					path.join(__dirname, './templates/Theme.ts'),
					path.join(dir, 'src/models/Theme.ts'),
				)
			})
			.withArguments(['Bar baz / Dragon fire'])

		const expectedFiles = [
			'barBaz/dragonFire/index.ts',
			'barBaz/dragonFire/dragonFireTheme.ts',
		]
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/themes', filename),
				fs
					.readFileSync(path.join(__dirname, `./expected/${filename}`))
					.toString(),
			)
		}
	})
})
