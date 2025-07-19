import React, { useState } from 'react'
import classnames from 'classnames'
import { Typography } from 'components/typography'
import { Button } from 'components/button'
import { FaviconIcon, FaviconResponse } from 'pages/api/favicon-download/[domain]'

import styles from './index.module.scss'

// Utility function to fetch file as blob
const fetchFileAsBlob = async (url: string): Promise<Blob> => {
	const response = await fetch(url)
	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}`)
	}
	return response.blob()
}

// Create and download a simple archive with all files
const createAndDownloadArchive = async (files: Array<{ name: string; blob: Blob }>, archiveName: string) => {
	// Create a simple text-based archive format
	let archiveContent = '# Favicon Archive\n'
	archiveContent += `# Generated on: ${new Date().toISOString()}\n`
	archiveContent += `# Total files: ${files.length}\n\n`

	for (const file of files) {
		const arrayBuffer = await file.blob.arrayBuffer()
		const uint8Array = new Uint8Array(arrayBuffer)
		const base64Data = btoa(String.fromCharCode(...uint8Array))

		archiveContent += `[FILE: ${file.name}]\n`
		archiveContent += `[SIZE: ${file.blob.size}]\n`
		archiveContent += `[TYPE: ${file.blob.type}]\n`
		archiveContent += `[DATA: ${base64Data}]\n`
		archiveContent += '[END]\n\n'
	}

	// Add extraction instructions
	archiveContent += `
# EXTRACTION INSTRUCTIONS:
# This is a simple archive format containing favicon files.
# To extract files, you can use the following JavaScript code in browser console:
#
# const content = document.body.innerText;
# const files = content.split('[FILE: ').slice(1);
# files.forEach(fileContent => {
#   const lines = fileContent.split('\\n');
#   const name = lines[0].replace(']', '');
#   const dataLine = lines.find(l => l.startsWith('[DATA: '));
#   if (dataLine) {
#     const base64 = dataLine.replace('[DATA: ', '').replace(']', '');
#     const blob = new Blob([Uint8Array.from(atob(base64), c => c.charCodeAt(0))]);
#     const url = URL.createObjectURL(blob);
#     const a = document.createElement('a');
#     a.href = url; a.download = name; a.click();
#     URL.revokeObjectURL(url);
#   }
# });
`

	const blob = new Blob([archiveContent], { type: 'text/plain' })
	const url = window.URL.createObjectURL(blob)
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
			if (icon.href.startsWith('data:')) {
				// Handle data URLs
				const link = document.createElement('a')
				link.href = icon.href
				link.download = filename || `favicon-${icon.sizes || 'unknown'}.${icon.type?.split('/')[1] || 'png'}`
				document.body.appendChild(link)
				link.click()
				document.body.removeChild(link)
			} else {
				// Handle regular URLs
				const response = await fetch(icon.href)
				const blob = await response.blob()
				const url = window.URL.createObjectURL(blob)

				const link = document.createElement('a')
				link.href = url
				link.download = filename || `favicon-${icon.sizes || 'unknown'}.${icon.type?.split('/')[1] || 'png'}`
				document.body.appendChild(link)
				link.click()
				document.body.removeChild(link)

				window.URL.revokeObjectURL(url)
			}
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
		if (icon.type) {
			const typeMap: { [key: string]: string } = {
				'image/x-icon': 'ico',
				'image/vnd.microsoft.icon': 'ico',
				'image/png': 'png',
				'image/svg+xml': 'svg',
				'image/gif': 'gif',
				'image/jpeg': 'jpg',
				'image/webp': 'webp',
			}
			return typeMap[icon.type] || 'png'
		}

		if (icon.href.includes('.ico')) return 'ico'
		if (icon.href.includes('.svg')) return 'svg'
		if (icon.href.includes('.gif')) return 'gif'
		if (icon.href.includes('.jpg') || icon.href.includes('.jpeg')) return 'jpg'
		if (icon.href.includes('.webp')) return 'webp'

		return 'png' // default
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
