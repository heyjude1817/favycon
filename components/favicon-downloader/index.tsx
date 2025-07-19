import React, { useState } from 'react'
import classnames from 'classnames'
import { Typography } from 'components/typography'
import { Button } from 'components/button'
import { FaviconIcon, FaviconResponse } from 'pages/api/favicon-download/[domain]'

import styles from './index.module.scss'

// Utility function to fetch file as blob with proper CORS handling
const fetchFileAsBlob = async (url: string): Promise<Blob> => {
	try {
		// For data URLs, convert directly
		if (url.startsWith('data:')) {
			const response = await fetch(url)
			return response.blob()
		}

		// For external URLs, try direct fetch first
		const response = await fetch(url, {
			mode: 'cors',
			credentials: 'omit',
		})

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`)
		}

		return response.blob()
	} catch (error) {
		// If CORS fails, try using a proxy approach or fallback
		console.warn(`Direct fetch failed for ${url}, trying fallback:`, error)

		// Create a fallback by fetching through an image element
		return new Promise((resolve, reject) => {
			const img = new Image()
			img.crossOrigin = 'anonymous'

			img.onload = () => {
				const canvas = document.createElement('canvas')
				const ctx = canvas.getContext('2d')

				canvas.width = img.width
				canvas.height = img.height

				if (ctx) {
					ctx.drawImage(img, 0, 0)
					canvas.toBlob((blob) => {
						if (blob) {
							resolve(blob)
						} else {
							reject(new Error('Failed to create blob from canvas'))
						}
					}, 'image/png')
				} else {
					reject(new Error('Failed to get canvas context'))
				}
			}

			img.onerror = () => {
				reject(new Error(`Failed to load image: ${url}`))
			}

			img.src = url
		})
	}
}

// Simple ZIP file creator using browser APIs
class SimpleZipCreator {
	private files: Array<{ name: string; data: Uint8Array }> = []

	addFile(name: string, data: Uint8Array) {
		this.files.push({ name, data })
	}

	createZip(): Blob {
		// Create a simple ZIP file structure
		const zipData: Uint8Array[] = []
		const centralDirectory: Uint8Array[] = []
		let offset = 0

		for (const file of this.files) {
			// Local file header
			const fileName = new TextEncoder().encode(file.name)
			const localHeader = new Uint8Array(30 + fileName.length)
			const view = new DataView(localHeader.buffer)

			// Local file header signature
			view.setUint32(0, 0x04034b50, true)
			// Version needed to extract
			view.setUint16(4, 20, true)
			// General purpose bit flag
			view.setUint16(6, 0, true)
			// Compression method (0 = no compression)
			view.setUint16(8, 0, true)
			// File last modification time
			view.setUint16(10, 0, true)
			// File last modification date
			view.setUint16(12, 0, true)
			// CRC-32
			view.setUint32(14, this.crc32(file.data), true)
			// Compressed size
			view.setUint32(18, file.data.length, true)
			// Uncompressed size
			view.setUint32(22, file.data.length, true)
			// File name length
			view.setUint16(26, fileName.length, true)
			// Extra field length
			view.setUint16(28, 0, true)

			// Copy filename
			localHeader.set(fileName, 30)

			zipData.push(localHeader)
			zipData.push(file.data)

			// Central directory entry
			const centralEntry = new Uint8Array(46 + fileName.length)
			const centralView = new DataView(centralEntry.buffer)

			// Central file header signature
			centralView.setUint32(0, 0x02014b50, true)
			// Version made by
			centralView.setUint16(4, 20, true)
			// Version needed to extract
			centralView.setUint16(6, 20, true)
			// General purpose bit flag
			centralView.setUint16(8, 0, true)
			// Compression method
			centralView.setUint16(10, 0, true)
			// File last modification time
			centralView.setUint16(12, 0, true)
			// File last modification date
			centralView.setUint16(14, 0, true)
			// CRC-32
			centralView.setUint32(16, this.crc32(file.data), true)
			// Compressed size
			centralView.setUint32(20, file.data.length, true)
			// Uncompressed size
			centralView.setUint32(24, file.data.length, true)
			// File name length
			centralView.setUint16(28, fileName.length, true)
			// Extra field length
			centralView.setUint16(30, 0, true)
			// File comment length
			centralView.setUint16(32, 0, true)
			// Disk number start
			centralView.setUint16(34, 0, true)
			// Internal file attributes
			centralView.setUint16(36, 0, true)
			// External file attributes
			centralView.setUint32(38, 0, true)
			// Relative offset of local header
			centralView.setUint32(42, offset, true)

			// Copy filename
			centralEntry.set(fileName, 46)

			centralDirectory.push(centralEntry)
			offset += localHeader.length + file.data.length
		}

		// End of central directory record
		const centralDirSize = centralDirectory.reduce((sum, entry) => sum + entry.length, 0)
		const endRecord = new Uint8Array(22)
		const endView = new DataView(endRecord.buffer)

		// End of central dir signature
		endView.setUint32(0, 0x06054b50, true)
		// Number of this disk
		endView.setUint16(4, 0, true)
		// Number of the disk with the start of the central directory
		endView.setUint16(6, 0, true)
		// Total number of entries in the central directory on this disk
		endView.setUint16(8, this.files.length, true)
		// Total number of entries in the central directory
		endView.setUint16(10, this.files.length, true)
		// Size of the central directory
		endView.setUint32(12, centralDirSize, true)
		// Offset of start of central directory
		endView.setUint32(16, offset, true)
		// ZIP file comment length
		endView.setUint16(20, 0, true)

		// Combine all parts
		const allData = [...zipData, ...centralDirectory, endRecord]
		const totalLength = allData.reduce((sum, chunk) => sum + chunk.length, 0)
		const result = new Uint8Array(totalLength)

		let pos = 0
		for (const chunk of allData) {
			result.set(chunk, pos)
			pos += chunk.length
		}

		return new Blob([result], { type: 'application/zip' })
	}

	private crc32(data: Uint8Array): number {
		const table = new Uint32Array(256)
		for (let i = 0; i < 256; i++) {
			let c = i
			for (let j = 0; j < 8; j++) {
				c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
			}
			table[i] = c
		}

		let crc = 0xffffffff
		for (let i = 0; i < data.length; i++) {
			crc = table[(crc ^ data[i]) & 0xff] ^ (crc >>> 8)
		}
		return (crc ^ 0xffffffff) >>> 0
	}
}

// Create and download a real ZIP file
const createAndDownloadArchive = async (files: Array<{ name: string; blob: Blob }>, archiveName: string) => {
	const zip = new SimpleZipCreator()

	for (const file of files) {
		const arrayBuffer = await file.blob.arrayBuffer()
		const uint8Array = new Uint8Array(arrayBuffer)
		zip.addFile(file.name, uint8Array)
	}

	const zipBlob = zip.createZip()
	const url = window.URL.createObjectURL(zipBlob)
	const link = document.createElement('a')
	link.href = url
	link.download = archiveName
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	window.URL.revokeObjectURL(url)
}

interface FaviconDownloaderProps {
	className?: string
}

const FaviconDownloader = ({ className }: FaviconDownloaderProps) => {
	const [domain, setDomain] = useState('openai.com')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [result, setResult] = useState<FaviconResponse | null>(null)
	const [downloadingAll, setDownloadingAll] = useState(false)
	const [downloadProgress, setDownloadProgress] = useState({ current: 0, total: 0 })

	const validateDomain = (domain: string): boolean => {
		const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/
		return domainRegex.test(domain)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!domain.trim()) {
			setError('Please enter a domain name')
			return
		}

		if (!validateDomain(domain.trim())) {
			setError('Please enter a valid domain name (e.g., example.com)')
			return
		}

		setLoading(true)
		setError(null)
		setResult(null)

		try {
			const response = await fetch(`/api/favicon-download/${encodeURIComponent(domain.trim())}`)
			const data: FaviconResponse = await response.json()

			if (!response.ok) {
				throw new Error(data.statusText || 'Failed to fetch favicons')
			}

			setResult(data)
		} catch (err) {
			setError((err as Error).message || 'An error occurred while fetching favicons')
		} finally {
			setLoading(false)
		}
	}

	const downloadFavicon = async (icon: FaviconIcon, filename?: string) => {
		try {
			// Use our improved fetch function that handles CORS and ICO files
			const blob = await fetchFileAsBlob(icon.href)

			// Generate proper filename with correct extension
			const extension = getFileExtension(icon)
			const finalFilename = filename || `favicon-${icon.sizes || 'unknown'}.${extension}`

			// Create download link
			const url = window.URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.href = url
			link.download = finalFilename
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
			window.URL.revokeObjectURL(url)
		} catch (err) {
			console.error('Error downloading favicon:', err)
			// Fallback: open in new tab
			window.open(icon.href, '_blank')
		}
	}

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text)
			// Simple feedback - you could enhance this with a toast notification
			const button = document.activeElement as HTMLButtonElement
			if (button) {
				const originalText = button.textContent
				button.textContent = 'Copied!'
				setTimeout(() => {
					button.textContent = originalText
				}, 2000)
			}
		} catch (err) {
			console.error('Failed to copy:', err)
			// Fallback for older browsers
			const textArea = document.createElement('textarea')
			textArea.value = text
			document.body.appendChild(textArea)
			textArea.select()
			document.execCommand('copy')
			document.body.removeChild(textArea)
		}
	}

	const generateHtmlCode = (icon: FaviconIcon) => {
		const rel = icon.sizes === 'unknown' ? 'icon' : 'icon'
		const sizeAttr = icon.sizes && icon.sizes !== 'unknown' ? ` sizes="${icon.sizes}"` : ''
		const typeAttr = icon.type ? ` type="${icon.type}"` : ''

		return `<link rel="${rel}" href="${icon.href}"${sizeAttr}${typeAttr}>`
	}

	const downloadAllFavicons = async () => {
		if (!result || result.icons.length === 0) return

		setDownloadingAll(true)
		setDownloadProgress({ current: 0, total: result.icons.length })

		try {
			// Create a simple archive with all favicon files
			const files: Array<{ name: string; blob: Blob }> = []

			// Download all favicon files
			for (let i = 0; i < result.icons.length; i++) {
				const icon = result.icons[i]
				try {
					const blob = await fetchFileAsBlob(icon.href)
					const fileName = `${result.host}-favicon-${icon.sizes || i + 1}.${getFileExtension(icon)}`
					files.push({ name: fileName, blob })

					// Update progress
					setDownloadProgress({ current: i + 1, total: result.icons.length })
				} catch (err) {
					console.error(`Error downloading favicon ${i + 1}:`, err)
					// Continue with other files even if one fails
				}
			}

			if (files.length === 0) {
				throw new Error('No favicon files could be downloaded')
			}

			// If only one file, download it directly
			if (files.length === 1) {
				const file = files[0]
				const url = window.URL.createObjectURL(file.blob)
				const link = document.createElement('a')
				link.href = url
				link.download = file.name
				document.body.appendChild(link)
				link.click()
				document.body.removeChild(link)
				window.URL.revokeObjectURL(url)
			} else {
				// Create a simple archive file with all favicons
				await createAndDownloadArchive(files, `${result.host}-favicons.zip`)
			}

			// Reset state after successful download
			setTimeout(() => {
				setDownloadingAll(false)
				setDownloadProgress({ current: 0, total: 0 })
			}, 1000)
		} catch (err) {
			console.error('Error downloading all favicons:', err)
			setDownloadingAll(false)
			setDownloadProgress({ current: 0, total: 0 })
		}
	}

	const getFileExtension = (icon: FaviconIcon): string => {
		// First check MIME type
		if (icon.type) {
			const typeMap: { [key: string]: string } = {
				'image/x-icon': 'ico',
				'image/vnd.microsoft.icon': 'ico',
				'image/icon': 'ico',
				'image/png': 'png',
				'image/svg+xml': 'svg',
				'image/gif': 'gif',
				'image/jpeg': 'jpg',
				'image/jpg': 'jpg',
				'image/webp': 'webp',
				'image/bmp': 'bmp',
				'image/tiff': 'tiff',
			}
			if (typeMap[icon.type]) {
				return typeMap[icon.type]
			}
		}

		// Then check URL extension
		const url = icon.href.toLowerCase()
		if (url.includes('.ico') || url.includes('favicon.ico')) return 'ico'
		if (url.includes('.svg')) return 'svg'
		if (url.includes('.gif')) return 'gif'
		if (url.includes('.jpg') || url.includes('.jpeg')) return 'jpg'
		if (url.includes('.webp')) return 'webp'
		if (url.includes('.bmp')) return 'bmp'
		if (url.includes('.tiff') || url.includes('.tif')) return 'tiff'
		if (url.includes('.png')) return 'png'

		// Special handling for common favicon paths
		if (url.includes('/favicon') && !url.includes('.')) return 'ico'
		if (url.includes('apple-touch-icon')) return 'png'
		if (url.includes('android-chrome')) return 'png'

		// Default to PNG for unknown types
		return 'png'
	}

	return (
		<section className={classnames(styles.root, className)}>
			<div className={styles.container}>
				{/* Header */}
				<div className={styles.header}>
					<Typography variant="largeTitle" weight="extraBold" className={styles.title} tag="h1">
						Favicon Downloader
					</Typography>
					<Typography variant="largeBody" weight="medium" className={styles.subtitle} tag="p">
						Extract and download favicons from any website. Get all available sizes and formats instantly.
					</Typography>
				</div>

				{/* Search Form */}
				<form onSubmit={handleSubmit} className={styles.searchForm}>
					<div className={styles.inputGroup}>
						<input
							type="text"
							value={domain}
							onChange={(e) => setDomain(e.target.value)}
							placeholder="Enter domain name (e.g., openai.com)"
							className={styles.input}
							disabled={loading}
						/>
						<Button type="submit" color="white" background="bgLink" className={styles.searchButton} disabled={loading}>
							{loading ? 'Searching...' : 'Get Favicons'}
						</Button>
					</div>
					{error && (
						<div className={styles.error}>
							<Typography variant="regularBody" weight="medium" className={styles.errorText}>
								{error}
							</Typography>
						</div>
					)}
				</form>

				{/* Loading State */}
				{loading && (
					<div className={styles.loading}>
						<div className={styles.spinner}></div>
						<Typography variant="regularBody" weight="medium" className={styles.loadingText}>
							Extracting favicons from {domain}...
						</Typography>
					</div>
				)}

				{/* How to Use Guide */}
				{!result && !loading && (
					<div className={styles.guide}>
						<Typography variant="title" weight="bold" className={styles.guideTitle}>
							How to Use Favicon Downloader
						</Typography>
						<div className={styles.guideSteps}>
							<div className={styles.guideStep}>
								<div className={styles.stepNumber}>1</div>
								<div className={styles.stepContent}>
									<Typography variant="regularBody" weight="bold" className={styles.stepTitle}>
										Enter Domain Name
									</Typography>
									<Typography variant="regularBody" weight="medium" className={styles.stepDescription}>
										Type the website domain (e.g., openai.com, github.com) in the search box above.
									</Typography>
								</div>
							</div>
							<div className={styles.guideStep}>
								<div className={styles.stepNumber}>2</div>
								<div className={styles.stepContent}>
									<Typography variant="regularBody" weight="bold" className={styles.stepTitle}>
										Extract Favicons
									</Typography>
									<Typography variant="regularBody" weight="medium" className={styles.stepDescription}>
										Click &quot;Get Favicons&quot; to scan the website and extract all available favicon sizes and
										formats.
									</Typography>
								</div>
							</div>
							<div className={styles.guideStep}>
								<div className={styles.stepNumber}>3</div>
								<div className={styles.stepContent}>
									<Typography variant="regularBody" weight="bold" className={styles.stepTitle}>
										Download & Use
									</Typography>
									<Typography variant="regularBody" weight="medium" className={styles.stepDescription}>
										Download any favicon size or copy the HTML code to implement on your website.
									</Typography>
								</div>
							</div>
						</div>

						{/* Example Domains */}
						<div className={styles.examples}>
							<Typography variant="regularBody" weight="medium" className={styles.examplesTitle}>
								Try these popular websites:
							</Typography>
							<div className={styles.exampleTags}>
								{['openai.com', 'github.com', 'google.com', 'apple.com', 'microsoft.com'].map((exampleDomain) => (
									<button key={exampleDomain} className={styles.exampleTag} onClick={() => setDomain(exampleDomain)}>
										{exampleDomain}
									</button>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Results */}
				{result && (
					<div className={styles.results}>
						<div className={styles.resultHeader}>
							<Typography variant="title" weight="bold" className={styles.resultTitle}>
								Found {result.icons.length} favicon{result.icons.length !== 1 ? 's' : ''} for {result.host}
							</Typography>
							<Typography variant="smallBody" weight="medium" className={styles.resultMeta}>
								Processed in {result.duration} • Status: {result.status}
							</Typography>
							{result.icons.length > 1 && (
								<div className={styles.downloadAllSection}>
									<Button
										color="white"
										background="bgGreen"
										className={styles.downloadAllButton}
										onClick={downloadAllFavicons}
										disabled={downloadingAll}
									>
										{downloadingAll
											? downloadProgress.total > 0
												? `Downloading ${downloadProgress.current}/${downloadProgress.total} files...`
												: 'Preparing download...'
											: `Download All as ZIP (${result.icons.length} files)`}
									</Button>
									{downloadingAll && downloadProgress.total > 0 && (
										<div className={styles.progressContainer}>
											<div className={styles.progressBar}>
												<div
													className={styles.progressFill}
													style={{ width: `${(downloadProgress.current / downloadProgress.total) * 100}%` }}
												></div>
											</div>
											<Typography variant="smallBody" weight="medium" className={styles.progressText}>
												{downloadProgress.current} of {downloadProgress.total} files downloaded
											</Typography>
										</div>
									)}
									{!downloadingAll && (
										<Typography variant="smallBody" weight="medium" className={styles.downloadAllNote}>
											Downloads all favicon files in a single ZIP archive
										</Typography>
									)}
								</div>
							)}
						</div>

						<div className={styles.iconGrid}>
							{result.icons.map((icon, index) => (
								<div key={index} className={styles.iconCard}>
									<div className={styles.iconPreview}>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={icon.href}
											alt={`Favicon ${icon.sizes}`}
											className={styles.iconImage}
											onError={(e) => {
												const target = e.target as HTMLImageElement
												target.style.display = 'none'
											}}
										/>
									</div>
									<div className={styles.iconInfo}>
										<Typography variant="smallBody" weight="bold" className={styles.iconSize}>
											{icon.sizes || 'Unknown size'}
										</Typography>
										{icon.type && (
											<Typography variant="smallBody" weight="medium" className={styles.iconType}>
												{icon.type}
											</Typography>
										)}
									</div>
									<div className={styles.iconActions}>
										<Button
											size="small"
											color="white"
											background="bgLink"
											className={styles.downloadButton}
											onClick={() => downloadFavicon(icon)}
										>
											Download
										</Button>
										<Button
											size="small"
											color="link"
											background="transparent"
											className={styles.codeButton}
											onClick={() => copyToClipboard(generateHtmlCode(icon))}
										>
											Copy HTML
										</Button>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</section>
	)
}

export { FaviconDownloader }
