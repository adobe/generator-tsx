import { buildSchema } from 'graphql'
import { readFileSync } from 'fs'
import { join } from 'path'

export default function loadSchema(name: string) {
	return buildSchema(
		readFileSync(join(__dirname, 'schemas', `${name}.gql`), {
			encoding: 'utf-8',
		}),
	)
}
