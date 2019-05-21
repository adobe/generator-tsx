/* eslint-env jest */
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'

describe('tsx:app', () => {
	it('creates files', async () => {
		await helpers.run(__dirname)
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
