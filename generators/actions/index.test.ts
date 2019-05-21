/* eslint-env jest */
import fs from 'fs-extra'
import * as path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'

describe('tsx:actions', () => {
	it('creates expected action files for fetching data scenario', async () => {
		await helpers
			.run(__dirname)
			.inTmpDir(dir => {
				fs.copySync(
					path.join(__dirname, './templates/fetch/actions/index.ts'),
					path.join(dir, 'src/actions/index.ts'),
				)
			})
			.withGenerators([[helpers.createDummyGenerator(), 'tsx:api']])
			.withArguments(['Bar baz'])
			.withPrompts({
				api: 'fakeClient',
				scenario: 'fetching data',
				subject: 'FakeModel',
			})

		const expectedFiles = [
			'index.ts',
			'barBaz/index.ts',
			'barBaz/barBazActions.ts',
			'barBaz/barBazActions.test.ts',
			'barBaz/barBazActionTypes.ts',
		]
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/actions', filename),
				fs
					.readFileSync(
						path.join(
							__dirname,
							`./expected/${path.join('fetch', filename)}`,
						),
					)
					.toString(),
			)
		}
	})

	it('creates expected action files for fetching data with existing api', async () => {
		await helpers
			.run(__dirname)
			.inTmpDir(dir => {
				fs.copySync(
					path.join(__dirname, './templates/fetch/actions/index.ts'),
					path.join(dir, 'src/actions/index.ts'),
				)
				fs.outputFileSync(path.join(dir, 'src/api/fakeClient/index.ts'), '')
			})
			.withArguments(['Bar baz'])
			.withPrompts({
				api: 'fakeClient',
				scenario: 'fetching data',
				subject: 'FakeModel',
			})

		const expectedFiles = [
			'index.ts',
			'barBaz/index.ts',
			'barBaz/barBazActions.ts',
			'barBaz/barBazActions.test.ts',
			'barBaz/barBazActionTypes.ts',
		]
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/actions', filename),
				fs
					.readFileSync(
						path.join(
							__dirname,
							`./expected/${path.join('fetch', filename)}`,
						),
					)
					.toString(),
			)
		}
	})

	it('creates expected action files for setting state scenario', async () => {
		await helpers
			.run(__dirname)
			.inTmpDir(dir => {
				fs.copySync(
					path.join(__dirname, './templates/set/actions/index.ts'),
					path.join(dir, 'src/actions/index.ts'),
				)
			})
			.withGenerators([
				[helpers.createDummyGenerator(), 'tsx:model'],
				[helpers.createDummyGenerator(), 'tsx:reducer'],
			])
			.withArguments(['Bar baz'])
			.withPrompts({
				scenario: 'setting state',
				subject: 'fakeState',
			})

		const expectedFiles = [
			'index.ts',
			'barBaz/index.ts',
			'barBaz/barBazActions.ts',
			'barBaz/barBazActions.test.ts',
			'barBaz/barBazActionTypes.ts',
		]
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/actions', filename),
				fs
					.readFileSync(
						path.join(
							__dirname,
							`./expected/${path.join('set', filename)}`,
						),
					)
					.toString(),
			)
		}
	})

	it('creates expected action files for setting state with options scenario', async () => {
		await helpers
			.run(__dirname)
			.inTmpDir(dir => {
				fs.copySync(
					path.join(__dirname, './templates/set/actions/index.ts'),
					path.join(dir, 'src/actions/index.ts'),
				)
			})
			.withGenerators([
				[helpers.createDummyGenerator(), 'tsx:model'],
				[helpers.createDummyGenerator(), 'tsx:reducer'],
			])
			.withArguments(['Bar baz'])
			.withOptions({
				folder: 'barBaz',
				scenarios: ['fetching data', 'setting state'],
				skipReducer: true,
			})
			.withPrompts({
				scenario: 'setting state',
				subject: 'fakeState',
			})

		const expectedFiles = [
			'index.ts',
			'barBaz/index.ts',
			'barBaz/barBazActions.ts',
			'barBaz/barBazActions.test.ts',
			'barBaz/barBazActionTypes.ts',
		]
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/actions', filename),
				fs
					.readFileSync(
						path.join(
							__dirname,
							`./expected/${path.join('set', filename)}`,
						),
					)
					.toString(),
			)
		}
	})

	it('creates expected action files for setting state with existing model and reducer', async () => {
		await helpers
			.run(__dirname)
			.inTmpDir(dir => {
				fs.copySync(
					path.join(__dirname, './templates/set/actions/index.ts'),
					path.join(dir, 'src/actions/index.ts'),
				)
				fs.outputFileSync(path.join(dir, 'src/models/FakeState.ts'), '')
				fs.outputFileSync(
					path.join(dir, 'src/reducers/barBaz/index.ts'),
					'',
				)
			})
			.withArguments(['Bar baz'])
			.withPrompts({
				scenario: 'setting state',
				subject: 'fakeState',
			})

		const expectedFiles = [
			'index.ts',
			'barBaz/index.ts',
			'barBaz/barBazActions.ts',
			'barBaz/barBazActions.test.ts',
			'barBaz/barBazActionTypes.ts',
		]
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/actions', filename),
				fs
					.readFileSync(
						path.join(
							__dirname,
							`./expected/${path.join('set', filename)}`,
						),
					)
					.toString(),
			)
		}
	})

	it('creates expected action files for other scenario', async () => {
		const scenario = 'other'
		await helpers
			.run(__dirname)
			.inTmpDir(dir => {
				fs.copySync(
					path.join(__dirname, './templates/other/actions/index.ts'),
					path.join(dir, 'src/actions/index.ts'),
				)
			})
			.withArguments(['Bar baz'])
			.withPrompts({
				scenario,
				subject: 'quxQuux',
			})

		const expectedFiles = [
			'index.ts',
			'barBaz/index.ts',
			'barBaz/barBazActions.ts',
			'barBaz/barBazActions.test.ts',
			'barBaz/barBazActionTypes.ts',
		]
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/actions', filename),
				fs
					.readFileSync(
						path.join(
							__dirname,
							`./expected/${path.join(scenario, filename)}`,
						),
					)
					.toString(),
			)
		}
	})
})
