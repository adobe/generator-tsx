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
