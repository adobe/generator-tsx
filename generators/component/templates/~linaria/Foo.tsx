import { styled } from 'linaria/react'
import React from 'react'

export interface <%= name %>Props {}

const <%= name %>: React.FC<<%= name %>Props> = () => <Root>content</Root>

export default <%= name %>

const Root = styled.div`
	display: block;
`
