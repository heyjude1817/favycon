import React from 'react'
import classnames from 'classnames'
import { Typography } from 'components/typography'

import styles from './index.module.scss'

interface Benefit {
	title: string
	description: string
	stats: string
}

const benefits: Benefit[] = [
	{
		title: 'Save Hours of Manual Work',
		description:
			'No more right-clicking and saving individual favicon files. Extract all sizes and formats from any website in seconds instead of spending hours hunting for the right files.',
		stats: '10x Faster',
	},
	{
		title: 'Get Professional Quality Icons',
		description:
			'Access high-resolution favicons in all standard sizes (16x16 to 512x512) with proper formats including ICO, PNG, SVG, and Apple Touch icons for pixel-perfect results.',
		stats: '15+ Formats',
	},
	{
		title: 'Perfect for Competitive Analysis',
		description:
			'Quickly analyze competitor websites and gather their branding assets. Essential for design research, brand studies, and creating style guides for your projects.',
		stats: '100% Coverage',
	},
	{
		title: 'Zero Technical Knowledge Required',
		description:
			'Simple point-and-click interface that anyone can use. No coding skills, browser extensions, or technical setup required. Just enter a domain and download.',
		stats: 'User Friendly',
	},
]

interface FaviconDownloaderBenefitsProps {
	className?: string
}

const FaviconDownloaderBenefits = ({ className }: FaviconDownloaderBenefitsProps) => {
	return (
		<section id="benefits" className={classnames(styles.root, className)}>
			<div className={styles.container}>
				<div className={styles.header}>
					<Typography variant="largeTitle" weight="extraBold" className={styles.title} tag="h2">
						Why Choose Our Favicon Downloader?
					</Typography>
					<Typography variant="largeBody" weight="medium" className={styles.subtitle} tag="p">
						The most efficient way to extract and download favicons from any website. Trusted by developers, designers,
						and marketers worldwide.
					</Typography>
				</div>

				<div className={styles.grid}>
					{benefits.map((benefit, index) => (
						<div key={index} className={styles.benefitCard}>
							<div className={styles.statsContainer}>
								<Typography variant="title" weight="extraBold" className={styles.stats} tag="div">
									{benefit.stats}
								</Typography>
							</div>
							<div className={styles.content}>
								<Typography variant="title" weight="bold" className={styles.benefitTitle} tag="h3">
									{benefit.title}
								</Typography>
								<Typography variant="regularBody" weight="medium" className={styles.benefitDescription} tag="p">
									{benefit.description}
								</Typography>
							</div>
						</div>
					))}
				</div>

				<div className={styles.cta}>
					<Typography variant="title" weight="bold" className={styles.ctaTitle} tag="h3">
						Ready to Extract Favicons?
					</Typography>
					<Typography variant="regularBody" weight="medium" className={styles.ctaDescription} tag="p">
						Join thousands of developers and designers who use our favicon downloader daily. Start extracting
						professional-quality favicons in seconds.
					</Typography>
				</div>
			</div>
		</section>
	)
}

export { FaviconDownloaderBenefits }
