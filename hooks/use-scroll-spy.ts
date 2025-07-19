import { useState, useEffect, useCallback } from 'react'

interface UseScrollSpyOptions {
	sectionIds: string[]
	offset?: number
	rootMargin?: string
}

interface UseScrollSpyReturn {
	activeSection: string | null
	scrollToSection: (sectionId: string) => void
}

/**
 * Hook for tracking which section is currently visible in the viewport
 * and providing smooth scroll functionality
 */
export const useScrollSpy = ({
	sectionIds,
	offset = 100,
	rootMargin = '-20% 0px -80% 0px',
}: UseScrollSpyOptions): UseScrollSpyReturn => {
	const [activeSection, setActiveSection] = useState<string | null>(null)

	// Smooth scroll to section
	const scrollToSection = useCallback(
		(sectionId: string) => {
			const element = document.getElementById(sectionId)
			if (element) {
				const elementPosition = element.getBoundingClientRect().top
				const offsetPosition = elementPosition + window.pageYOffset - offset

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth',
				})
			}
		},
		[offset]
	)

	useEffect(() => {
		// Check if Intersection Observer is supported
		if (!window.IntersectionObserver) {
			return
		}

		const observer = new IntersectionObserver(
			(entries) => {
				// Find the entry with the highest intersection ratio
				let maxRatio = 0
				let activeId: string | null = null

				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
						maxRatio = entry.intersectionRatio
						activeId = entry.target.id
					}
				})

				// If we found an active section, update state
				if (activeId) {
					setActiveSection(activeId)
				}
			},
			{
				rootMargin,
				threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
			}
		)

		// Observe all sections
		const elements: Element[] = []
		sectionIds.forEach((id) => {
			const element = document.getElementById(id)
			if (element) {
				observer.observe(element)
				elements.push(element)
			}
		})

		// Cleanup function
		return () => {
			elements.forEach((element) => {
				observer.unobserve(element)
			})
		}
	}, [sectionIds, rootMargin])

	return {
		activeSection,
		scrollToSection,
	}
}
