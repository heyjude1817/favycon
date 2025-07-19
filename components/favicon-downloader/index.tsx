import React, { useState } from 'react'
import classnames from 'classnames'
import { Typography } from 'components/typography'
import { Button } from 'components/button'
import { FaviconIcon, FaviconResponse } from 'pages/api/favicon-download/[domain]'

import styles from './index.module.scss'

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

	const downloadAllFavicons = () => {
		if (!result || result.icons.length === 0) return

		setDownloadingAll(true)

		try {
			// First, download the HTML file with all favicon information
			const htmlContent = generateAllFaviconsHtml(result)
			const blob = new Blob([htmlContent], { type: 'text/html' })
			const url = window.URL.createObjectURL(blob)

			const link = document.createElement('a')
			link.href = url
			link.download = `${result.host}-favicons-info.html`
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)

			window.URL.revokeObjectURL(url)

			// Show user notification about multiple downloads
			if (result.icons.length > 1) {
				const userConfirmed = confirm(
					`This will download ${result.icons.length} favicon files. Your browser may ask for permission to download multiple files. Click OK to continue.`
				)

				if (!userConfirmed) {
					setDownloadingAll(false)
					return
				}
			}

			// Initialize progress tracking
			setDownloadProgress({ current: 0, total: result.icons.length })

			// Download individual favicon files with delay to avoid browser blocking
			let downloadCount = 0
			for (let i = 0; i < result.icons.length; i++) {
				const icon = result.icons[i]
				setTimeout(async () => {
					try {
						await downloadFavicon(icon, `${result.host}-favicon-${icon.sizes || i + 1}.${getFileExtension(icon)}`)
						downloadCount++

						// Update progress
						setDownloadProgress({ current: downloadCount, total: result.icons.length })

						// Reset state when all downloads complete
						if (downloadCount === result.icons.length) {
							setTimeout(() => {
								setDownloadingAll(false)
								setDownloadProgress({ current: 0, total: 0 })
							}, 1500)
						}
					} catch (err) {
						console.error(`Error downloading favicon ${i + 1}:`, err)
						downloadCount++
						setDownloadProgress({ current: downloadCount, total: result.icons.length })

						if (downloadCount === result.icons.length) {
							setTimeout(() => {
								setDownloadingAll(false)
								setDownloadProgress({ current: 0, total: 0 })
							}, 1500)
						}
					}
				}, i * 800) // 800ms delay between downloads
			}
		} catch (err) {
			console.error('Error downloading all favicons:', err)
			setDownloadingAll(false)
		}
	}

	const generateAllFaviconsHtml = (result: FaviconResponse) => {
		const htmlCode = result.icons.map((icon) => generateHtmlCode(icon)).join('\n    ')

		return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Favicons for ${result.host} - Faviconify</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 900px; margin: 0 auto; padding: 20px;
            line-height: 1.6; color: #333;
        }
        .header { text-align: center; margin-bottom: 40px; }
        .stats { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .favicon-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .favicon-item {
            text-align: center;
            padding: 15px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            background: white;
        }
        .favicon-item img {
            max-width: 64px;
            max-height: 64px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-bottom: 8px;
        }
        .favicon-size { font-weight: bold; color: #3b82f6; }
        .favicon-type { font-size: 0.85em; color: #64748b; }
        .code-section { margin: 30px 0; }
        .code-block {
            background: #1e293b;
            color: #e2e8f0;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 14px;
        }
        .copy-button {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }
        .download-section { margin: 30px 0; }
        .download-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 15px;
        }
        .download-item {
            display: flex;
            align-items: center;
            padding: 12px;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            text-decoration: none;
            color: #374151;
            transition: all 0.2s;
        }
        .download-item:hover {
            border-color: #3b82f6;
            background: #f8fafc;
        }
        .download-icon {
            width: 32px;
            height: 32px;
            margin-right: 12px;
            border-radius: 4px;
        }
        .footer {
            text-align: center;
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎯 Favicons for ${result.host}</h1>
        <p>Complete favicon package extracted and ready to use</p>
    </div>

    <div class="stats">
        <strong>📊 Extraction Summary:</strong><br>
        • Generated on: ${new Date().toLocaleString()}<br>
        • Total icons found: ${result.icons.length}<br>
        • Processing time: ${result.duration}<br>
        • Status: ${result.status} ${result.statusText}
    </div>

    <h2>🖼️ Favicon Preview</h2>
    <div class="favicon-grid">
        ${result.icons
					.map(
						(icon) => `
        <div class="favicon-item">
            <img src="${icon.href}" alt="Favicon ${icon.sizes}" onerror="this.style.display='none'">
            <div class="favicon-size">${icon.sizes || 'Unknown'}</div>
            <div class="favicon-type">${icon.type || 'Unknown type'}</div>
        </div>`
					)
					.join('')}
    </div>

    <div class="code-section">
        <h2>📝 HTML Implementation Code</h2>
        <p>Copy and paste this code into your HTML &lt;head&gt; section:</p>
        <div class="code-block"><pre><code>&lt;!-- Favicon implementation for ${result.host} --&gt;
${htmlCode}</code></pre></div>
        <button class="copy-button" onclick="copyToClipboard()">📋 Copy HTML Code</button>
    </div>

    <div class="download-section">
        <h2>⬇️ Individual Downloads</h2>
        <div class="download-grid">
            ${result.icons
							.map(
								(icon, index) => `
            <a href="${icon.href}"
               download="${result.host}-favicon-${icon.sizes || index + 1}.${getFileExtension(icon)}"
               class="download-item"
               target="_blank">
                <img src="${icon.href}" alt="" class="download-icon" onerror="this.style.display='none'">
                <div>
                    <div><strong>${icon.sizes || 'Unknown size'}</strong></div>
                    <div style="font-size: 0.9em; color: #64748b;">${icon.type || 'Unknown type'}</div>
                </div>
            </a>`
							)
							.join('')}
        </div>
    </div>

    <div class="footer">
        <p>Generated by <strong>Faviconify</strong> - Free Favicon Generator & Downloader</p>
        <p><a href="https://faviconify.com" target="_blank">🔗 Visit Faviconify.com</a></p>
    </div>

    <script>
        function copyToClipboard() {
            const codeBlock = document.querySelector('.code-block code');
            const text = codeBlock.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const button = document.querySelector('.copy-button');
                const originalText = button.textContent;
                button.textContent = '✅ Copied!';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
    </script>
</body>
</html>`
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
											: `Download All ${result.icons.length} Favicons`}
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
											Downloads HTML file + all favicon files
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
