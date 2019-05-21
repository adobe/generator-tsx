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

describe('tsx:translations', () => {
	it('copies locale file from en.json', async () => {
		const localeTag = 'zh-CN'
		await helpers
			.run(__dirname)
			.inTmpDir(dir => {
				fs.copySync(
					path.join(__dirname, './templates/en.json'),
					path.join(dir, 'src/translations/en.json'),
				)
			})
			.withArguments([localeTag])

		const expectedFiles = [`src/translations/${localeTag}.json`]
		for (const filename of expectedFiles) {
			assert.fileContent(
				filename,
				fs
					.readFileSync(
						path.join(__dirname, `./expected/${path.basename(filename)}`),
					)
					.toString(),
			)
		}
	})
})
