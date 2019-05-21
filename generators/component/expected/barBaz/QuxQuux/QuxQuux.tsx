import React from 'react'
import { connect } from 'react-redux'

import RootState from 'store/RootState'

import styles from './QuxQuux.module.css'

interface StateProps {}

interface DispatchProps {}

export interface QuxQuuxProps {}

const QuxQuux: React.FC<QuxQuuxProps & StateProps & DispatchProps> = () => (
	<div className={styles.root}>content</div>
)

export default connect<StateProps, DispatchProps, void, RootState>(null)(QuxQuux)
