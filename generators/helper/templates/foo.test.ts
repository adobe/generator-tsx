import <%= name %> from './<%= name %>'

describe('<%= name %>', () => {
	it('returns undefined', () => {
		expect(<%= name %>()).not.toBeDefined()
	})
})
