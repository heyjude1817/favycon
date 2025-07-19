import Head from 'next/head'

export interface FAQItem {
	question: string
	answer: string
}

interface FAQSchemaProps {
	faqs: FAQItem[]
}

const FAQSchema = ({ faqs }: FAQSchemaProps) => {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer,
			},
		})),
	}

	return (
		<Head>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
		</Head>
	)
}

export { FAQSchema }
