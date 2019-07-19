import React from 'react'

import styles from './QuxQuux.module.css'

export interface QuxQuuxProps {}

const QuxQuux: React.FC<QuxQuuxProps> = () => (
	<div className={styles.root}>content</div>
)

export default QuxQuux
