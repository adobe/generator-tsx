import { styled } from 'linaria/react'
import React from 'react'

export interface QuxQuuxProps {}

const QuxQuux: React.FC<QuxQuuxProps> = () => <Root>content</Root>

export default QuxQuux

const Root = styled.div`
	display: block;
`
