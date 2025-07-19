import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import NProgress from 'nprogress'
import splitbee from '@splitbee/web'
import { BaseLayout } from 'components/base-layout'
import { FavyconWizard } from 'components/favycon-wizard'
import { FavyconInfo } from 'components/favycon-info'
import { DragAndDrop } from 'components/drag-and-drop'
import { FavyconError } from 'components/favycon-error'
import { SEO } from 'components/seo'
import { BreadcrumbSchema } from 'components/breadcrumb-schema'
import { FAQSchema } from 'components/faq-schema'
import { PageAnalytics } from 'components/page-analytics'
import { initAnalytics } from 'lib/analytics'
// import { HeroSection } from 'components/hero-section'
import { HowItWorks } from 'components/how-it-works'
// import { FeaturesGrid } from 'components/features-grid'
import { FAQSection } from 'components/faq-section'
import { Footer } from 'components/footer'

import styles from './index.module.scss'

NProgress.configure({ minimum: 0.15, speed: 300, trickleSpeed: 150, showSpinner: false })

// FAQ data for structured data
const faqData = [
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
]

// Breadcrumb data
const breadcrumbData = [
	{
		name: 'Home',
		url: 'https://faviconify.online/',
	},
]

const Home: NextPage = () => {
	const [error, setError] = useState('')
	const [file, setFile] = useState(false)
	const [fileCounter, setFileCounter] = useState(0)
	const [errorCounter, setErrorCounter] = useState(0)

	useEffect(() => {
		// Initialize all analytics tools
		splitbee.init()
		initAnalytics()
	}, [])

	useEffect(() => {
		if (!file) {
			setFileCounter((c) => c + 1)
		}
	}, [file])

	const onError = (message: string) => {
		setErrorCounter((c) => c + 1)
		setError(message)
		if (message.length > 0 && navigator.vibrate) {
			navigator.vibrate(300)
		}
	}

	const onGenerate = async (file: File, pwa: boolean, dark: boolean) => {
		try {
			NProgress.start()
			const formData = new FormData()
			formData.append('icon', file)
			formData.append('pwa', pwa ? '1' : '0')
			formData.append('dark', dark ? '1' : '0')
			const response = await fetch('/api/favycon', {
				method: 'POST',
				body: formData,
			})
			if (response.status >= 300) {
				throw new Error(await response.text())
			}
			return await response.arrayBuffer()
		} catch (error) {
			throw error
		} finally {
			NProgress.done()
		}
	}

	return (
		<BaseLayout>
			<SEO
				title="Free Favicon Generator - Create Website Icons Online | Faviconify"
				description="Generate professional favicons from any image. Create all sizes (16x16 to 512x512), formats (PNG, SVG, ICO) and get HTML code instantly. Free favicon maker tool."
				keywords="favicon generator, favicon maker, website icon, favicon creator, PWA icons, free favicon tool, convert image to favicon, favicon HTML code, multi-size favicon, online favicon generator"
			/>

			{/* Page-specific Analytics */}
			<PageAnalytics title="Free Favicon Generator - Create Website Icons Online | Faviconify" path="/" />

			{/* Structured Data */}
			<BreadcrumbSchema items={breadcrumbData} />
			<FAQSchema faqs={faqData} />

			{/* Hero Section */}
			{/* <HeroSection /> */}

			{/* Tool Section */}
			<main className={styles.main}>
				<section id="tool" className={styles.container}>
					<FavyconInfo className={styles.info} />
					<FavyconWizard showDndImage={!file}>
						<DragAndDrop key={fileCounter} onFile={setFile} onGenerate={onGenerate} onError={onError} />
					</FavyconWizard>
				</section>
				<FavyconError key={errorCounter} error={error} clearError={() => setError('')} />
			</main>

			{/* How It Works Section */}
			<HowItWorks />

			{/* Features Section */}
			{/* <FeaturesGrid /> */}

			{/* FAQ Section */}
			<FAQSection />

			{/* Footer */}
			<Footer />
		</BaseLayout>
	)
}

export default Home
