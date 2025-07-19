import React from 'react'
import { GetStaticProps } from 'next'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { Typography } from 'components/typography'
import { SEO } from 'components/seo'

import styles from '../styles/legal-page.module.scss'

interface TermsOfServicePageProps {
	// Add any props if needed
}

const TermsOfServicePage = ({}: TermsOfServicePageProps) => {
	return (
		<>
			<SEO
				title="Terms of Service | Faviconify"
				description="Read our terms of service for using Faviconify's free favicon generation and download tools."
				canonical="https://faviconify.com/terms-of-service"
			/>
			<Header />
			<main className={styles.main}>
				<div className={styles.container}>
					<div className={styles.header}>
						<Typography variant="largeTitle" weight="extraBold" className={styles.title} tag="h1">
							Terms of Service
						</Typography>
						<Typography variant="regularBody" weight="medium" className={styles.lastUpdated} tag="p">
							Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
						</Typography>
					</div>

					<div className={styles.content}>
						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Acceptance of Terms
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								By accessing and using Faviconify, you accept and agree to be bound by the terms and provision of this
								agreement.
							</Typography>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Description of Service
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								Faviconify provides free online tools for:
							</Typography>
							<ul className={styles.list}>
								<li>Generating favicons from uploaded images</li>
								<li>Downloading favicons from existing websites</li>
								<li>Converting images to various favicon formats</li>
								<li>Providing HTML code for favicon implementation</li>
							</ul>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Use License
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								Permission is granted to temporarily use Faviconify for personal and commercial purposes. This license
								shall automatically terminate if you violate any of these restrictions.
							</Typography>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								User Responsibilities
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								When using our service, you agree to:
							</Typography>
							<ul className={styles.list}>
								<li>Only upload images you own or have permission to use</li>
								<li>Respect copyright and trademark laws</li>
								<li>Not use the service for illegal or harmful purposes</li>
								<li>Not attempt to overload or disrupt our servers</li>
								<li>Not reverse engineer or copy our service</li>
							</ul>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Intellectual Property
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								You retain all rights to images you upload. Generated favicons are yours to use freely. When downloading
								favicons from other websites, you must respect the original owner&apos;s intellectual property rights.
							</Typography>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Disclaimer
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								The service is provided &quot;as is&quot; without any representations or warranties. We do not
								guarantee:
							</Typography>
							<ul className={styles.list}>
								<li>Uninterrupted or error-free service</li>
								<li>Accuracy of generated favicons</li>
								<li>Compatibility with all browsers or devices</li>
								<li>Availability of external website favicons</li>
							</ul>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Limitation of Liability
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								In no event shall Faviconify be liable for any damages arising from the use or inability to use our
								service, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
							</Typography>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Service Availability
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								We strive to maintain high availability but do not guarantee uninterrupted service. We reserve the right
								to modify, suspend, or discontinue the service at any time without notice.
							</Typography>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Prohibited Uses
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								You may not use our service to:
							</Typography>
							<ul className={styles.list}>
								<li>Violate any applicable laws or regulations</li>
								<li>Infringe on intellectual property rights</li>
								<li>Distribute malware or harmful content</li>
								<li>Attempt unauthorized access to our systems</li>
								<li>Use automated tools to scrape or abuse our service</li>
							</ul>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Modifications to Terms
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								We reserve the right to revise these terms at any time. Changes will be effective immediately upon
								posting. Your continued use of the service constitutes acceptance of the revised terms.
							</Typography>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Contact Information
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								If you have any questions about these Terms of Service, please contact us at legal@faviconify.com.
							</Typography>
						</section>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

export const getStaticProps: GetStaticProps<TermsOfServicePageProps> = () => {
	return {
		props: {},
	}
}

export default TermsOfServicePage
