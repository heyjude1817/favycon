import Head from 'next/head'

/**
 * PageAnalytics Component
 *
 * Provides page-level analytics injection using direct script tags.
 * This approach is more reliable than Next.js Script components in
 * environments with network restrictions or ad blockers.
 *
 * Features:
 * - Google Analytics 4 with privacy settings
 * - Umami Analytics (privacy-focused)
 * - Splitbee Analytics (backward compatibility)
 * - Direct script injection for maximum compatibility
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
		<Head>
			{/* Google Analytics 4 */}
			{ENABLE_GA && GA_ID && (
				<>
					<script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
					<script
						dangerouslySetInnerHTML={{
							__html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								window.gtag = gtag;
								gtag('js', new Date());
								gtag('config', '${GA_ID}', {
									page_title: '${title || document?.title || ''}',
									page_location: window.location.href,
									anonymize_ip: true,
									allow_google_signals: false,
									allow_ad_personalization_signals: false,
								});
								
								// Track page view if path is provided
								${path ? `gtag('config', '${GA_ID}', { page_path: '${path}' });` : ''}
								
								console.log('✅ Google Analytics loaded for page: ${title || 'Unknown'}');
							`,
						}}
					/>
				</>
			)}

			{/* Umami Analytics */}
			{ENABLE_UMAMI && UMAMI_ID && UMAMI_SRC && (
				<script
					async
					src={UMAMI_SRC}
					data-website-id={UMAMI_ID}
					data-domains="faviconify.online"
					onLoad={() => {
						console.log('✅ Umami Analytics loaded for page:', title || 'Unknown')
					}}
				/>
			)}

			{/* Splitbee Analytics */}
			{ENABLE_SPLITBEE && (
				<script
					async
					src="https://cdn.splitbee.io/sb.js"
					onLoad={() => {
						console.log('✅ Splitbee Analytics loaded for page:', title || 'Unknown')
					}}
				/>
			)}
		</Head>
	)
}

export { PageAnalytics }
