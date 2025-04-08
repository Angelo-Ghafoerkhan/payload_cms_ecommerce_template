'use client'

import RichText from '@/components/RichText'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import clsx from 'clsx'
import { Plus, Minus } from 'lucide-react'

interface FAQData {
  question: string
  answer: DefaultTypedEditorState
}

interface FAQAccordianProps {
  data: FAQData
  isOpen: boolean
  onToggle: () => void
}

const FAQAccordian = ({ data, isOpen, onToggle }: FAQAccordianProps) => {
  return (
    <div
      aria-label="FAQ Accordian Button"
      className={clsx(
        'relative transition-colors delay-100 group cursor-pointer',
        isOpen ? 'text-gray-800' : 'text-foreground',
      )}
    >
      <div className="h-[2px] w-11/12 bg-border absolute top-0 left-1/2 -translate-x-1/2 z-10" />

      {/* When open add background animation */}
      <div
        className={clsx(
          'w-full h-[calc(100%+2px)] bg-tertiary absolute transition-transform rounded-2xl z-10 top-0 bottom-0 duration-300',
          isOpen ? 'scale-100' : 'scale-0',
        )}
      />

      {/* Question */}
      <div
        className={clsx(
          'w-11/12 mx-auto text-left text-2xl font-semibold flex justify-between items-center z-20 relative',
          isOpen ? 'pt-12 pb-3' : 'py-12',
        )}
        onClick={onToggle}
      >
        <h2 className={clsx(isOpen && 'text-tertiary-foreground')}>{data.question}</h2>
        <div
          className={clsx(
            'aspect-square rounded-full p-2 group-hover:bg-primary transition-colors',
            isOpen ? 'bg-primary' : '',
          )}
        >
          {!isOpen ? <Plus size={30} color="white" /> : <Minus size={30} color="white" />}
        </div>
      </div>

      <div
        className={clsx(
          'w-11/12 mx-auto z-20 relative overflow-hidden',
          isOpen ? 'pb-12 h-auto' : 'h-0',
        )}
      >
        <RichText data={data.answer} enableGutter={false} className="text-tertiary-foreground" />
      </div>
    </div>
  )
}

export default FAQAccordian
