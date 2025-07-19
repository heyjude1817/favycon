import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'

const FaviconGeneratorPage = () => {
	const router = useRouter()

	useEffect(() => {
		// Redirect to home page
		router.replace('/')
	}, [router])

	// Return null or a loading state while redirecting
	return null
}

export const getStaticProps: GetStaticProps = () => {
	return {
		props: {},
	}
}

export default FaviconGeneratorPage
