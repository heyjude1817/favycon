import React from 'react'
import { GetStaticProps } from 'next'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { Typography } from 'components/typography'
import { SEO } from 'components/seo'

import styles from '../styles/legal-page.module.scss'

interface PrivacyPolicyPageProps {
	// Add any props if needed
}

const PrivacyPolicyPage = ({}: PrivacyPolicyPageProps) => {
	return (
		<>
			<SEO
				title="Privacy Policy - How Faviconify Protects Your Data | Faviconify"
				description="Learn how Faviconify protects your privacy. We don't collect personal data and process everything locally in your browser. No tracking, no data storage, completely secure."
				keywords="faviconify privacy policy, data protection, privacy, no tracking, secure favicon generator, browser processing"
				url="https://faviconify.online/privacy-policy"
			/>
			<Header />
			<main className={styles.main}>
				<div className={styles.container}>
					<div className={styles.header}>
						<Typography variant="largeTitle" weight="extraBold" className={styles.title} tag="h1">
							Privacy Policy
						</Typography>
						<Typography variant="regularBody" weight="medium" className={styles.lastUpdated} tag="p">
							Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
						</Typography>
					</div>

					<div className={styles.content}>
						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Overview
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								At Faviconify, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
								use, and safeguard your information when you use our favicon generation and download services.
							</Typography>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Information We Don&apos;t Collect
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								Faviconify is designed with privacy in mind. We do not collect, store, or process any personal
								information. Specifically:
							</Typography>
							<ul className={styles.list}>
								<li>We don&apos;t require user registration or accounts</li>
								<li>We don&apos;t collect email addresses or personal details</li>
								<li>We don&apos;t store uploaded images or generated favicons</li>
								<li>We don&apos;t track user behavior or create user profiles</li>
							</ul>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								How Our Service Works
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								All favicon generation and processing happens locally in your browser. When you upload an image or enter
								a website URL:
							</Typography>
							<ul className={styles.list}>
								<li>Images are processed entirely in your browser using JavaScript</li>
								<li>No files are uploaded to our servers</li>
								<li>Generated favicons are created and downloaded directly from your browser</li>
								<li>Website favicon extraction is performed client-side</li>
							</ul>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Technical Information
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								Like most websites, we may collect basic technical information through standard web server logs:
							</Typography>
							<ul className={styles.list}>
								<li>IP addresses (automatically anonymized)</li>
								<li>Browser type and version</li>
								<li>Operating system</li>
								<li>Referring website</li>
								<li>Pages visited and time spent</li>
							</ul>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								This information is used solely for maintaining service performance and security. It is not linked to
								any personal information.
							</Typography>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Cookies and Local Storage
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								We use minimal cookies and local storage only for essential functionality:
							</Typography>
							<ul className={styles.list}>
								<li>Theme preferences (dark/light mode)</li>
								<li>Basic site functionality</li>
								<li>No tracking or advertising cookies</li>
							</ul>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Third-Party Services
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								We do not integrate with third-party analytics, advertising, or tracking services. Our service is
								completely self-contained.
							</Typography>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Data Security
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								Since we don&apos;t collect or store personal data, there&apos;s no personal information at risk. All
								processing happens securely in your browser using modern web standards.
							</Typography>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Changes to This Policy
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
								updated revision date.
							</Typography>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Contact Us
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								If you have any questions about this Privacy Policy, please contact us at privacy@faviconify.online.
							</Typography>
						</section>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

export const getStaticProps: GetStaticProps<PrivacyPolicyPageProps> = () => {
	return {
		props: {},
	}
}

export default PrivacyPolicyPage
