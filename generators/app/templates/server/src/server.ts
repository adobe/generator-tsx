import express = require('express')
import graphqlHTTP = require('express-graphql')

import Root from './models/Root'

import loadSchema from './loadSchema'

var app = express()
app.use(
	'/graphql',
	graphqlHTTP({
		schema: loadSchema('Root'),
		rootValue: new Root(),
		graphiql: true,
	}),
)
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')
