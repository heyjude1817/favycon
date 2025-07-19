import React from 'react'
import classnames from 'classnames'
import { Typography } from 'components/typography'
import { Button } from 'components/button'

import styles from './index.module.scss'

interface HeroSectionProps {
	className?: string
}

const HeroSection = ({ className }: HeroSectionProps) => {
	const handleGetStarted = () => {
		const toolSection = document.getElementById('tool')
		if (toolSection) {
			toolSection.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<section id="hero" className={classnames(styles.root, className)}>
			<div className={styles.container}>
				<div className={styles.content}>
					{/* Main Content */}
					<div className={styles.mainContent}>
						{/* Badge */}
						<div className={styles.badge}>
							<Typography variant="smallBody" weight="medium" className={styles.badgeText}>
								Free • No Registration • Privacy First
							</Typography>
						</div>

						{/* Title */}
						<Typography variant="largeTitle" weight="extraBold" className={styles.title} tag="h1">
							Generate Professional Favicons <span className={styles.highlight}>in Seconds</span>
						</Typography>

						{/* Subtitle */}
						<Typography variant="largeBody" weight="medium" className={styles.subtitle} tag="p">
							Create complete favicon packages with all sizes, formats, and HTML code. Perfect for websites, PWAs, and
							mobile apps.
						</Typography>

						{/* CTA Section */}
						<div className={styles.ctaSection}>
							<Button color="white" background="bgLink" className={styles.primaryButton} onClick={handleGetStarted}>
								Get Started Free
							</Button>
							<Typography variant="smallBody" weight="medium" className={styles.ctaNote}>
								No signup required • Generate unlimited favicons
							</Typography>
						</div>

						{/* Quick Features */}
						<div className={styles.quickFeatures}>
							<div className={styles.feature}>
								<div className={styles.featureIcon}>⚡</div>
								<Typography variant="smallBody" weight="medium" className={styles.featureText}>
									Lightning Fast
								</Typography>
							</div>
							<div className={styles.feature}>
								<div className={styles.featureIcon}>📱</div>
								<Typography variant="smallBody" weight="medium" className={styles.featureText}>
									PWA Ready
								</Typography>
							</div>
							<div className={styles.feature}>
								<div className={styles.featureIcon}>🔒</div>
								<Typography variant="smallBody" weight="medium" className={styles.featureText}>
									Privacy First
								</Typography>
							</div>
							<div className={styles.feature}>
								<div className={styles.featureIcon}>💻</div>
								<Typography variant="smallBody" weight="medium" className={styles.featureText}>
									HTML Included
								</Typography>
							</div>
						</div>
					</div>

					{/* Demo Section */}
					<div className={styles.demoSection}>
						<div className={styles.demoCard}>
							{/* Demo Header */}
							<div className={styles.demoHeader}>
								<div className={styles.demoControls}>
									<div className={styles.dot}></div>
									<div className={styles.dot}></div>
									<div className={styles.dot}></div>
								</div>
								<Typography variant="smallBody" weight="medium" className={styles.demoTitle}>
									Favicon Generator
								</Typography>
							</div>

							{/* Demo Content */}
							<div className={styles.demoContent}>
								{/* Upload Area */}
								<div className={styles.uploadArea}>
									<div className={styles.uploadIcon}>📁</div>
									<Typography variant="smallBody" weight="medium" className={styles.uploadText}>
										Drop your image here
										<br />
										or click to browse
									</Typography>
								</div>

								{/* Arrow */}
								<div className={styles.arrow}>→</div>

								{/* Result Area */}
								<div className={styles.resultArea}>
									<div className={styles.faviconGrid}>
										<div className={styles.faviconItem}>16</div>
										<div className={styles.faviconItem}>32</div>
										<div className={styles.faviconItem}>96</div>
										<div className={styles.faviconItem}>192</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export { HeroSection }
