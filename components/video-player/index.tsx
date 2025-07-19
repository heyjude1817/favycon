import React, { useState, useRef, useEffect } from 'react'
import classnames from 'classnames'
import Image from 'next/image'
import { Typography } from 'components/typography'

import styles from './index.module.scss'

interface VideoPlayerProps {
	youtubeId?: string
	localVideoSrc?: string
	fallbackImages?: string[]
	className?: string
}

const defaultFallbackImages = [
	'/images/unsplash-horizontal.jpg',
	'/images/dnd-light.png',
	'/images/dnd-dark.png'
]

const VideoPlayer = ({
	youtubeId,
	localVideoSrc,
	fallbackImages = defaultFallbackImages,
	className
}: VideoPlayerProps) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [showFallback, setShowFallback] = useState(false)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const videoRef = useRef<HTMLVideoElement>(null)

	// Auto-rotate fallback images
	useEffect(() => {
		if (showFallback && fallbackImages.length > 1) {
			const interval = setInterval(() => {
				setCurrentImageIndex((prev) => (prev + 1) % fallbackImages.length)
			}, 3000)
			return () => clearInterval(interval)
		}
	}, [showFallback, fallbackImages.length])

	const handlePlayClick = () => {
		if (youtubeId) {
			// For YouTube videos, we'll embed the iframe
			setIsPlaying(true)
		} else if (localVideoSrc && videoRef.current) {
			// For local videos, play the video element
			videoRef.current.play()
			setIsPlaying(true)
		} else {
			// Show fallback carousel
			setShowFallback(true)
		}
	}

	const handleVideoError = () => {
		setShowFallback(true)
	}

	// YouTube embed URL
	const youtubeEmbedUrl = youtubeId
		? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`
		: null

	return (
		<div className={classnames(styles.root, className)}>
			<div className={styles.videoContainer}>
				{/* YouTube Video */}
				{youtubeId && isPlaying && (
					<iframe
						className={styles.iframe}
						src={youtubeEmbedUrl}
						title="Favicon Generator Demo"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				)}

				{/* Local Video */}
				{localVideoSrc && !showFallback && (
					<video
						ref={videoRef}
						className={styles.video}
						controls={isPlaying}
						onError={handleVideoError}
						poster="/images/unsplash-horizontal.jpg"
					>
						<source src={localVideoSrc} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				)}

				{/* Fallback Image Carousel */}
				{(showFallback || (!youtubeId && !localVideoSrc)) && (
					<div className={styles.fallbackContainer}>
						<div className={styles.imageCarousel}>
							{fallbackImages.map((image, index) => (
								<div
									key={index}
									className={classnames(styles.imageSlide, {
										[styles.active]: index === currentImageIndex
									})}
								>
									<Image
										src={image}
										alt={`Demo screenshot ${index + 1}`}
										fill
										style={{ objectFit: 'cover' }}
									/>
								</div>
							))}
						</div>
						<div className={styles.carouselDots}>
							{fallbackImages.map((_, index) => (
								<button
									key={index}
									className={classnames(styles.dot, {
										[styles.active]: index === currentImageIndex
									})}
									onClick={() => setCurrentImageIndex(index)}
									aria-label={`Go to slide ${index + 1}`}
								/>
							))}
						</div>
					</div>
				)}

				{/* Play Button Overlay */}
				{!isPlaying && !showFallback && (youtubeId || localVideoSrc) && (
					<div className={styles.playOverlay} onClick={handlePlayClick}>
						<div className={styles.playButton}>
							<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
								<circle cx="30" cy="30" r="30" fill="rgba(0, 0, 0, 0.8)" />
								<path
									d="M23 20L23 40L40 30L23 20Z"
									fill="white"
								/>
							</svg>
						</div>
						<Typography variant="regularBody" weight="medium" className={styles.playText}>
							Click to play demo
						</Typography>
					</div>
				)}

				{/* Thumbnail for non-video content */}
				{!youtubeId && !localVideoSrc && !showFallback && (
					<div className={styles.thumbnail} onClick={() => setShowFallback(true)}>
						<Image
							src="/images/unsplash-horizontal.jpg"
							alt="Favicon generator demo thumbnail"
							fill
							style={{ objectFit: 'cover' }}
						/>
						<div className={styles.playOverlay}>
							<div className={styles.playButton}>
								<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
									<circle cx="30" cy="30" r="30" fill="rgba(0, 0, 0, 0.8)" />
									<path
										d="M23 20L23 40L40 30L23 20Z"
										fill="white"
									/>
								</svg>
							</div>
							<Typography variant="regularBody" weight="medium" className={styles.playText}>
								View demo screenshots
							</Typography>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export { VideoPlayer }
