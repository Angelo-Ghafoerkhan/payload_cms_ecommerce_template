import type { ResolvingMetadata } from 'next'

import ProductPage from './_components/ProductPage'
import NotFound from '@/app/(frontend)/not-found'
import ProductSchema from '@/collections/Schemas/ProductSchema'
import { siteName } from '@payload-config'

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function fetchProductData(product: string | string[]) {
  const slugPath = Array.isArray(product) ? product.join('/') : `${product}` || '/'

  // Construct the query parameter to find the product by slug
  const query = new URLSearchParams({
    'where[slug][equals]': slugPath,
    depth: '2',
  })

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?${query.toString()}`,
    {
      cache: 'no-cache',
    },
  )

  if (!res.ok) {
    console.error('Failed to fetch product data:', res.status, res.statusText)
    return null
  }

  const data = await res.json()

  // The product will be the first (and only) item in data.docs
  const productData = data.docs[0]

  return productData
}

export async function generateMetadata(
  { params }: { params: { product: string | string[] } },
  parent: ResolvingMetadata,
) {
  params = await params
  const slugPath = Array.isArray(params.product) ? params.product.join('/') : `${params.product}`
  const product = await fetchProductData(slugPath)

  const images = []
  if (product) {
    if (product.productType === 'variable' && product.variants?.length) {
      // Try to find the first variant that has an image.
      const variantWithImage = product.variants.find((v: any) => v.image && v.image.url)
      if (variantWithImage) {
        images.push({ url: variantWithImage.image.url })
      } else if (product.images && product.images.length) {
        images.push({ url: product.images[0].url })
      }
    } else if (product.images && product.images.length) {
      images.push({ url: product.images[0].url })
    }
  }

  return {
    title: `${product?.name} | ${siteName}`,
    description: product?.introDescription || 'Default Description',
    openGraph: {
      title: `${product?.name}`,
      description: product?.introDescription,
      url: product?.url,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@Verum_Digital',
      title: `${product?.name}`,
      description: product?.introDescription || 'Default Description',
      images: images.map((img) => img.url),
    },
  }
}

// Define the dynamic page component
export default async function Page({ params }: { params: { product: string | string[] } }) {
  params = await params
  const slugPath = Array.isArray(params.product) ? params.product.join('/') : params.product
  const product = await fetchProductData(slugPath)

  if (!product) {
    return <NotFound />
  }

  return (
    <main className="min-h-[50vh]">
      <ProductSchema product={product} />
      <ProductPage product={product} />
    </main>
  )
}
