import React from 'react'
import classnames from 'classnames'
import { Typography } from 'components/typography'

import styles from './index.module.scss'

interface Feature {
	icon: string
	title: string
	description: string
}

const features: Feature[] = [
	{
		icon: '🔍',
		title: 'Smart Favicon Detection',
		description:
			'Automatically discovers and extracts all favicon sizes from any website using advanced HTML parsing and multiple fallback sources including Google and DuckDuckGo APIs.',
	},
	{
		icon: '📦',
		title: 'ZIP Archive Download',
		description:
			'Download all favicons in a single ZIP file with proper naming conventions. No more manual downloads - get everything organized in one click.',
	},
	{
		icon: '🎯',
		title: 'Multiple Size Support',
		description:
			'Extract favicons in all standard sizes from 16x16 to 512x512 pixels, including ICO, PNG, SVG, and Apple Touch icons for complete coverage.',
	},
	{
		icon: '⚡',
		title: 'Real-time Progress',
		description:
			"Watch the extraction process with live progress bars and status updates. Know exactly what's happening during the download process.",
	},
	{
		icon: '🔄',
		title: 'Intelligent Fallbacks',
		description:
			"If website favicons aren't available, automatically generates high-quality placeholder icons using the domain's first letter with professional styling.",
	},
	{
		icon: '💻',
		title: 'Developer Friendly',
		description:
			'Get ready-to-use HTML code snippets for each favicon size. Perfect for developers who need quick implementation code for their projects.',
	},
]

interface FaviconDownloaderFeaturesProps {
	className?: string
}

const FaviconDownloaderFeatures = ({ className }: FaviconDownloaderFeaturesProps) => {
	return (
		<section id="features" className={classnames(styles.root, className)}>
			<div className={styles.container}>
				<div className={styles.header}>
					<Typography variant="largeTitle" weight="extraBold" className={styles.title} tag="h2">
						Powerful Favicon Extraction Features
					</Typography>
					<Typography variant="largeBody" weight="medium" className={styles.subtitle} tag="p">
						Everything you need to extract, download, and use favicons from any website with professional results.
					</Typography>
				</div>

				<div className={styles.grid}>
					{features.map((feature, index) => (
						<div key={index} className={styles.featureCard}>
							<div className={styles.iconContainer}>
								<span className={styles.icon}>{feature.icon}</span>
							</div>
							<div className={styles.content}>
								<Typography variant="title" weight="bold" className={styles.featureTitle} tag="h3">
									{feature.title}
								</Typography>
								<Typography variant="regularBody" weight="medium" className={styles.featureDescription} tag="p">
									{feature.description}
								</Typography>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export { FaviconDownloaderFeatures }
