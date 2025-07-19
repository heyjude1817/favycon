import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { PageAnalytics } from 'components/page-analytics'

const AnalyticsTest: NextPage = () => {
	const [status, setStatus] = useState<string[]>([])

	const addStatus = (message: string) => {
		setStatus((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
		console.log(message)
	}

	useEffect(() => {
		addStatus('Page loaded with direct analytics injection')

		// Check analytics availability every second for 10 seconds
		let checks = 0
		const interval = setInterval(() => {
			checks++

			const gaLoaded = typeof window !== 'undefined' && typeof window.gtag === 'function'
			const umamiLoaded = typeof window !== 'undefined' && typeof window.umami === 'object'
			const dataLayerExists = typeof window !== 'undefined' && Array.isArray((window as any).dataLayer)

			addStatus(`Check ${checks}: GA=${gaLoaded}, Umami=${umamiLoaded}, DataLayer=${dataLayerExists}`)

			if (checks >= 10 || (gaLoaded && umamiLoaded)) {
				clearInterval(interval)
				if (gaLoaded && umamiLoaded) {
					addStatus('✅ Both analytics loaded successfully!')
				} else if (gaLoaded) {
					addStatus('✅ Google Analytics loaded, Umami may be blocked')
				} else if (umamiLoaded) {
					addStatus('✅ Umami loaded, Google Analytics may be blocked')
				} else {
					addStatus('❌ Analytics failed to load - network may be restricted')
				}
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	const testGA = () => {
		if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
			window.gtag('event', 'test_click', {
				event_category: 'test',
				event_label: 'direct_injection_test',
			})
			addStatus('✅ GA test event sent via direct injection')
		} else {
			addStatus('❌ GA not available - may be blocked by network/adblocker')
		}
	}

	const testUmami = () => {
		if (typeof window !== 'undefined' && window.umami) {
			window.umami.track('test_click', { source: 'direct_injection_test' })
			addStatus('✅ Umami test event sent via direct injection')
		} else {
			addStatus('❌ Umami not available - may be blocked by network/adblocker')
		}
	}

	const testDataLayer = () => {
		if (typeof window !== 'undefined' && (window as any).dataLayer) {
			;(window as any).dataLayer.push({
				event: 'custom_test',
				test_type: 'direct_injection',
				timestamp: new Date().toISOString(),
			})
			addStatus('✅ DataLayer test event sent directly')
		} else {
			addStatus('❌ DataLayer not available')
		}
	}

	return (
		<>
			{/* Direct Analytics Injection */}
			<PageAnalytics title="Analytics Test - Direct Injection" path="/analytics-test-direct" />

			<div style={{ padding: '20px', fontFamily: 'monospace' }}>
				<h1>Analytics Test - Direct Script Injection</h1>

				<div style={{ marginBottom: '20px' }}>
					<button onClick={testGA} style={{ margin: '5px', padding: '10px' }}>
						Test Google Analytics
					</button>
					<button onClick={testUmami} style={{ margin: '5px', padding: '10px' }}>
						Test Umami
					</button>
					<button onClick={testDataLayer} style={{ margin: '5px', padding: '10px' }}>
						Test DataLayer Direct
					</button>
				</div>

				<h2>Status Log</h2>
				<div
					style={{
						background: '#f0f0f0',
						padding: '10px',
						height: '400px',
						overflow: 'auto',
						border: '1px solid #ccc',
						fontSize: '12px',
					}}
				>
					{status.map((msg, index) => (
						<div key={index} style={{ marginBottom: '5px' }}>
							{msg}
						</div>
					))}
				</div>

				<h2>Network Troubleshooting</h2>
				<div style={{ background: '#fff3cd', padding: '15px', border: '1px solid #ffeaa7' }}>
					<h3>If analytics don&apos;t load:</h3>
					<ul>
						<li>
							<strong>Corporate Network:</strong> May block Google Analytics and tracking domains
						</li>
						<li>
							<strong>Ad Blockers:</strong> Browser extensions may block analytics scripts
						</li>
						<li>
							<strong>VPN/Proxy:</strong> May filter tracking requests
						</li>
						<li>
							<strong>Firewall:</strong> Network firewall may block external scripts
						</li>
					</ul>

					<h3>Check Browser Network Tab:</h3>
					<ul>
						<li>
							Look for failed requests to <code>googletagmanager.com</code>
						</li>
						<li>
							Look for failed requests to <code>umami-steel-one.vercel.app</code>
						</li>
						<li>Check if requests are blocked (status: blocked/failed)</li>
					</ul>
				</div>

				<h2>Environment Info</h2>
				<div style={{ background: '#f5f5f5', padding: '10px', fontSize: '12px' }}>
					<div>GA Enabled: {process.env.NEXT_PUBLIC_ENABLE_GA}</div>
					<div>GA ID: {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}</div>
					<div>Umami Enabled: {process.env.NEXT_PUBLIC_ENABLE_UMAMI}</div>
					<div>Umami ID: {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}</div>
					<div>Umami Source: {process.env.NEXT_PUBLIC_UMAMI_SRC}</div>
				</div>
			</div>
		</>
	)
}

export default AnalyticsTest
