import type { NextApiRequest, NextApiResponse } from 'next'

export interface FaviconIcon {
	sizes?: string
	href: string
	type?: string
}

export interface FaviconResponse {
	url: string
	host: string
	status: number
	statusText: string
	duration: string
	icons: FaviconIcon[]
}

// Function to fetch favicons from a given URL
const getFavicons = async (url: string): Promise<FaviconResponse> => {
	const startTime = Date.now()
	const newUrl = new URL(url)

	try {
		// Perform the fetch request with redirection follow
		const response = await fetch(newUrl.toString(), {
			method: 'GET',
			redirect: 'follow',
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
			},
		})

		const body = await response.text()
		const responseUrl = new URL(response.url)

		// Regex to match <link> tags with "rel" containing "icon"
		const regex = /<link[^>]*rel=['"]?[^\s]*icon[^>]*?>/gi
		const matches = Array.from(body.matchAll(regex))

		const icons: FaviconIcon[] = []

		matches.forEach((match) => {
			const linkTag = match[0]

			// Extract href value
			const hrefMatch = linkTag.match(/href=['"]?([^\s>'"]*)['"]/i)
			const href = hrefMatch ? hrefMatch[1] : null

			// Extract sizes value
			const sizesMatch = linkTag.match(/sizes=['"]?([^\s>'"]*)['"]/i)
			const sizes = sizesMatch ? sizesMatch[1] : null

			// Extract type value
			const typeMatch = linkTag.match(/type=['"]?([^\s>'"]*)['"]/i)
			const type = typeMatch ? typeMatch[1] : null

			if (href) {
				const fullHref =
					href.startsWith('http') || href.startsWith('data:image')
						? href
						: `${responseUrl.protocol}//${responseUrl.host}${href.startsWith('/') ? href : `/${href}`}`

				icons.push({
					sizes: sizes || 'unknown',
					href: fullHref,
					type: type || undefined,
				})
			}
		})

		const duration = ((Date.now() - startTime) / 1000).toFixed(3)

		return {
			url: responseUrl.href,
			host: responseUrl.host,
			status: response.status,
			statusText: response.statusText,
			duration: `${duration}s`,
			icons,
		}
	} catch (error) {
		console.error(`Error fetching favicons: ${(error as Error).message}`)
		const duration = ((Date.now() - startTime) / 1000).toFixed(3)

		return {
			url: newUrl.href,
			host: newUrl.host,
			status: 500,
			statusText: 'Failed to fetch icons',
			duration: `${duration}s`,
			icons: [],
		}
	}
}

// Function to fetch favicon from alternative sources
const getAlternativeFavicons = async (domain: string): Promise<FaviconIcon[]> => {
	const sources = [
		`https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`,
		`https://icons.duckduckgo.com/ip3/${encodeURIComponent(domain)}.ico`,
	]

	const icons: FaviconIcon[] = []

	for (const source of sources) {
		try {
			const response = await fetch(source, {
				method: 'HEAD',
				redirect: 'follow',
			})

			if (response.ok) {
				icons.push({
					href: source,
					sizes: source.includes('google') ? '64x64' : 'unknown',
					type: source.includes('.ico') ? 'image/x-icon' : 'image/png',
				})
			}
		} catch (error) {
			console.error(`Error fetching from ${source}: ${(error as Error).message}`)
		}
	}

	return icons
}

// Generate fallback SVG favicon
const generateFallbackFavicon = (domain: string): FaviconIcon => {
	const firstLetter = domain.charAt(0).toUpperCase()
	const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
		<rect width="64" height="64" fill="#3b82f6"/>
		<text x="32" y="40" font-family="Arial, sans-serif" font-size="32" font-weight="bold" text-anchor="middle" fill="white">${firstLetter}</text>
	</svg>`

	const base64Svg = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`

	return {
		sizes: '64x64',
		href: base64Svg,
		type: 'image/svg+xml',
	}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<FaviconResponse>) {
	if (req.method !== 'GET') {
		return res.status(405).json({
			url: '',
			host: '',
			status: 405,
			statusText: 'Method Not Allowed',
			duration: '0s',
			icons: [],
		})
	}

	const { domain } = req.query

	if (!domain || typeof domain !== 'string') {
		return res.status(400).json({
			url: '',
			host: '',
			status: 400,
			statusText: 'Bad Request - Domain parameter required',
			duration: '0s',
			icons: [],
		})
	}

	// Validate domain name format
	const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/
	if (!domainRegex.test(domain)) {
		return res.status(400).json({
			url: '',
			host: '',
			status: 400,
			statusText: `Invalid domain name format: ${domain}`,
			duration: '0s',
			icons: [],
		})
	}

	const startTime = Date.now()
	let result: FaviconResponse

	// Try HTTP first
	try {
		result = await getFavicons(`http://${domain}`)
		if (result.icons.length > 0) {
			return res.status(200).json(result)
		}
	} catch (error) {
		console.error('Error fetching HTTP favicons:', (error as Error).message)
	}

	// Try HTTPS
	try {
		result = await getFavicons(`https://${domain}`)
		if (result.icons.length > 0) {
			return res.status(200).json(result)
		}
	} catch (error) {
		console.error('Error fetching HTTPS favicons:', (error as Error).message)
	}

	// Try alternative sources
	const alternativeIcons = await getAlternativeFavicons(domain)
	if (alternativeIcons.length > 0) {
		const duration = ((Date.now() - startTime) / 1000).toFixed(3)
		return res.status(200).json({
			url: `https://${domain}`,
			host: domain,
			status: 200,
			statusText: 'OK',
			duration: `${duration}s`,
			icons: alternativeIcons,
		})
	}

	// Generate fallback favicon
	const fallbackIcon = generateFallbackFavicon(domain)
	const duration = ((Date.now() - startTime) / 1000).toFixed(3)

	return res.status(200).json({
		url: `https://${domain}`,
		host: domain,
		status: 200,
		statusText: 'OK',
		duration: `${duration}s`,
		icons: [fallbackIcon],
	})
}
