import React from 'react'
import { connect } from 'react-redux'

import RootState from 'store/RootState'

import styles from './<%= name %>.module.css'

interface StateProps {}

interface DispatchProps {}

export interface <%= name %>Props {}

const <%= name %>: React.FC<<%= name %>Props & StateProps & DispatchProps> = () => (
	<div className={styles.root}>content</div>
)

export default connect<StateProps, DispatchProps, void, RootState>(null)(<%= name %>)
