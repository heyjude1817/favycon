import React from 'react'
import classnames from 'classnames'
import { Typography } from 'components/typography'

import styles from './index.module.scss'

interface FeatureSection {
	title: string
	subtitle: string
	description: string
	features: string[]
	image: string
	imageAlt: string
	reverse?: boolean
}

const featureSections: FeatureSection[] = [
	{
		title: 'Innovative Solutions for Professional Favicon Generation',
		subtitle: 'Complete Favicon Package',
		description:
			'Faviconify can accurately generate all standard favicon sizes and formats, ensuring that your website displays perfectly across all devices and browsers. This enhances your brand consistency and provides users with a professional browsing experience.',
		features: [
			'Generate 16+ standard sizes automatically',
			'Support for PNG, ICO, and SVG formats',
			'PWA and mobile app compatibility',
			'Optimized for all modern browsers',
		],
		image: '/images/feature-generation.png',
		imageAlt: 'Professional favicon generation process',
		reverse: false,
	},
	{
		title: 'Enhanced User Experience with Complete Code Integration',
		subtitle: 'Ready-to-Use HTML Code',
		description:
			'By providing complete HTML code snippets and implementation guides, Faviconify delivers a seamless development experience. This significantly improves development efficiency and ensures proper favicon implementation across all platforms.',
		features: [
			'Complete HTML meta tags included',
			'Copy-paste ready code snippets',
			'Cross-platform compatibility guides',
			'Best practices documentation',
		],
		image: '/images/feature-code.png',
		imageAlt: 'HTML code integration and implementation',
		reverse: true,
	},
	{
		title: 'Privacy-First Approach with Lightning Fast Processing',
		subtitle: 'Secure & Fast',
		description:
			'This innovative solution prioritizes user privacy while delivering exceptional performance. It meets the diverse needs of developers, designers, and businesses with broad market potential and practical application value.',
		features: [
			'No data storage or tracking',
			'Processing completed in seconds',
			'No registration required',
			'Completely anonymous usage',
		],
		image: '/images/feature-privacy.png',
		imageAlt: 'Privacy-focused and fast favicon processing',
		reverse: false,
	},
]

interface FeaturesGridProps {
	className?: string
}

const FeaturesGrid = ({ className }: FeaturesGridProps) => {
	return (
		<section id="features" className={classnames(styles.root, className)}>
			<div className={styles.container}>
				{featureSections.map((section, index) => (
					<div
						key={index}
						className={classnames(styles.featureSection, {
							[styles.reverse]: section.reverse,
						})}
					>
						<div className={styles.content}>
							<div className={styles.textContent}>
								<Typography variant="title" weight="bold" className={styles.sectionSubtitle} tag="h3">
									{section.subtitle}
								</Typography>
								<Typography variant="largeTitle" weight="extraBold" className={styles.sectionTitle} tag="h2">
									{section.title}
								</Typography>
								<Typography variant="regularBody" weight="medium" className={styles.sectionDescription} tag="p">
									{section.description}
								</Typography>
								<ul className={styles.featureList}>
									{section.features.map((feature, featureIndex) => (
										<li key={featureIndex} className={styles.featureItem}>
											<span className={styles.checkmark}>✓</span>
											<Typography variant="regularBody" weight="medium" className={styles.featureText}>
												{feature}
											</Typography>
										</li>
									))}
								</ul>
							</div>
							<div className={styles.imageContent}>
								<div className={styles.imageWrapper}>
									<div className={styles.imagePlaceholder}>
										<div className={styles.placeholderIcon}>{index === 0 ? '🎯' : index === 1 ? '💻' : '🔒'}</div>
										<Typography variant="smallBody" weight="medium" className={styles.placeholderText}>
											{section.imageAlt}
										</Typography>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export { FeaturesGrid }
