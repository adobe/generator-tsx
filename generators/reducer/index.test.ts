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

describe('tsx:reducer', () => {
	it('writes no files if options are not supplied', async () => {
		await helpers
			.run(__dirname)
			.withGenerators([[helpers.createDummyGenerator(), 'tsx:actions']])
			.withArguments(['Bar baz'])

		const nonExpectedFiles = [
			'barBaz/index.ts',
			'barBaz/barBazReducer.ts',
			'barBaz/barBazReducer.test.ts',
		]
		for (const filename of nonExpectedFiles) {
			assert.noFile(path.join('src/reducers', filename))
		}
	})

	it('creates expected reducer files for fetching scenario', async () => {
		const verb = 'fetch'
		await helpers.run(__dirname).withOptions({
			name: 'barBaz',
			subject: 'FakeModel',
			verb,
		})

		const expectedFiles = [
			'barBaz/index.ts',
			'barBaz/barBazReducer.ts',
			'barBaz/barBazReducer.test.ts',
		]
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/reducers', filename),
				fs
					.readFileSync(
						path.join(
							__dirname,
							`./expected/${path.join(verb, filename)}`,
						),
					)
					.toString(),
			)
		}
	})

	it('creates expected reducer files for setting state scenario', async () => {
		const verb = 'set'
		await helpers.run(__dirname).withOptions({
			name: 'barBaz',
			subject: 'fakeState',
			verb: 'set',
		})

		const expectedFiles = [
			'barBaz/index.ts',
			'barBaz/barBazReducer.ts',
			'barBaz/barBazReducer.test.ts',
		]
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/reducers', filename),
				fs
					.readFileSync(
						path.join(
							__dirname,
							`./expected/${path.join(verb, filename)}`,
						),
					)
					.toString(),
			)
		}
	})
})
