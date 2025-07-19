import React, { useState } from 'react'
import classnames from 'classnames'
import { Typography } from 'components/typography'

import styles from './index.module.scss'

interface FAQItem {
	question: string
	answer: string
}

const faqItems: FAQItem[] = [
	{
		question: 'What file formats can I download?',
		answer:
			'Our favicon downloader supports all standard favicon formats including ICO, PNG, SVG, GIF, JPEG, and WebP. We also extract Apple Touch icons and other mobile-specific favicon variants.',
	},
	{
		question: 'How many favicon sizes can I get from one website?',
		answer:
			'The number varies by website, but typically you can extract 5-15 different favicon sizes ranging from 16x16 pixels to 512x512 pixels. Some websites have comprehensive favicon packages with 20+ variants.',
	},
	{
		question: 'Is the favicon downloader free to use?',
		answer:
			'Yes, our favicon downloader is completely free to use with no registration required. You can extract and download favicons from unlimited websites without any restrictions.',
	},
	{
		question: 'What happens if a website doesn&apos;t have favicons?',
		answer:
			'If no favicons are found, our tool automatically generates a high-quality placeholder icon using the website&apos;s domain name. This ensures you always get a usable icon for your project.',
	},
	{
		question: 'Can I use downloaded favicons commercially?',
		answer:
			'The favicons belong to their respective website owners. You should respect copyright and trademark laws. For commercial use, we recommend contacting the website owner for permission or using the favicons for reference purposes only.',
	},
	{
		question: 'How does the ZIP download work?',
		answer:
			'When multiple favicons are found, they are automatically packaged into a single ZIP file with proper naming conventions. The ZIP includes all favicon sizes and formats with extraction instructions.',
	},
	{
		question: 'Do you store the downloaded favicons?',
		answer:
			"No, we don't store any favicons on our servers. All extraction and processing happens in real-time, and the files are downloaded directly to your device. We prioritize your privacy and don't retain any data.",
	},
	{
		question: 'Can I extract favicons from password-protected sites?',
		answer:
			'Our tool can only access publicly available favicons. If a website requires authentication or has restricted access, the favicon extraction may not work. The tool works best with publicly accessible websites.',
	},
]

interface FaviconDownloaderFAQProps {
	className?: string
}

const FaviconDownloaderFAQ = ({ className }: FaviconDownloaderFAQProps) => {
	const [openItems, setOpenItems] = useState<number[]>([])

	const toggleItem = (index: number) => {
		setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
	}

	return (
		<section id="faq" className={classnames(styles.root, className)}>
			<div className={styles.container}>
				<div className={styles.header}>
					<Typography variant="largeTitle" weight="extraBold" className={styles.title} tag="h2">
						Frequently Asked Questions
					</Typography>
					<Typography variant="largeBody" weight="medium" className={styles.subtitle} tag="p">
						Everything you need to know about our favicon downloader tool. Can&apos;t find what you&apos;re looking for?
						Contact our support team.
					</Typography>
				</div>

				<div className={styles.faqList}>
					{faqItems.map((item, index) => (
						<div
							key={index}
							className={classnames(styles.faqItem, {
								[styles.open]: openItems.includes(index),
							})}
						>
							<button
								className={styles.question}
								onClick={() => toggleItem(index)}
								aria-expanded={openItems.includes(index)}
							>
								<Typography variant="title" weight="bold" className={styles.questionText} tag="span">
									{item.question}
								</Typography>
								<span className={styles.icon}>{openItems.includes(index) ? '−' : '+'}</span>
							</button>
							<div className={styles.answerContainer}>
								<div className={styles.answer}>
									<Typography variant="regularBody" weight="medium" className={styles.answerText} tag="p">
										{item.answer}
									</Typography>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export { FaviconDownloaderFAQ }
