/*
Copyright 2019 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/
import { ListQuestion } from 'inquirer'
import semver from 'semver'
import Generator from 'yeoman-generator'

export interface Answers extends Generator.Answers {
	appname: string
	gitEmail: string
	gitName: string
	githubUsername: string
	version: string
	graphqlClient: 'relay' | false
	css: 'linaria' | 'modules'
}

interface Input<T = string>
	extends Omit<Generator.ArgumentConfig, 'type'>,
		Omit<Generator.OptionConfig, 'type'> {
	choices?: ListQuestion<Answers>['choices']
	default?: T | ((this: Generator) => T)
	filter?: (raw: string) => T
	name: string
	store?: true
	type: boolean | string | string[]
	validationError?: string
	when?: (this: Generator) => (answers?: Answers) => boolean
}

export default [
	{
		name: 'appname',
		description: 'project name',
		required: false,
		/* istanbul ignore next */
		default(this) {
			return this.appname
		},
	} as Input,
	{
		name: 'version',
		alias: 'v',
		default: '0.0.0',
		required: false,
		filter: raw => semver.clean(raw) || '',
		validationError: 'Invalid version format. Expected semver (e.g., 1.2.3).',
	} as Input,
	{
		name: 'githubUsername',
		alias: 'u',
		description: 'GitHub username',
		when(this) {
			return () => !this.options.githubUsername
		},
	} as Input,
	{
		name: 'gitName',
		alias: 'n',
		description: 'Your name (public)',
		default(this) {
			return this.user.git.name()
		},
	} as Input,
	{
		name: 'gitEmail',
		alias: 'e',
		description: 'Your email (public)',
		default(this) {
			return this.user.git.email()
		},
	} as Input,
	{
		type: ['modules', 'linaria'],
		name: 'css',
		alias: 'c',
		description: 'CSS strategy',
		choices: [
			{
				name: 'Linaria - zero-runtime CSS in JS library',
				short: 'Linaria',
				value: 'linaria',
				extra: 'zero-runtime CSS in JS library',
				checked: true,
			},
			{ name: 'CSS Modules', value: 'modules' },
		],
		store: true,
	} as Input<Answers['css']>,
	{
		type: ['relay', false],
		name: 'graphqlClient',
		alias: 'gc',
		description: 'GraphQL strategy',
		choices: [
			{ name: 'No GraphQL', value: false, checked: true },
			{ name: 'GraphQL with Relay Client', value: 'relay' },
			{
				name: 'GraphQL with Apollo Client',
				value: 'apollo',
				disabled: 'not implemented',
			},
		],
		filter: x => (x === 'false' ? false : x),
		store: true,
		validationError: 'GraphQL client can only be "relay" at this time.',
	} as Input<Answers['graphqlClient']>,
	{
		type: true,
		name: 'build',
		alias: 'b',
		description: 'Build after install',
		default: false,
	} as Input<boolean>,
]
