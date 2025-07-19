import React from 'react'
import { GetStaticProps } from 'next'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { FaviconDownloader } from 'components/favicon-downloader'
import { FaviconDownloaderFeatures } from 'components/favicon-downloader-features'
import { FaviconDownloaderBenefits } from 'components/favicon-downloader-benefits'
import { FaviconDownloaderUseCases } from 'components/favicon-downloader-use-cases'
import { FaviconDownloaderFAQ } from 'components/favicon-downloader-faq'
import { SEO } from 'components/seo'
import { BreadcrumbSchema } from 'components/breadcrumb-schema'
import { FAQSchema } from 'components/faq-schema'

// FAQ data for favicon downloader
const faviconDownloaderFAQs = [
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
		question: "What happens if a website doesn't have favicons?",
		answer:
			"If no favicons are found, our tool automatically generates a high-quality placeholder icon using the website's domain name. This ensures you always get a usable icon for your project.",
	},
]

// Breadcrumb data for favicon downloader
const breadcrumbData = [
	{
		name: 'Home',
		url: 'https://faviconify.online/',
	},
	{
		name: 'Favicon Downloader',
		url: 'https://faviconify.online/favicon-download',
	},
]

interface FaviconDownloadPageProps {
	// Add any props if needed
}

const FaviconDownloadPage = ({}: FaviconDownloadPageProps) => {
	return (
		<>
			<SEO
				title="Free Favicon Downloader - Extract All Website Icons in ZIP | Faviconify"
				description="Professional favicon downloader tool to extract and download all favicon sizes from any website. Get ICO, PNG, SVG, Apple Touch icons in one ZIP file. Free, fast, and no registration required."
				keywords="favicon downloader, extract favicon, download website icons, favicon extractor, website favicon, favicon checker, favicon finder, favicon zip download, bulk favicon download, favicon extraction tool, website icon downloader, favicon grabber, favicon ripper, favicon collector, apple touch icon downloader, ico png svg favicon, favicon batch download, favicon archive download"
				url="https://faviconify.online/favicon-download"
			/>

			{/* Structured Data */}
			<BreadcrumbSchema items={breadcrumbData} />
			<FAQSchema faqs={faviconDownloaderFAQs} />
			<Header />
			<main>
				<FaviconDownloader />
				<FaviconDownloaderFeatures />
				<FaviconDownloaderBenefits />
				<FaviconDownloaderUseCases />
				<FaviconDownloaderFAQ />
			</main>
			<Footer />
		</>
	)
}

export const getStaticProps: GetStaticProps<FaviconDownloadPageProps> = () => {
	return {
		props: {},
	}
}

export default FaviconDownloadPage
