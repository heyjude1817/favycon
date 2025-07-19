import React, { useState } from 'react'
import classnames from 'classnames'
import { DarkModeToggle } from 'components/dark-mode-toggle'
import { SvgFavycon } from 'components/svgs/svg-favycon'
import { Sticky } from 'components/sticky'
import { Typography } from 'components/typography'
import { Button } from 'components/button'
import { useScrollSpy } from 'hooks/use-scroll-spy'


import styles from './index.module.scss'

interface NavigationItem {
	id: string
	label: string
	href: string
}

const navigationItems: NavigationItem[] = [
	{ id: 'hero', label: 'Home', href: '#hero' },
	{ id: 'tool', label: 'Tool', href: '#tool' },
	{ id: 'how-it-works', label: 'How it Works', href: '#how-it-works' },
	{ id: 'features', label: 'Features', href: '#features' },
	{ id: 'faq', label: 'FAQ', href: '#faq' }
]

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const { activeSection, scrollToSection } = useScrollSpy({
		sectionIds: navigationItems.map(item => item.id),
		offset: 80
	})

	const handleNavClick = (sectionId: string) => {
		scrollToSection(sectionId)
		setIsMobileMenuOpen(false)
	}

	const handleGetStarted = () => {
		scrollToSection('tool')
		setIsMobileMenuOpen(false)
	}

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	return (
		<Sticky>
			<div className={styles.root}>
				<div className={styles.container}>
					<header className={styles.header}>
						{/* Logo and Brand */}
						<div className={styles.brand}>
							<div className={styles.logo}>
								<SvgFavycon />
							</div>
							<Typography variant="title" weight="bold" className={styles.brandName}>
								Faviconify
							</Typography>
						</div>

						{/* Desktop Navigation */}
						<nav className={styles.navigation}>
							{navigationItems.map((item) => (
								<button
									key={item.id}
									className={classnames(styles.navItem, {
										[styles.active]: activeSection === item.id
									})}
									onClick={() => handleNavClick(item.id)}
									type="button"
								>
									<Typography variant="regularBody" weight="medium">
										{item.label}
									</Typography>
								</button>
							))}
						</nav>

						{/* Right side actions */}
						<div className={styles.actions}>
							{/* Dark Mode Toggle */}
							<div className={styles.darkModeWrapper}>
								<DarkModeToggle />
							</div>

							{/* Mobile Menu Button */}
							<button
								className={styles.mobileMenuButton}
								onClick={toggleMobileMenu}
								type="button"
								aria-label="Toggle navigation menu"
							>
								<span className={classnames(styles.hamburger, {
									[styles.open]: isMobileMenuOpen
								})}>
									<span></span>
									<span></span>
									<span></span>
								</span>
							</button>
						</div>
					</header>

					{/* Mobile Navigation Menu */}
					<div className={classnames(styles.mobileMenu, {
						[styles.open]: isMobileMenuOpen
					})}>
						<nav className={styles.mobileNavigation}>
							{navigationItems.map((item) => (
								<button
									key={item.id}
									className={classnames(styles.mobileNavItem, {
										[styles.active]: activeSection === item.id
									})}
									onClick={() => handleNavClick(item.id)}
									type="button"
								>
									<Typography variant="largeBody" weight="medium">
										{item.label}
									</Typography>
								</button>
							))}
							<div className={styles.mobileCta}>
								<Button
									color="white"
									background="bgLink"
									className={styles.mobileCtaButton}
									onClick={handleGetStarted}
								>
									Get Started
								</Button>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</Sticky>
	)
}

export { Header }
