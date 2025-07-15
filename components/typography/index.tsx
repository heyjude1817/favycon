import React from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

export type TypographyProps = {
	children: React.ReactNode
	variant?:
		| 'h1'
		| 'h2'
		| 'smallBody'
		| 'regularBody'
		| 'mediumBody'
		| 'largeBody'
		| 'footer'
		| 'superscript'
		| 'title'
		| 'largeTitle'
		| 'extraLargeTitle'
	weight?: 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold'
	color?: 'black' | 'gray' | 'white' | 'green'
	colorImmutable?: boolean
	tag?: string
	muted?: boolean
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>

const Typography = ({
	children,
	variant = 'regularBody',
	weight = 'regular',
	color = 'black',
	colorImmutable = false,
	tag,
	muted,
	...props
}: TypographyProps) => {
	const className = classNames(
		styles.root,
		styles[variant],
		styles[color],
		styles[weight],
		{ [styles.muted]: muted },
		{ [styles.colorImmutable]: colorImmutable },
		props.className
	)
	const componentType = ['h1', 'h2'].includes(variant) ? variant : 'p'

	return React.createElement(tag || componentType, { ...props, className }, children)
}

export { Typography }
