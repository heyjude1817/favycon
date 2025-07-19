/**
 * Smooth scroll to element by ID with optional offset
 */
export const scrollToElement = (elementId: string, offset: number = 80): void => {
	const element = document.getElementById(elementId)
	if (!element) {
		console.warn(`Element with ID "${elementId}" not found`)
		return
	}

	const elementPosition = element.getBoundingClientRect().top
	const offsetPosition = elementPosition + window.pageYOffset - offset

	window.scrollTo({
		top: offsetPosition,
		behavior: 'smooth',
	})
}

/**
 * Smooth scroll to top of page
 */
export const scrollToTop = (): void => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})
}

/**
 * Get current scroll position
 */
export const getScrollPosition = (): number => {
	return window.pageYOffset || document.documentElement.scrollTop
}

/**
 * Check if element is in viewport
 */
export const isElementInViewport = (element: Element, offset: number = 0): boolean => {
	const rect = element.getBoundingClientRect()
	const windowHeight = window.innerHeight || document.documentElement.clientHeight

	return rect.top >= -offset && rect.bottom <= windowHeight + offset
}

/**
 * Throttle function for scroll events
 */
export const throttle = <T extends (...args: any[]) => any>(
	func: T,
	delay: number
): ((...args: Parameters<T>) => void) => {
	let timeoutId: NodeJS.Timeout | null = null
	let lastExecTime = 0

	return (...args: Parameters<T>) => {
		const currentTime = Date.now()

		if (currentTime - lastExecTime > delay) {
			func(...args)
			lastExecTime = currentTime
		} else {
			if (timeoutId) {
				clearTimeout(timeoutId)
			}
			timeoutId = setTimeout(
				() => {
					func(...args)
					lastExecTime = Date.now()
				},
				delay - (currentTime - lastExecTime)
			)
		}
	}
}
