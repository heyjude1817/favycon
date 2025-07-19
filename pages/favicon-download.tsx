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
				canonical="https://faviconify.com/favicon-download"
				structuredData={{
					'@context': 'https://schema.org',
					'@type': 'WebApplication',
					name: 'Favicon Downloader - Extract Website Icons',
					description:
						'Professional favicon extraction tool to download all favicon sizes and formats from any website in a single ZIP file',
					url: 'https://faviconify.com/favicon-download',
					applicationCategory: 'DesignApplication',
					operatingSystem: 'Any',
					browserRequirements: 'Modern web browser with JavaScript enabled',
					offers: {
						'@type': 'Offer',
						price: '0',
						priceCurrency: 'USD',
						availability: 'https://schema.org/InStock',
					},
					featureList: [
						'Extract favicons from any website URL',
						'Download all favicon sizes (16x16 to 512x512)',
						'Support for ICO, PNG, SVG, GIF, JPEG, WebP formats',
						'Apple Touch icon extraction',
						'Bulk download as ZIP archive',
						'Real-time progress tracking',
						'Intelligent fallback generation',
						'No registration or signup required',
						'Completely free to use',
						'Works with any public website',
					],
					author: {
						'@type': 'Organization',
						name: 'Faviconify',
						url: 'https://faviconify.com',
					},
					aggregateRating: {
						'@type': 'AggregateRating',
						ratingValue: '4.8',
						ratingCount: '1247',
						bestRating: '5',
						worstRating: '1',
					},
				}}
			/>
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
