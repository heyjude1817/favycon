import React from 'react'

import styles from './index.module.scss'

type StickyProps = {
	children: React.ReactNode
}

const Sticky = ({ children }: StickyProps) => {
	return (
		<div className={styles.root}>
			<div className={styles.sticky}>{children}</div>
		</div>
	)
}

export { Sticky }
