import { styled } from 'linaria/react'
import React from 'react'
import { connect } from 'react-redux'

import RootState from 'store/RootState'

interface StateProps {}

interface DispatchProps {}

export interface QuxQuuxProps {}

const QuxQuux: React.FC<QuxQuuxProps & StateProps & DispatchProps> = () => (
	<Root>content</Root>
)

export default connect<StateProps, DispatchProps, void, RootState>(null)(QuxQuux)

const Root = styled.div`
	display: block;
`
