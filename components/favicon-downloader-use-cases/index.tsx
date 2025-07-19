import React from 'react'
import classnames from 'classnames'
import { Typography } from 'components/typography'

import styles from './index.module.scss'

interface UseCase {
	icon: string
	title: string
	description: string
	examples: string[]
}

const useCases: UseCase[] = [
	{
		icon: '👨‍💻',
		title: 'Web Developers',
		description: 'Quickly gather favicon assets for client projects, competitor analysis, or inspiration galleries.',
		examples: [
			'Building client websites with reference favicons',
			'Creating favicon comparison tools',
			'Analyzing competitor branding elements',
			'Building bookmark or directory websites',
		],
	},
	{
		icon: '🎨',
		title: 'UI/UX Designers',
		description: 'Collect high-quality favicon references for design inspiration and brand research.',
		examples: [
			'Creating mood boards and style guides',
			'Analyzing icon design trends',
			'Building design system references',
			'Competitor visual analysis',
		],
	},
	{
		icon: '📊',
		title: 'Digital Marketers',
		description: 'Gather brand assets for competitive analysis, presentations, and marketing materials.',
		examples: [
			'Competitor brand analysis reports',
			'Creating industry comparison charts',
			'Building presentation materials',
			'Social media content creation',
		],
	},
	{
		icon: '🔬',
		title: 'Researchers & Analysts',
		description: 'Systematically collect visual brand elements for academic or market research studies.',
		examples: [
			'Brand evolution studies',
			'Visual identity research',
			'Industry trend analysis',
			'Academic design research',
		],
	},
]

interface FaviconDownloaderUseCasesProps {
	className?: string
}

const FaviconDownloaderUseCases = ({ className }: FaviconDownloaderUseCasesProps) => {
	return (
		<section id="use-cases" className={classnames(styles.root, className)}>
			<div className={styles.container}>
				<div className={styles.header}>
					<Typography variant="largeTitle" weight="extraBold" className={styles.title} tag="h2">
						Perfect for Every Professional
					</Typography>
					<Typography variant="largeBody" weight="medium" className={styles.subtitle} tag="p">
						From developers to designers, marketers to researchers - our favicon downloader serves diverse professional
						needs with precision and efficiency.
					</Typography>
				</div>

				<div className={styles.grid}>
					{useCases.map((useCase, index) => (
						<div key={index} className={styles.useCaseCard}>
							<div className={styles.cardHeader}>
								<div className={styles.iconContainer}>
									<span className={styles.icon}>{useCase.icon}</span>
								</div>
								<div className={styles.titleContainer}>
									<Typography variant="title" weight="bold" className={styles.useCaseTitle} tag="h3">
										{useCase.title}
									</Typography>
									<Typography variant="regularBody" weight="medium" className={styles.useCaseDescription} tag="p">
										{useCase.description}
									</Typography>
								</div>
							</div>
							<div className={styles.examples}>
								<Typography variant="smallBody" weight="bold" className={styles.examplesTitle} tag="h4">
									Common Use Cases:
								</Typography>
								<ul className={styles.examplesList}>
									{useCase.examples.map((example, exampleIndex) => (
										<li key={exampleIndex} className={styles.exampleItem}>
											<Typography variant="smallBody" weight="medium" className={styles.exampleText} tag="span">
												{example}
											</Typography>
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export { FaviconDownloaderUseCases }
