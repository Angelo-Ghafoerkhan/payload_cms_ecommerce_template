import type { ResolvingMetadata } from 'next'
import CategoryPage from './_components/CategoryPage'
import NotFound from '@/app/(frontend)/not-found'
import { siteName } from '@payload-config'

async function fetchCategoryData(category: string | string[]) {
  const slugPath = Array.isArray(category) ? category.join('/') : `${category}` || '/'

  // Construct the query parameter to find the page by slug
  const query = new URLSearchParams({
    'where[slug][equals]': slugPath,
    depth: '2',
  })

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-categories?${query.toString()}`,
    {
      cache: 'no-cache',
    },
  )

  if (!res.ok) {
    console.error('Failed to fetch page data:', res.status, res.statusText)
    return null
  }

  const data = await res.json()

  // The page will be the first (and only) item in data.docs
  const categoryData = data.docs[0]

  return categoryData
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string | string[] }> },
  parent: ResolvingMetadata,
) {
  const resolvedParams = await params
  const slugPath = Array.isArray(resolvedParams.category)
    ? resolvedParams.category.join('/')
    : `${resolvedParams.category}`
  const page = await fetchCategoryData(slugPath)

  return {
    title: `${page?.title} | Categories | ${siteName}`,
    description: page?.meta?.description,
  }
}

// Define the dynamic page component
export default async function Page({
  params,
}: {
  params: Promise<{ category: string | string[] }>
}) {
  const resolvedParams = await params
  const slugPath = Array.isArray(resolvedParams.category)
    ? resolvedParams.category.join('/')
    : resolvedParams.category
  const page = await fetchCategoryData(slugPath)

  if (!page) {
    return <NotFound />
  }

  return (
    <main>
      <CategoryPage category={page} />
    </main>
  )
}
