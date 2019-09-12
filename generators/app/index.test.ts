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
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'

import AppGenerator = require('.')
import { Answers } from './inputs'

const baseOptions = {
	gitEmail: 'GIT_EMAIL',
	gitName: 'GIT_NAME',
	githubUsername: 'GITHUB_USERNAME',
	css: 'modules' as 'modules',
}

const baseAnswers = {
	...baseOptions,
	graphqlClient: false as false,
}

describe('tsx:app', () => {
	it('creates expected files from ALL args + relay, build options', async () => {
		await run({
			opts: {
				graphqlClient: 'relay',
				build: true,
			},
		})
		assert.file(['package.json', 'src/config/environment.ts'])
	})

	it('creates expected files from args + prompts (CSS Modules)', async () => {
		await run({ answers: { css: 'modules' } })
		assert.file(['package.json', 'src/components/Home/Home.module.css'])
	})

	it('creates expected files from args + prompts (Linaria)', async () => {
		await run({ answers: { css: 'linaria' } })
		assert.file([
			'package.json',
			'craco.config.js',
			'src/components/Layout/Layout.styles.ts',
		])
	})

	it('creates expected files from args + options (CSS Modules)', async () => {
		await run({ opts: { css: 'modules' } })
		assert.file(['package.json', 'src/components/Home/Home.module.css'])
	})

	it('creates expected files from args + options (Relay + Linaria)', async () => {
		await run({
			opts: {
				css: 'linaria',
				graphqlClient: 'relay',
			},
		})
		assert.file([
			'package.json',
			'server',
			'src/components/Layout/Layout.styles.ts',
			'src/config/environment.ts',
		])
	})

	it('filters graphqlClient "false" into `false`', async () => {
		await run({
			opts: {
				graphqlClient: 'false' as any,
			},
		})
		assert.noFile(['server'])
	})

	it('does not reject an invalid css option', async () => {
		const p = run({
			opts: {
				css: 'INVALID' as any,
			},
		})
		assert.equal(p.then, Promise.prototype.then)
		await assert.doesNotReject(p)
	})

	it('does not reject an empty githubUsername and version', async () => {
		const p = run({
			args: ['APP_NAME'],
			opts: {
				githubUsername: '',
				version: '',
			},
		})
		assert.equal(p.then, Promise.prototype.then)
		await assert.doesNotReject(p)
	})

	async function run({
		answers,
		args = ['APP_NAME', '0.1.2'],
		opts,
	}: {
		answers?: Partial<Answers>
		args?: ConstructorParameters<typeof AppGenerator>[0]
		opts?: ConstructorParameters<typeof AppGenerator>[1]
	} = {}) {
		let p = helpers.run(__dirname)
		if (args) {
			p = p.withArguments(args)
		}
		if (answers) {
			p = p.withPrompts({
				...baseAnswers,
				...answers,
			})
		}
		return p.withOptions({
			...(opts ? baseOptions : {}),
			...opts,
			__test__: true,
		})
	}
})
