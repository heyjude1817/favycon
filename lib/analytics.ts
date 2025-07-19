// Analytics configuration and utilities
declare global {
	interface Window {
		gtag: (...args: any[]) => void
		umami?: {
			track: (event: string, data?: Record<string, any>) => void
		}
	}
}

// Analytics configuration
export const ANALYTICS_CONFIG = {
	// Google Analytics 4
	GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',

	// Umami Analytics
	UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || '',
	UMAMI_SRC: process.env.NEXT_PUBLIC_UMAMI_SRC || 'https://analytics.umami.is/script.js',

	// Feature flags
	ENABLE_GA: process.env.NEXT_PUBLIC_ENABLE_GA === 'true',
	ENABLE_UMAMI: process.env.NEXT_PUBLIC_ENABLE_UMAMI === 'true',
	ENABLE_SPLITBEE: process.env.NEXT_PUBLIC_ENABLE_SPLITBEE !== 'false', // Default enabled for backward compatibility
}

// Google Analytics functions
export const gtag = (...args: unknown[]) => {
	if (typeof window !== 'undefined' && window.gtag) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		window.gtag(...(args as Parameters<typeof window.gtag>))
	}
}

export const initGA = () => {
	if (!ANALYTICS_CONFIG.ENABLE_GA || !ANALYTICS_CONFIG.GA_MEASUREMENT_ID) {
		return
	}

	gtag('js', new Date())
	gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, {
		page_title: document.title,
		page_location: window.location.href,
	})
}

// Page view tracking
export const trackPageView = (url: string, title?: string) => {
	// Google Analytics
	if (ANALYTICS_CONFIG.ENABLE_GA && ANALYTICS_CONFIG.GA_MEASUREMENT_ID) {
		gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, {
			page_title: title || document.title,
			page_location: url,
		})
	}

	// Umami (automatically tracks page views, but we can send custom data)
	if (ANALYTICS_CONFIG.ENABLE_UMAMI && window.umami) {
		window.umami.track('pageview', {
			url,
			title: title || document.title,
		})
	}
}

// Event tracking
export interface AnalyticsEvent {
	action: string
	category?: string
	label?: string
	value?: number
	custom_parameters?: Record<string, any>
}

export const trackEvent = (event: AnalyticsEvent) => {
	const { action, category = 'engagement', label, value, custom_parameters } = event

	// Google Analytics 4
	if (ANALYTICS_CONFIG.ENABLE_GA && ANALYTICS_CONFIG.GA_MEASUREMENT_ID) {
		gtag('event', action, {
			event_category: category,
			event_label: label,
			value: value,
			...custom_parameters,
		})
	}

	// Umami
	if (ANALYTICS_CONFIG.ENABLE_UMAMI && window.umami) {
		window.umami.track(action, {
			category,
			label,
			value,
			...custom_parameters,
		})
	}
}

// Specific event tracking functions for common actions
export const analytics = {
	// File upload events
	trackFileUpload: (fileType: string, fileSize: number, dimensions?: { width: number; height: number }) => {
		trackEvent({
			action: 'file_upload',
			category: 'favicon_generation',
			label: fileType,
			value: fileSize,
			custom_parameters: {
				file_type: fileType,
				file_size: fileSize,
				...dimensions,
			},
		})
	},

	// Favicon generation events
	trackFaviconGeneration: (success: boolean, fileType: string, options: { pwa: boolean; darkMode: boolean }) => {
		trackEvent({
			action: success ? 'favicon_generated' : 'favicon_generation_failed',
			category: 'favicon_generation',
			label: fileType,
			custom_parameters: {
				file_type: fileType,
				pwa_enabled: options.pwa,
				dark_mode_enabled: options.darkMode,
			},
		})
	},

	// Download events
	trackDownload: (downloadType: 'favicon_zip' | 'individual_favicon') => {
		trackEvent({
			action: 'download',
			category: 'conversion',
			label: downloadType,
		})
	},

	// Favicon downloader events
	trackFaviconExtraction: (domain: string, faviconCount: number, success: boolean) => {
		trackEvent({
			action: success ? 'favicon_extraction_success' : 'favicon_extraction_failed',
			category: 'favicon_downloader',
			label: domain,
			value: faviconCount,
			custom_parameters: {
				domain,
				favicon_count: faviconCount,
			},
		})
	},

	// User interaction events
	trackInteraction: (element: string, action: string) => {
		trackEvent({
			action: 'user_interaction',
			category: 'engagement',
			label: `${element}_${action}`,
			custom_parameters: {
				element,
				interaction_type: action,
			},
		})
	},

	// Error tracking
	trackError: (errorType: string, errorMessage: string, context?: string) => {
		trackEvent({
			action: 'error',
			category: 'error',
			label: errorType,
			custom_parameters: {
				error_message: errorMessage,
				error_context: context,
			},
		})
	},
}

// Initialize all analytics
export const initAnalytics = () => {
	// Initialize Google Analytics
	if (ANALYTICS_CONFIG.ENABLE_GA) {
		initGA()
	}

	// Umami initializes automatically via script tag
	// Splitbee initializes in the existing code

	console.log('Analytics initialized:', {
		GA: ANALYTICS_CONFIG.ENABLE_GA,
		Umami: ANALYTICS_CONFIG.ENABLE_UMAMI,
		Splitbee: ANALYTICS_CONFIG.ENABLE_SPLITBEE,
	})
}
