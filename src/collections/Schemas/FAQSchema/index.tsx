import React from 'react'
import type { Faq } from '@/payload-types'
import removeHTMLTags from '@/utilities/removeHTMLTags'

interface FAQQuestion {
  question: string
  answer_html?: string | null
}

interface FAQSchemaProps {
  // We expect an array of FAQ blocks, each with a "faqs" property of type Faq.
  faqBlocks: Array<{ blockType: 'faqBlock'; faqs: Faq }>
}

const FAQSchema: React.FC<FAQSchemaProps> = ({ faqBlocks }) => {
  // Combine all questions from all FAQ blocks into one array.
  const questions = faqBlocks.flatMap((block) => {
    const faqData = block.faqs
    if (faqData && Array.isArray(faqData.questions)) {
      return faqData.questions.map((q: FAQQuestion) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: removeHTMLTags(q.answer_html ?? ''),
        },
      }))
    }
    return []
  })

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData, null, 2) }}
    />
  )
}

export default FAQSchema
