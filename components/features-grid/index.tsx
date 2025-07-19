import React from 'react'
import classnames from 'classnames'
import { Typography } from 'components/typography'

import styles from './index.module.scss'

interface Feature {
	icon: string
	title: string
	description: string
	highlight?: boolean
}

const features: Feature[] = [
	{
		icon: '🎯',
		title: 'All Standard Sizes',
		description: 'Generate 16+ favicon sizes automatically, from 16×16 to 512×512 pixels.',
		highlight: true
	},
	{
		icon: '📱',
		title: 'PWA Compatible',
		description: 'Includes manifest.json and all mobile app icon sizes for Progressive Web Apps.',
		highlight: true
	},
	{
		icon: '⚡',
		title: 'Lightning Fast',
		description: 'High-quality favicon generation in seconds with Sharp.js processing.',
		highlight: false
	},
	{
		icon: '🔒',
		title: 'Privacy First',
		description: 'No data storage, no tracking, no registration. Completely anonymous.',
		highlight: false
	},
	{
		icon: '💻',
		title: 'HTML Code Included',
		description: 'Ready-to-use HTML snippets with all necessary meta tags and links.',
		highlight: false
	},
	{
		icon: '🌐',
		title: 'Universal Support',
		description: 'Works on all modern browsers and mobile devices with fallback support.',
		highlight: false
	}
]

interface FeaturesGridProps {
	className?: string
}

const FeaturesGrid = ({ className }: FeaturesGridProps) => {
	return (
		<section id="features" className={classnames(styles.root, className)}>
			<div className={styles.container}>
				<div className={styles.header}>
					<Typography
						variant="largeTitle"
						weight="extraBold"
						className={styles.title}
						tag="h2"
					>
						Everything You Need
					</Typography>
					<Typography
						variant="largeBody"
						weight="medium"
						className={styles.subtitle}
						tag="p"
					>
						Professional favicon generation with all formats, sizes, and code included
					</Typography>
				</div>

				<div className={styles.grid}>
					{features.map((feature, index) => (
						<div
							key={index}
							className={classnames(styles.feature, {
								[styles.highlighted]: feature.highlight
							})}
						>
							<div className={styles.featureIcon}>
								<span className={styles.icon}>{feature.icon}</span>
							</div>
							<div className={styles.featureContent}>
								<Typography
									variant="title"
									weight="bold"
									className={styles.featureTitle}
									tag="h3"
								>
									{feature.title}
								</Typography>
								<Typography
									variant="regularBody"
									weight="medium"
									className={styles.featureDescription}
									tag="p"
								>
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

export { FeaturesGrid }
