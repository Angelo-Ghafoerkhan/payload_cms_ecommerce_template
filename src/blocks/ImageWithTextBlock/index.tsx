'use client'

import React, { useState } from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import clsx from 'clsx'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import GalleryModal from '../Gallery/components/GalleryModal'

interface ImageWithTextBlockProps {
  meta: {
    removeTitle: boolean
    flipImage: boolean
    primaryBackgroundColor: boolean
  }
  title?: string
  images: Media[]
  text: SerializedEditorState
  callToAction?: {
    text?: string
    link?: string
  }
}

const ImageWithTextBlock: React.FC<ImageWithTextBlockProps> = ({
  title,
  images,
  text,
  callToAction,
  meta,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0) // Track current slide index
  const [isModalOpen, setIsModalOpen] = useState(false) // Track modal visibility
  const multipleImages = images.length > 1

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <article className={clsx(meta.primaryBackgroundColor && 'bg-primary text-primary-foreground')}>
      <div className="container py-8">
        {title && <h2 className="text-4xl mb-8 font-header">{title}</h2>}
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-8'}>
          {/* Image(s) */}

          <div className={clsx('relative min-h-96', meta.flipImage ? 'order-2' : 'order-1')}>
            <Image
              src={images[currentIndex]?.url ?? ''}
              alt={images[currentIndex]?.alt || `Image ${currentIndex + 1}`}
              fill
              className="rounded-2xl object-cover"
            />

            {/* Expand icon */}
            {multipleImages && (
              <button
                className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 text-white rounded-full"
                onClick={openModal}
              >
                <Expand size={24} />
              </button>
            )}

            {/* Slider controls */}
            {multipleImages && (
              <>
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-primary rounded-full bg-opacity-50 text-white"
                  onClick={prevSlide}
                >
                  <ChevronLeft size={24} color="white" />
                </button>
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-primary rounded-full bg-opacity-50 text-white"
                  onClick={nextSlide}
                >
                  <ChevronRight size={24} color="white" />
                </button>
              </>
            )}
          </div>

          {/* Text */}
          <div className={clsx('py-8', meta.flipImage ? 'order-1' : 'order-2')}>
            <RichText
              data={text}
              enableGutter={false}
              className={clsx(meta.primaryBackgroundColor && '!text-white prose-invert')}
            />
          </div>
        </div>

        <GalleryModal onClose={closeModal} isOpen={isModalOpen}>
          <div className="relative w-[90vw] h-[80vh]">
            <Image
              src={images[currentIndex]?.url ?? ''}
              alt={images[currentIndex]?.alt || `Image ${currentIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>
        </GalleryModal>
      </div>
    </article>
  )
}

export default ImageWithTextBlock
