import React from 'react'
import classnames from 'classnames'
import { Typography } from 'components/typography'
import { SvgFavycon } from 'components/svgs/svg-favycon'

import styles from './index.module.scss'

interface FooterProps {
	className?: string
}

const Footer = ({ className }: FooterProps) => {
	const currentYear = new Date().getFullYear()

	return (
		<footer className={classnames(styles.root, className)}>
			<div className={styles.container}>
				<div className={styles.content}>
					{/* Logo and description */}
					<div className={styles.brand}>
						<div className={styles.logo}>
							<SvgFavycon />
						</div>
						<Typography variant="regularBody" weight="medium" className={styles.description}>
							The easiest way to generate professional favicons for your website.
						</Typography>
					</div>

					{/* Links */}
					<div className={styles.links}>
						<a href="/privacy-policy" className={styles.link}>
							<Typography variant="regularBody" weight="medium">
								Privacy Policy
							</Typography>
						</a>
						<a href="/terms-of-service" className={styles.link}>
							<Typography variant="regularBody" weight="medium">
								Terms of Service
							</Typography>
						</a>
						<a href="/contact" className={styles.link}>
							<Typography variant="regularBody" weight="medium">
								Contact
							</Typography>
						</a>
					</div>
				</div>

				{/* Copyright */}
				<div className={styles.copyright}>
					<Typography variant="footer" weight="medium" className={styles.copyrightText}>
						Made with ❤️ by the Faviconify team
					</Typography>
					<Typography variant="footer" weight="medium" className={styles.copyrightText}>
						© {currentYear} Faviconify. All rights reserved.
					</Typography>
				</div>
			</div>
		</footer>
	)
}

export { Footer }
