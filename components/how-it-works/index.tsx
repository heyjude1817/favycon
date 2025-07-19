import React from 'react'
import classnames from 'classnames'
import Image from 'next/image'
import { Typography } from 'components/typography'

import styles from './index.module.scss'

interface Step {
	number: string
	title: string
	description: string
	icon: string
}

const steps: Step[] = [
	{
		number: '01',
		title: 'Upload Your Image',
		description: 'Drag and drop your image or click to browse. We support PNG, SVG, and JPEG formats. For best results, use a square image with minimum 310x310 pixels.',
		icon: '📤'
	},
	{
		number: '02',
		title: 'Automatic Processing',
		description: 'Our advanced system automatically generates 16+ different sizes from 16x16 to 512x512 pixels, including all PWA-compatible formats and ICO files.',
		icon: '⚙️'
	},
	{
		number: '03',
		title: 'Download & Implement',
		description: 'Get your complete favicon package as a ZIP file with all sizes, formats, and ready-to-use HTML code that you can copy directly into your website.',
		icon: '📥'
	}
]

interface HowItWorksProps {
	className?: string
}

const HowItWorks = ({ className }: HowItWorksProps) => {
	return (
		<section id="how-it-works" className={classnames(styles.root, className)}>
			<div className={styles.container}>
				<div className={styles.header}>
					<Typography
						variant="largeTitle"
						weight="extraBold"
						className={styles.title}
						tag="h2"
					>
						Simple 3-Step Process
					</Typography>
					<Typography
						variant="largeBody"
						weight="medium"
						className={styles.subtitle}
						tag="p"
					>
						From image to complete favicon package in seconds
					</Typography>
				</div>

				<div className={styles.content}>
					{/* Left side - Steps */}
					<div className={styles.stepsSection}>
						{steps.map((step, index) => (
							<div key={index} className={styles.step}>
								<div className={styles.stepNumber}>
									<Typography variant="title" weight="extraBold" className={styles.number}>
										{step.number}
									</Typography>
								</div>
								<div className={styles.stepContent}>
									<div className={styles.stepHeader}>
										<span className={styles.stepIcon}>{step.icon}</span>
										<Typography variant="title" weight="bold" className={styles.stepTitle}>
											{step.title}
										</Typography>
									</div>
									<Typography variant="regularBody" weight="medium" className={styles.stepDescription}>
										{step.description}
									</Typography>
								</div>
							</div>
						))}
					</div>

					{/* Right side - Image */}
					<div className={styles.imageSection}>
						<div className={styles.imageWrapper}>
							<Image
								src="/images/unsplash-horizontal.jpg"
								alt="Favicon generator process demonstration"
								fill
								style={{ objectFit: 'cover' }}
								className={styles.image}
							/>
							<div className={styles.imageOverlay}>
								<div className={styles.playButton}>
									<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
										<circle cx="40" cy="40" r="40" fill="rgba(255, 255, 255, 0.9)" />
										<path
											d="M32 26L32 54L56 40L32 26Z"
											fill="#333"
										/>
									</svg>
								</div>
								<Typography variant="regularBody" weight="medium" className={styles.playText}>
									Watch Demo
								</Typography>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export { HowItWorks }
