import React from 'react'
import { GetStaticProps } from 'next'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { Typography } from 'components/typography'
import { SEO } from 'components/seo'

import styles from '../styles/legal-page.module.scss'

interface ContactPageProps {
	// Add any props if needed
}

const ContactPage = ({}: ContactPageProps) => {
	return (
		<>
			<SEO
				title="Contact Us | Faviconify"
				description="Get in touch with the Faviconify team. We're here to help with any questions about our favicon generation tools."
				url="https://faviconify.online/contact"
			/>
			<Header />
			<main className={styles.main}>
				<div className={styles.container}>
					<div className={styles.header}>
						<Typography variant="largeTitle" weight="extraBold" className={styles.title} tag="h1">
							Contact Us
						</Typography>
						<Typography variant="regularBody" weight="medium" className={styles.subtitle} tag="p">
							We&apos;d love to hear from you. Get in touch with any questions, feedback, or suggestions.
						</Typography>
					</div>

					<div className={styles.content}>
						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Get in Touch
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								Have a question about Faviconify? Need help with favicon generation? We&apos;re here to help!
							</Typography>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Email Support
							</Typography>
							<div className={styles.contactInfo}>
								<div className={styles.contactItem}>
									<Typography variant="regularBody" weight="bold" className={styles.contactLabel} tag="div">
										General Inquiries
									</Typography>
									<Typography variant="regularBody" weight="medium" className={styles.contactValue} tag="div">
										hello@faviconify.online
									</Typography>
								</div>
								<div className={styles.contactItem}>
									<Typography variant="regularBody" weight="bold" className={styles.contactLabel} tag="div">
										Technical Support
									</Typography>
									<Typography variant="regularBody" weight="medium" className={styles.contactValue} tag="div">
										support@faviconify.online
									</Typography>
								</div>
								<div className={styles.contactItem}>
									<Typography variant="regularBody" weight="bold" className={styles.contactLabel} tag="div">
										Privacy & Legal
									</Typography>
									<Typography variant="regularBody" weight="medium" className={styles.contactValue} tag="div">
										legal@faviconify.online
									</Typography>
								</div>
							</div>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Frequently Asked Questions
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								Before reaching out, you might find your answer in our FAQ section on the favicon downloader page.
								We&apos;ve compiled answers to the most common questions about our services.
							</Typography>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Feature Requests
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								Have an idea for a new feature or improvement? We&apos;d love to hear it! Send us your suggestions and
								we&apos;ll consider them for future updates.
							</Typography>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Bug Reports
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								Found a bug or experiencing issues? Please include the following information in your report:
							</Typography>
							<ul className={styles.list}>
								<li>Your browser and version</li>
								<li>Operating system</li>
								<li>Steps to reproduce the issue</li>
								<li>Screenshots if applicable</li>
								<li>Any error messages you received</li>
							</ul>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								Response Time
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								We typically respond to emails within 24-48 hours during business days. For urgent technical issues,
								please mark your email as &quot;Urgent&quot; in the subject line.
							</Typography>
						</section>

						<section className={styles.section}>
							<Typography variant="title" weight="bold" className={styles.sectionTitle} tag="h2">
								About Faviconify
							</Typography>
							<Typography variant="regularBody" weight="medium" className={styles.text} tag="p">
								Faviconify is a free, privacy-focused tool for generating and downloading favicons. We&apos;re committed
								to providing the best favicon tools while respecting your privacy and not collecting any personal data.
							</Typography>
						</section>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

export const getStaticProps: GetStaticProps<ContactPageProps> = () => {
	return {
		props: {},
	}
}

export default ContactPage
