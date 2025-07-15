import React from 'react'
import { Header } from 'components/header'

import styles from './index.module.scss'

type BaseLayoutProps = {
	children: React.ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
	return (
		<div className={styles.root}>
			<Header />
			{children}
		</div>
	)
}

export { BaseLayout }
