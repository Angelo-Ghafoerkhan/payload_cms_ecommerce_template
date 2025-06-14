'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product, ProductCategory, ProductImage } from '@/payload-types'

interface SingleProductProps {
  product: Product
}

const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)

  // ---------- pick the image URL ----------
  const images = product.images as ProductImage[]

  let imageUrl = ''
  if (
    product.productType === 'variable' &&
    Array.isArray(product.variants) &&
    product.variants.length > 0
  ) {
    // variable product → always show the variant’s image
    imageUrl = (product.variants[0]?.image as ProductImage).url as string
  } else {
    // simple product → swap to second image on hover if it exists
    imageUrl =
      isHovered && images.length > 1 ? (images[1]?.url as string) : (images[0]?.url as string)
  }

  // ---------- build the link ----------
  const categorySlug = (product.primaryCategory as ProductCategory).slug ?? '' // fallback if not present

  return (
    <li
      className="border border-border rounded-lg p-4 bg-card list-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/categories/${categorySlug}/${product.slug}`}>
        <div className="w-full h-80 relative mb-4">
          <Image
            src={imageUrl}
            alt={`${product.name} Image`}
            fill
            className="rounded-lg transition-all duration-300 ease-in-out object-cover"
          />
        </div>

        <h2 className="text-xl font-semibold">{product.name}</h2>

        {/* TODO: render your rich-text description once you have it */}
        <p className="my-2 text-gray-600 text-sm">{/* RICH TEXT */}</p>

        {product.productType === 'variable' && Array.isArray(product.variants) ? (
          <p>
            From&nbsp;
            <span className="font-bold text-2xl">£{product.variants[0]?.price}</span>
          </p>
        ) : (
          product.price && <p className="font-bold text-2xl">£{product.price}</p>
        )}
      </Link>
    </li>
  )
}

export default SingleProduct
