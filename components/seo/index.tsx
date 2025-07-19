import Head from 'next/head'

type SEOProps = {
	title: string
	description: string
	keywords?: string
	url?: string
	image?: string
	type?: 'website' | 'article'
	siteName?: string
	author?: string
	publishedTime?: string
	modifiedTime?: string
}

const defaultProps = {
	keywords:
		'favicon generator, favicon maker, website icon, favicon creator, PWA icons, free favicon tool, convert image to favicon, favicon HTML code, multi-size favicon, online favicon generator',
	url: 'https://faviconify.online',
	image: 'https://faviconify.online/share.png?v6',
	type: 'website' as const,
	siteName: 'Faviconify',
	author: 'Faviconify Team',
}

const SEO = ({
	title,
	description,
	keywords = defaultProps.keywords,
	url = defaultProps.url,
	image = defaultProps.image,
	type = defaultProps.type,
	siteName = defaultProps.siteName,
	author = defaultProps.author,
	publishedTime,
	modifiedTime,
}: SEOProps) => {
	// Generate structured data for SEO
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: siteName,
		description,
		url,
		applicationCategory: 'DesignApplication',
		operatingSystem: 'Web Browser',
		browserRequirements: 'Requires JavaScript. Requires HTML5.',
		softwareVersion: '2.0',
		releaseNotes: 'Enhanced favicon generation with improved quality and more formats.',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
			availability: 'https://schema.org/InStock',
			validFrom: '2024-01-01',
		},
		creator: {
			'@type': 'Organization',
			name: author,
			url: 'https://faviconify.online',
		},
		featureList: [
			'Generate favicon in multiple sizes (16x16 to 512x512)',
			'Support PNG, SVG, ICO, JPEG formats',
			'PWA compatible icons and manifest',
			'Apple Touch icons for iOS',
			'Android Chrome icons',
			'Microsoft Tile images',
			'Instant HTML code generation',
			'ZIP package download',
			'Free online tool',
			'No registration required',
			'Privacy-focused processing',
			'Real-time generation',
		],
		screenshot: image,
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			ratingCount: '1250',
			bestRating: '5',
			worstRating: '1',
		},
		review: [
			{
				'@type': 'Review',
				author: {
					'@type': 'Person',
					name: 'Web Developer',
				},
				reviewRating: {
					'@type': 'Rating',
					ratingValue: '5',
					bestRating: '5',
				},
				reviewBody: 'Excellent favicon generator tool. Creates all the sizes I need for my websites.',
			},
		],
	}

	return (
		<Head>
			{/* Basic Meta Tags */}
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			<meta name="author" content={author} />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="robots" content="index, follow" />
			<meta name="language" content="English" />
			<meta name="revisit-after" content="7 days" />

			{/* Additional Meta Tags */}
			<meta name="theme-color" content="#3B82F6" />
			<meta name="msapplication-TileColor" content="#3B82F6" />
			<meta name="application-name" content={siteName} />

			{/* Canonical URL */}
			<link rel="canonical" href={url} />

			{/* Favicon Links */}
			<link rel="apple-touch-icon" sizes="57x57" href="/favicon-57x57.png" />
			<link rel="apple-touch-icon" sizes="60x60" href="/favicon-60x60.png" />
			<link rel="apple-touch-icon" sizes="72x72" href="/favicon-72x72.png" />
			<link rel="apple-touch-icon" sizes="76x76" href="/favicon-76x76.png" />
			<link rel="apple-touch-icon" sizes="114x114" href="/favicon-114x114.png" />
			<link rel="apple-touch-icon" sizes="120x120" href="/favicon-120x120.png" />
			<link rel="apple-touch-icon" sizes="144x144" href="/favicon-144x144.png" />
			<link rel="apple-touch-icon" sizes="152x152" href="/favicon-152x152.png" />
			<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png" />
			<meta name="apple-mobile-web-app-title" content={siteName} />
			<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
			<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
			<meta name="msapplication-TileColor" content="#ffffff" />
			<meta name="msapplication-TileImage" content="/favicon-144x144.png" />
			<meta name="msapplication-config" content="/browserconfig.xml" />

			{/* Open Graph Tags */}
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:type" content={type} />
			<meta property="og:site_name" content={siteName} />
			<meta property="og:url" content={url} />
			<meta property="og:image" content={image} />
			<meta property="og:image:secure_url" content={image} />
			<meta property="og:image:type" content="image/png" />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />
			<meta property="og:image:alt" content={`${siteName} - Professional favicon generator tool`} />
			<meta property="og:locale" content="en_US" />
			{publishedTime && <meta property="article:published_time" content={publishedTime} />}
			{modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

			{/* Twitter Card Tags */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />
			<meta name="twitter:image:alt" content={`${siteName} - Professional favicon generator tool`} />
			<meta name="twitter:creator" content="@faviconify" />
			<meta name="twitter:site" content="@faviconify" />
			<meta name="twitter:domain" content="faviconify.online" />

			{/* Structured Data */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
		</Head>
	)
}

export { SEO }
