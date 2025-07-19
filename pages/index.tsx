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
// import { HeroSection } from 'components/hero-section'
import { HowItWorks } from 'components/how-it-works'
import { FeaturesGrid } from 'components/features-grid'
import { FAQSection } from 'components/faq-section'
import { Footer } from 'components/footer'

import styles from './index.module.scss'

NProgress.configure({ minimum: 0.15, speed: 300, trickleSpeed: 150, showSpinner: false })

const Home: NextPage = () => {
	const [error, setError] = useState('')
	const [file, setFile] = useState(false)
	const [fileCounter, setFileCounter] = useState(0)
	const [errorCounter, setErrorCounter] = useState(0)

	useEffect(() => {
		splitbee.init()
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
			<FeaturesGrid />

			{/* FAQ Section */}
			<FAQSection />

			{/* Footer */}
			<Footer />
		</BaseLayout>
	)
}

export default Home
