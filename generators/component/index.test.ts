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
	it('creates a CSS modules component', async () => {
		await helpers
			.run(__dirname)
			.withLocalConfig({
				promptValues: { css: 'modules' },
			})
			.withArguments(['Bar baz / qux quux'])

		const expectedFiles = [
			'barBaz/QuxQuux/index.ts',
			'~barBaz/QuxQuux/QuxQuux.tsx',
			'~barBaz/QuxQuux/QuxQuux.module.css',
			'barBaz/QuxQuux/QuxQuux.test.tsx',
		]
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/components', filename.replace(/^~/, '')),
				fs
					.readFileSync(
						path.join(
							__dirname,
							`./expected/${filename.replace(/^~/, '~modules/')}`,
						),
					)
					.toString(),
			)
		}
	})

	it('creates connected CSS modules component', async () => {
		await helpers
			.run(__dirname)
			.withLocalConfig({
				promptValues: { css: 'modules' },
			})
			.withArguments(['Bar baz / qux quux'])
			.withOptions({ connect: true })

		const expectedFiles = [
			'barBaz/QuxQuux/index.ts',
			'~barBaz/QuxQuux/QuxQuux.tsx',
			'~barBaz/QuxQuux/QuxQuux.module.css',
			'barBaz/QuxQuux/QuxQuux.test.tsx',
		]
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/components', filename.replace(/^~/, '')),
				fs
					.readFileSync(
						path.join(
							__dirname,
							`./expected/${filename.replace(
								/^~/,
								'~modules_connect/',
							)}`,
						),
					)
					.toString(),
			)
		}
	})

	it('creates a Linaria component', async () => {
		await helpers
			.run(__dirname)
			.withLocalConfig({
				promptValues: { css: 'linaria' },
			})
			.withArguments(['Bar baz / qux quux'])

		const expectedFiles = [
			'barBaz/QuxQuux/index.ts',
			'~barBaz/QuxQuux/QuxQuux.tsx',
			'barBaz/QuxQuux/QuxQuux.test.tsx',
		]
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/components', filename.replace(/^~/, '')),
				fs
					.readFileSync(
						path.join(
							__dirname,
							`./expected/${filename.replace(/^~/, '~linaria/')}`,
						),
					)
					.toString(),
			)
		}
	})

	it('creates connected Linaria component', async () => {
		await helpers
			.run(__dirname)
			.withLocalConfig({
				promptValues: { css: 'linaria' },
			})
			.withArguments(['Bar baz / qux quux'])
			.withOptions({ connect: true })

		const expectedFiles = [
			'barBaz/QuxQuux/index.ts',
			'~barBaz/QuxQuux/QuxQuux.tsx',
			'barBaz/QuxQuux/QuxQuux.test.tsx',
		]
		for (const filename of expectedFiles) {
			assert.fileContent(
				path.join('src/components', filename.replace(/^~/, '')),
				fs
					.readFileSync(
						path.join(
							__dirname,
							`./expected/${filename.replace(
								/^~/,
								`~linaria_connect/`,
							)}`,
						),
					)
					.toString(),
			)
		}
	})
})
