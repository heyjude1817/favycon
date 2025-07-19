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
		question: 'What is a favicon generator and how does it work?',
		answer:
			'A favicon generator is a tool that automatically creates website icons (favicons) from your uploaded image. Our favicon maker converts your image into multiple sizes and formats (16x16, 32x32, 96x96, 192x192, 512x512 pixels) including ICO, PNG, and Apple Touch icons. Simply upload your logo or image, and our favicon creator generates a complete package with HTML code for easy implementation.',
	},
	{
		question: 'What favicon sizes does this favicon generator create?',
		answer:
			'Our favicon maker generates 16+ standard favicon sizes: 16x16, 32x32, 48x48, 64x64, 96x96, 128x128, 180x180, 192x192, 256x256, 512x512 pixels. This includes traditional ICO favicons, Apple Touch icons, Android Chrome icons, Microsoft Tile images, and PWA manifest icons. All sizes are optimized for different devices and browsers.',
	},
	{
		question: 'Is this favicon generator free to use?',
		answer:
			'Yes, our favicon maker is completely free with no registration required, no watermarks, and no usage limits. You can generate unlimited favicons for personal and commercial websites. No credit card or signup needed - just upload your image and download your favicon package instantly.',
	},
	{
		question: 'What image formats work with this favicon creator?',
		answer:
			'Our favicon generator supports PNG, JPEG, SVG, and GIF image formats. For best results, upload a square image with minimum 310x310 pixels resolution. The favicon maker automatically optimizes your image and creates crisp, professional favicons in all required formats including ICO for maximum browser compatibility.',
	},
	{
		question: 'How do I install the generated favicons on my website?',
		answer:
			"After generating your favicons, download the ZIP package containing all favicon files and HTML code. Copy the favicon files to your website's root directory, then paste the provided HTML meta tags into your website's <head> section. Our favicon generator includes complete implementation instructions and ready-to-use code snippets.",
	},
	{
		question: 'Does this favicon maker work for PWA and mobile apps?',
		answer:
			'Yes, our favicon generator creates PWA-compatible icons including manifest.json file, Apple Touch icons for iOS, Android Chrome icons, and Microsoft Tile images. The favicon maker generates all sizes needed for Progressive Web Apps (192x192, 512x512) and mobile app icons, ensuring your website works perfectly as a PWA.',
	},
	{
		question: 'Is my uploaded image data secure with this favicon generator?',
		answer:
			"Absolutely. Our favicon maker prioritizes privacy and security. Your uploaded images are processed in real-time and automatically deleted from our servers immediately after favicon generation. We don't store, track, or share any of your data. The entire favicon creation process is completely anonymous and secure.",
	},
	{
		question: 'Can I use the generated favicons for commercial websites?',
		answer:
			'Yes, all favicons created with our favicon generator can be used for both personal and commercial projects without restrictions. There are no licensing fees, attribution requirements, or usage limitations. The favicon maker output is yours to use freely for any website, blog, or web application.',
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
						Favicon Generator FAQ
					</Typography>
					<Typography variant="largeBody" weight="medium" className={styles.subtitle} tag="p">
						Everything you need to know about our free favicon maker and generator tool
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
