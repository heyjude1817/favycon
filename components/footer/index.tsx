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

					{/* Tools Section */}
					<div className={styles.section}>
						<Typography variant="regularBody" weight="bold" className={styles.sectionTitle}>
							Tools
						</Typography>
						<div className={styles.sectionLinks}>
							<a href="/" className={styles.link}>
								<Typography variant="regularBody" weight="medium">
									Favicon Generator
								</Typography>
							</a>
							<a href="/favicon-download" className={styles.link}>
								<Typography variant="regularBody" weight="medium">
									Favicon Downloader
								</Typography>
							</a>
						</div>
					</div>

					{/* Support Section */}
					<div className={styles.section}>
						<Typography variant="regularBody" weight="bold" className={styles.sectionTitle}>
							Support
						</Typography>
						<div className={styles.sectionLinks}>
							<a href="/contact" className={styles.link}>
								<Typography variant="regularBody" weight="medium">
									Contact Us
								</Typography>
							</a>
							<a href="/favicon-download#faq" className={styles.link}>
								<Typography variant="regularBody" weight="medium">
									FAQ
								</Typography>
							</a>
						</div>
					</div>

					{/* Legal Section */}
					<div className={styles.section}>
						<Typography variant="regularBody" weight="bold" className={styles.sectionTitle}>
							Legal
						</Typography>
						<div className={styles.sectionLinks}>
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
						</div>
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
