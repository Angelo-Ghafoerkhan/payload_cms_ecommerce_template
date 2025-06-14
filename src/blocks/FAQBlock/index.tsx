'use client'

import { useState } from 'react'
import FAQAccordian from './components/FAQAccordian'
import { Faq } from '@/payload-types'

interface FAQBlockProps {
  faqs: Faq
}

const FAQBlock: React.FC<FAQBlockProps> = ({ faqs }) => {
  const { title, questions } = faqs
  const [openIndex, setOpenIndex] = useState<number | null>(null) // State to track the open accordion

  const toggleAccordion = (index: number) => {
    // Toggle the accordion: close it if it's already open, or open it if it's closed
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-background">
      <div className="container">
        <h2 className="w-11/12 mx-auto font-header mb-16 text-5xl uppercase">
          FAQ&apos;S - {title}
        </h2>
        <div>
          {questions?.map((qa, index) => {
            return (
              <FAQAccordian
                key={qa.question}
                data={qa}
                isOpen={openIndex === index}
                onToggle={() => toggleAccordion(index)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FAQBlock
