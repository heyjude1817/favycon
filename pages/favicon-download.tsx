import React from 'react'
import { GetStaticProps } from 'next'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { FaviconDownloader } from 'components/favicon-downloader'
import { SEO } from 'components/seo'

interface FaviconDownloadPageProps {
	// Add any props if needed
}

const FaviconDownloadPage = ({}: FaviconDownloadPageProps) => {
	return (
		<>
			<SEO
				title="Favicon Downloader - Extract & Download Website Icons | Faviconify"
				description="Free favicon downloader tool to extract and download favicons from any website. Get all available sizes and formats including ICO, PNG, and Apple Touch icons instantly."
				keywords="favicon downloader, extract favicon, download website icons, favicon extractor, website favicon, favicon checker, favicon finder"
				canonical="https://faviconify.com/favicon-download"
				structuredData={{
					'@context': 'https://schema.org',
					'@type': 'WebApplication',
					name: 'Favicon Downloader',
					description: 'Free tool to extract and download favicons from any website',
					url: 'https://faviconify.com/favicon-download',
					applicationCategory: 'DesignApplication',
					operatingSystem: 'Any',
					offers: {
						'@type': 'Offer',
						price: '0',
						priceCurrency: 'USD',
					},
					featureList: [
						'Extract favicons from any website',
						'Download multiple favicon sizes',
						'Support for ICO, PNG, SVG formats',
						'Generate HTML code snippets',
						'No registration required',
						'Completely free to use',
					],
				}}
			/>
			<Header />
			<main>
				<FaviconDownloader />
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
