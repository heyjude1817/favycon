import React from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

export type ButtonProps = {
	children: React.ReactNode
	variant?: 'primary' | 'transparent' | 'regularTransparent' | 'modalClose'
	weight?: 'regular' | 'medium' | 'semiBold' | 'bold'
	color?: 'black' | 'gray' | 'white' | 'link'
	background?: 'bgLink' | 'bgGreen' | 'bgDarkGray' | ''
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button = ({
	children,
	variant = 'primary',
	weight = 'bold',
	color = 'black',
	background = '',
	...props
}: ButtonProps) => {
	const className = classNames(styles[variant], styles[weight], styles[color], styles[background], props.className)

	return (
		<button {...props} className={className}>
			{children}
		</button>
	)
}

export { Button }
