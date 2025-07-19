import React, { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import classnames from 'classnames'
import { Typography } from 'components/typography'

import styles from './index.module.scss'

// Type assertion to resolve React 18 compatibility issues
const CSSTransitionComponent = CSSTransition as any

type FavyconErrorProps = {
	error: string
	clearError: () => void
}

const FavyconError = ({ error, clearError }: FavyconErrorProps) => {
	const [showError, setShowError] = useState(false)

	useEffect(() => {
		if (error) {
			let endTimeout: number
			setShowError(true)
			const errorTimeout = window.setTimeout(() => {
				setShowError(false)
				endTimeout = window.setTimeout(() => {
					clearError()
				}, 300)
			}, 5300)
			return () => {
				clearTimeout(errorTimeout)
				clearTimeout(endTimeout)
			}
		}
	}, [error, clearError])

	return (
		<CSSTransitionComponent in={showError} timeout={300} classNames="error" unmountOnExit>
			<div className={classnames(styles.error)}>
				<Typography
					className={classnames(styles.content)}
					variant="regularBody"
					color="white"
					colorImmutable={true}
					weight="semiBold"
				>
					{error}
				</Typography>
				<svg height={20} width={20}>
					<circle className={classnames(styles.progress)} fill="transparent" stroke="white" r={7} cx={10} cy={10} />
				</svg>
			</div>
		</CSSTransitionComponent>
	)
}

export { FavyconError }
