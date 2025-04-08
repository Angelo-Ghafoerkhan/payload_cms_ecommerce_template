'use client'

import { Product, ProductCategory, ProductImage } from '@/payload-types'
import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { addToCart } from '@/collections/Ecommerce/Carts/utils/cartFunctions'
import { useHeaderTheme } from '@/providers/HeaderTheme'

interface ProductPageProps {
  product: Product
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [itemAdded, setItemAdded] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    product.productType === 'variable' &&
      Array.isArray(product.variants) &&
      product.variants?.length > 0
      ? (product.variants[0]?.sku ?? null)
      : null,
  )
  const thumbnailSliderRef = useRef<HTMLDivElement>(null)

  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  // Get current stock (for the selected variant if applicable)
  const getCurrentStock = () => {
    if (selectedVariant) {
      const variant = product.variants?.find((v) => v.sku === selectedVariant)
      return variant?.stock || 0
    }
    return product.stock || 0
  }

  const currentStock = getCurrentStock() // Not rendered, just used in logic

  const getCurrentPrice = () => {
    if (selectedVariant) {
      const variant = product.variants?.find((v) => v.sku === selectedVariant)
      return variant?.price || product.price
    }
    return product.price
  }

  const incrementQuantity = () =>
    setQuantity((prev) => {
      if (prev >= currentStock) {
        return prev
      } else {
        return prev + 1
      }
    })

  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Determine images based on whether product is variable or standard.
  const getCurrentImages = () => {
    if (product.productType === 'variable') {
      const variantImages = product.variants?.map((variant) => variant.image).filter(Boolean)
      return variantImages && variantImages.length > 0 ? variantImages : product.images || []
    }
    return product.images || []
  }
  const images = getCurrentImages() as ProductImage[]

  // Compute the product's category title.
  const productCategory: string | 0 =
    product.primaryCategory && (product.primaryCategory as ProductCategory).title

  useEffect(() => {
    if (itemAdded) {
      const timer = setTimeout(() => {
        setItemAdded(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [itemAdded])

  const canOrder = currentStock > 0
  const outOfStock = currentStock === 0

  return (
    <>
      <article className="mt-48 mb-32 w-11/12 max-w-[var(--max-width)] mx-auto">
        {/* Page Breadcrumbs */}
        <p className="text-lg mb-8">
          <Link href="/" className="hover:text-secondary transition-colors">
            Home
          </Link>
          {' / '}
          {productCategory && (
            <>
              <Link
                href={`/categories/${productCategory
                  .toLowerCase()
                  .replace(/[^\w\s]/g, '')
                  .replace(/\s+/g, '-')}`}
                className="hover:text-secondary transition-colors"
              >
                {productCategory}
              </Link>
              {' / '}
            </>
          )}
          <span>{product.name}</span>
        </p>

        {/* Main Product Display */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="w-full max-w-2xl mx-auto">
              <div className="w-full h-[500px] relative mb-4">
                <Image
                  src={images[currentImageIndex]?.url || ''}
                  alt={`Product Image ${currentImageIndex + 1}`}
                  layout="fill"
                  className="rounded-lg object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
              <div className="relative bg-card rounded-sm">
                <button
                  onClick={() =>
                    thumbnailSliderRef.current?.scrollBy({ left: -200, behavior: 'smooth' })
                  }
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-all z-10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div
                  ref={thumbnailSliderRef}
                  className="flex overflow-x-auto space-x-2 scrollbar-hide"
                >
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className="flex-shrink-0"
                    >
                      <Image
                        src={image.url as string}
                        alt={`Thumbnail ${index + 1}`}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                    </button>
                  ))}
                </div>
                <button
                  onClick={() =>
                    thumbnailSliderRef.current?.scrollBy({ left: 200, behavior: 'smooth' })
                  }
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-all z-10"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-4 font-header">{product.name}</h1>

            {/* Product variants */}
            {product.productType === 'variable' && (
              <div className="mb-4">
                <p className="font-semibold">Select Variant</p>
                <select
                  value={selectedVariant || ''}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  className="w-full p-2 mt-2 border"
                  // disabled={outOfStock}
                >
                  <option value="" disabled>
                    Choose a variant
                  </option>
                  {product.variants?.map((variant) => (
                    <option key={variant.sku} value={variant.sku}>
                      {variant.variantName} - £{variant.price}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Price */}
            <p className="text-3xl font-semibold my-8">
              <span className="mr-10 text-base font-normal">Price</span>£{getCurrentPrice()}
            </p>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center mb-8 w-full">
              <p className="mr-4">Quantity</p>
              <button
                onClick={decrementQuantity}
                disabled={!canOrder}
                className={`inline-flex items-center justify-center h-8 w-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground ${
                  !canOrder ? 'cursor-not-allowed opacity-50' : ''
                }`}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="mx-4 text-xl font-semibold">{quantity}</span>
              <button
                onClick={incrementQuantity}
                disabled={!canOrder || quantity >= currentStock}
                className={`inline-flex items-center justify-center h-8 w-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground ${
                  !canOrder || quantity >= currentStock ? 'cursor-not-allowed opacity-50' : ''
                }`}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => {
                if (canOrder) {
                  addToCart(product.id, quantity, selectedVariant)
                  setItemAdded(true)
                }
              }}
              disabled={!canOrder}
              className={`text-lg w-full px-8 py-3 rounded-md font-medium inline-flex items-center justify-center ${
                canOrder
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {outOfStock ? (
                'Out of Stock'
              ) : itemAdded ? (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Item added to cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </>
              )}
            </button>

            {product.introDescription && (
              <p className="text-lg text-foreground mt-16">{product.introDescription}</p>
            )}
          </div>
        </div>
        <hr className="my-32" />
        <section className="">
          <h2 className="font-header mb-4 text-4xl">Description</h2>
          {product.description && <RichText data={product.description} enableGutter={false} />}
        </section>
      </article>
    </>
  )
}

export default ProductPage
