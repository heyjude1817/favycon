import React, { useState } from 'react'
import classnames from 'classnames'
import { Typography } from 'components/typography'

import styles from './index.module.scss'

interface FAQ {
	question: string
	answer: string
}

const faqs: FAQ[] = [
	{
		question: 'What image formats are supported?',
		answer: 'PNG, SVG, and JPEG formats. We recommend square images with minimum 310×310 pixels for best results.',
	},
	{
		question: 'Is my data stored anywhere?',
		answer:
			'No, all processing is done in real-time. Your images are never stored on our servers and are deleted immediately after processing.',
	},
	{
		question: 'What sizes are generated?',
		answer:
			'We generate 16+ standard sizes from 16×16 to 512×512 pixels, including all PWA and mobile app icon sizes, plus ICO format.',
	},
	{
		question: 'Is it really free?',
		answer: 'Yes, completely free with no registration, limits, or hidden costs. No credit card required.',
	},
]

interface FAQSectionProps {
	className?: string
}

const FAQSection = ({ className }: FAQSectionProps) => {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	return (
		<section id="faq" className={classnames(styles.root, className)}>
			<div className={styles.container}>
				<div className={styles.header}>
					<Typography variant="largeTitle" weight="extraBold" className={styles.title} tag="h2">
						Common Questions
					</Typography>
					<Typography variant="largeBody" weight="medium" className={styles.subtitle} tag="p">
						Quick answers to help you get started
					</Typography>
				</div>

				<div className={styles.faqList}>
					{faqs.map((faq, index) => (
						<div
							key={index}
							className={classnames(styles.faqItem, {
								[styles.open]: openIndex === index,
							})}
						>
							<button
								className={styles.faqQuestion}
								onClick={() => toggleFAQ(index)}
								aria-expanded={openIndex === index}
								type="button"
							>
								<Typography variant="title" weight="semiBold" className={styles.questionText}>
									{faq.question}
								</Typography>
								<div className={styles.toggleIcon}>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										className={classnames(styles.icon, {
											[styles.rotated]: openIndex === index,
										})}
									>
										<path
											d="M6 9L12 15L18 9"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
							</button>

							<div
								className={classnames(styles.faqAnswer, {
									[styles.open]: openIndex === index,
								})}
							>
								<div className={styles.answerContent}>
									<Typography variant="regularBody" weight="medium" className={styles.answerText}>
										{faq.answer}
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

export { FAQSection }
