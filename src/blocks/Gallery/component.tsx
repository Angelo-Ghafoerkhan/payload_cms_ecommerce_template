'use client'

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import GalleryModal from './components/GalleryModal'
import { Media } from '@/payload-types'
import ItemLoaderShimmer from '@/components/Loaders/ItemLoaderShimmer'

interface GalleryBlockProps {
  gallery: {
    id: string
  }
}

interface GalleryType {
  name: string
  text: string
  images: Media[]
}

export const GalleryBlock: FC<GalleryBlockProps> = ({ gallery }) => {
  const [galleryContent, setGalleryContent] = useState<GalleryType | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeImage, setActiveImage] = useState<null | string>(null)
  const [error, setError] = useState<string | null>(null)

  const imagesPerPage = 8

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(
          `/api/galleries/${gallery.id}?depth=1&draft=false&locale=undefined`,
          { cache: 'no-store' },
        )

        if (!response.ok) {
          throw new Error(`Error fetching gallery: ${response.statusText}`)
        }

        const galleryData = await response.json()
        setGalleryContent(galleryData)
      } catch (error) {
        setError((error as Error).message)
      }
    }

    fetchGallery()
  }, [gallery])

  const indexOfLastImage = currentPage * imagesPerPage
  const indexOfFirstImage = indexOfLastImage - imagesPerPage
  const currentImages = galleryContent?.images.slice(indexOfFirstImage, indexOfLastImage) || []

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  if (error) {
    return (
      <div className="my-[200px]">
        <div className="max-w-[var(--max-width)] mx-auto w-11/12">
          <div className="text-red-500">
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {activeImage && (
        <GalleryModal onClose={() => setActiveImage(null)} isOpen={activeImage !== null}>
          <div className="w-[90vw] h-[80vh]">
            <Image
              src={activeImage}
              fill
              alt=""
              objectFit="contain"
              draggable={false}
              onClick={() => {}}
            />
          </div>
        </GalleryModal>
      )}

      <div className="container text-card-foreground">
        {!galleryContent ? (
          <div className="border py-16 rounded border-border bg-card container ">
            <ItemLoaderShimmer className="h-14 !w-96 !mb-6" />
            <ItemLoaderShimmer className="h-36 w-full !mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: imagesPerPage }).map((_, index) => (
                <div key={index} className="animated-background" style={{ height: '200px' }}></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="border py-16 rounded border-border bg-card container">
            <h2 className="text-3xl mb-6 font-bold font-header text-center">
              {galleryContent?.name}
            </h2>
            <p className="text-base mb-12 font-body text-center">{galleryContent?.text}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentImages.map((image) => (
                <div key={image.id} className="w-full h-72 relative">
                  <Image
                    src={image.url as string}
                    fill
                    alt=""
                    objectFit="cover"
                    draggable={false}
                    className="rounded-lg cursor-pointer hover:scale-105 hover-z-[2] transition-all duration-300"
                    onClick={() => {
                      setActiveImage(image.url as string)
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-primary hover:bg-opacity-80 rounded text-white disabled:bg-gray-200 disabled:invisible"
              >
                Previous
              </button>

              <p>{`${currentPage} / ${Math.ceil(galleryContent?.images.length / imagesPerPage)}`}</p>

              <button
                onClick={handleNextPage}
                disabled={indexOfLastImage >= galleryContent?.images.length}
                className="px-4 py-2 bg-primary hover:bg-opacity-80 rounded text-white disabled:bg-gray-200 disabled:invisible"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
