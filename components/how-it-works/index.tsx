import React from 'react'
import classnames from 'classnames'
import { Typography } from 'components/typography'

import styles from './index.module.scss'

interface Step {
	number: string
	title: string
	description: string
	image: string
	imageAlt: string
}

const steps: Step[] = [
	{
		number: '01',
		title: 'Upload your Image',
		description:
			"Drag and drop your image file into the upload area, or click to browse and select it from your device. Faviconify supports PNG, SVG, and JPEG formats and ensures fast, secure uploading. Make sure your image is at least 310×310 pixels for optimal results. Once uploaded, you'll be ready to start the favicon generation process in just one click.",
		image: '/images/step-upload.png',
		imageAlt: 'Upload your image file',
	},
	{
		number: '02',
		title: 'Start Favicon Generation',
		description:
			'After uploading, click "Generate Favicons" to begin the creation process. Our advanced processing engine will intelligently analyze your image and create all standard favicon sizes based on your needs. Processing time may vary depending on the image complexity, but most generations complete within a few moments. Please wait while the system works its magic.',
		image: '/images/step-generate.png',
		imageAlt: 'Start favicon generation',
	},
	{
		number: '03',
		title: 'Download your Package',
		description:
			"Once the process is complete, you'll be able to download the complete favicon package with all sizes and formats in high quality. Your files will include ICO, PNG formats, and ready-to-use HTML code snippets. You can now use the generated favicons for your website, PWA, or mobile app — all with professional results, completely free. Just start implementing your new favicons now!",
		image: '/images/step-download.png',
		imageAlt: 'Download your favicon package',
	},
]

interface HowItWorksProps {
	className?: string
}

const HowItWorks = ({ className }: HowItWorksProps) => {
	return (
		<section id="how-it-works" className={classnames(styles.root, className)}>
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.badge}>
						<Typography variant="smallBody" weight="medium" className={styles.badgeText}>
							Quick Tutorial
						</Typography>
					</div>
					<Typography variant="largeTitle" weight="extraBold" className={styles.title} tag="h2">
						How to Generate Professional Favicons?
					</Typography>
				</div>

				<div className={styles.steps}>
					{steps.map((step, index) => (
						<div key={index} className={styles.step}>
							<div className={styles.stepHeader}>
								<div className={styles.stepNumber}>
									<Typography variant="title" weight="bold" className={styles.number}>
										{step.number}
									</Typography>
								</div>
								<div className={styles.stepTitleWrapper}>
									<Typography variant="title" weight="bold" className={styles.stepTitle} tag="h3">
										{step.title}
									</Typography>
								</div>
							</div>

							<div className={styles.stepContent}>
								<div className={styles.stepText}>
									<Typography variant="regularBody" weight="medium" className={styles.stepDescription} tag="p">
										{step.description}
									</Typography>
								</div>
								<div className={styles.stepImage}>
									<div className={styles.imageWrapper}>
										<div className={styles.imagePlaceholder}>
											<div className={styles.placeholderIcon}>{index === 0 ? '📁' : index === 1 ? '⚡' : '💻'}</div>
											<Typography variant="smallBody" weight="medium" className={styles.placeholderText}>
												{step.imageAlt}
											</Typography>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export { HowItWorks }
