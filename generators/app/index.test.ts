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

describe('tsx:app', () => {
	it('creates files', async () => {
		await helpers.run(__dirname)
		assert.file(['package.json'])
	})

	it('creates files from args + prompts', async () => {
		await helpers
			.run(__dirname)
			.withArguments(['APP_NAME', '0.1.2'])
			.withPrompts({
				gitEmail: 'GIT_EMAIL',
				gitName: 'GIT_NAME',
				githubUsername: 'GITHUB_USERNAME',
			})
		assert.file(['package.json'])
	})

	it('creates files from args + options', async () => {
		await helpers
			.run(__dirname)
			.withArguments(['APP_NAME', '0.1.2'])
			.withOptions({
				gitEmail: 'GIT_EMAIL',
				gitName: 'GIT_NAME',
				githubUsername: 'GITHUB_USERNAME',
			})
		assert.file(['package.json'])
	})

	it('creates files from prompts', async () => {
		await helpers.run(__dirname).withPrompts({
			appname: 'APP_NAME',
			gitEmail: 'GIT_EMAIL',
			gitName: 'GIT_NAME',
			githubUsername: 'GITHUB_USERNAME',
			version: '0.1.2',
		})
		assert.file(['package.json'])
	})
})
