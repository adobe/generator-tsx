import { styled } from 'linaria/react'
import React from 'react'
import { connect } from 'react-redux'

import RootState from 'store/RootState'

interface StateProps {}

interface DispatchProps {}

export interface <%= name %>Props {}

const <%= name %>: React.FC<<%= name %>Props & StateProps & DispatchProps> = () => (
	<Root>content</Root>
)

export default connect<StateProps, DispatchProps, void, RootState>(null)(
	<%= name %>,
)

const Root = styled.div`
	display: block;
`
