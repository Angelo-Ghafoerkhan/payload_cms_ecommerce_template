'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product, ProductCategory, ProductImage } from '@/payload-types'
import SingleProduct from '../SingleProduct/component'
import { Button } from '@/components/ui/button'
import ItemLoaderShimmer from '@/components/Loaders/ItemLoaderShimmer'

interface CategoryShowcaseProps {
  category: ProductCategory
  limit?: number
  showTitle?: boolean
  allowPagination?: boolean
}

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  category,
  limit,
  showTitle,
  allowPagination,
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Construct the query parameter
    const query = new URLSearchParams({
      'where[primaryCategory][equals]': String(category.id),
      depth: '2',
    })

    const fetchProducts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?${query.toString()}`,
        {
          cache: 'no-cache',
        },
      )

      if (!res.ok) {
        console.error('Failed to fetch products:', res.statusText)
        return
      }

      const data = await res.json()
      setProducts(data.docs || [])
      setLoading(false)
    }

    fetchProducts()
  }, [category])

  return (
    <div className="container flex flex-col items-center justify-center">
      {showTitle && (
        <div className="prose mb-4">
          <h2>{category.title}</h2>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {loading
          ? Array.from({ length: limit ?? 4 }).map((_, i) => (
              <ItemLoaderShimmer height={300} key={i} />
            ))
          : products.map((product) => <SingleProduct key={product.id} product={product} />)}
      </div>

      <Button className="mt-4">
        <Link href={`/categories/${category.slug}`} className="w-full">
          View All Products
        </Link>
      </Button>
    </div>
  )
}

export default CategoryShowcase
