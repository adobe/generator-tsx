import React from 'react'

import styles from './<%= name %>.module.css'

export interface <%= name %>Props {}

const <%= name %>: React.FC<<%= name %>Props> = () => (
	<div className={styles.root}>content</div>
)

export default <%= name %>
