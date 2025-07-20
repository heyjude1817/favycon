import Script from 'next/script'

/**
 * PageAnalytics Component
 *
 * Provides page-level analytics injection using Next.js Script components.
 * Uses the 'afterInteractive' strategy for optimal performance and reliability.
 *
 * Features:
 * - Google Analytics 4 with privacy settings
 * - Umami Analytics (privacy-focused)
 * - Splitbee Analytics (backward compatibility)
 * - Next.js Script optimization for better loading performance
 */

interface PageAnalyticsProps {
	title?: string
	path?: string
}

const PageAnalytics = ({ title, path }: PageAnalyticsProps) => {
	const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
	const UMAMI_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
	const UMAMI_SRC = process.env.NEXT_PUBLIC_UMAMI_SRC
	const ENABLE_GA = process.env.NEXT_PUBLIC_ENABLE_GA === 'true'
	const ENABLE_UMAMI = process.env.NEXT_PUBLIC_ENABLE_UMAMI === 'true'
	const ENABLE_SPLITBEE = process.env.NEXT_PUBLIC_ENABLE_SPLITBEE !== 'false'

	return (
		<>
			{/* Google Analytics 4 */}
			{ENABLE_GA && GA_ID && (
				<>
					<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
					<Script id="google-analytics" strategy="afterInteractive">
						{`
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', '${GA_ID}');
						`}
					</Script>
				</>
			)}

			{/* Umami Analytics */}
			{ENABLE_UMAMI && UMAMI_ID && UMAMI_SRC && (
				<Script src={UMAMI_SRC} data-website-id={UMAMI_ID} strategy="afterInteractive" />
			)}

			{/* Splitbee Analytics */}
			{ENABLE_SPLITBEE && (
				<Script
					src="https://cdn.splitbee.io/sb.js"
					strategy="afterInteractive"
					onLoad={() => {
						console.log('✅ Splitbee Analytics loaded for page:', title || 'Unknown', path ? `at ${path}` : '')
					}}
				/>
			)}
		</>
	)
}

export { PageAnalytics }
