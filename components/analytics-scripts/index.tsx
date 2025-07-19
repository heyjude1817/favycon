import Script from 'next/script'
import { ANALYTICS_CONFIG } from 'lib/analytics'

const AnalyticsScripts = () => {
	return (
		<>
			{/* Google Analytics 4 */}
			{ANALYTICS_CONFIG.ENABLE_GA && ANALYTICS_CONFIG.GA_MEASUREMENT_ID && (
				<>
					<Script
						src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA_MEASUREMENT_ID}`}
						strategy="afterInteractive"
					/>
					<Script id="google-analytics" strategy="afterInteractive">
						{`
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', '${ANALYTICS_CONFIG.GA_MEASUREMENT_ID}', {
								page_title: document.title,
								page_location: window.location.href,
								// Privacy settings
								anonymize_ip: true,
								allow_google_signals: false,
								allow_ad_personalization_signals: false,
							});
						`}
					</Script>
				</>
			)}

			{/* Umami Analytics */}
			{ANALYTICS_CONFIG.ENABLE_UMAMI && ANALYTICS_CONFIG.UMAMI_WEBSITE_ID && (
				<Script
					src={ANALYTICS_CONFIG.UMAMI_SRC}
					data-website-id={ANALYTICS_CONFIG.UMAMI_WEBSITE_ID}
					data-domains="faviconify.online"
					strategy="afterInteractive"
				/>
			)}

			{/* Splitbee Analytics (existing) */}
			{ANALYTICS_CONFIG.ENABLE_SPLITBEE && <Script src="https://cdn.splitbee.io/sb.js" strategy="afterInteractive" />}
		</>
	)
}

export { AnalyticsScripts }
