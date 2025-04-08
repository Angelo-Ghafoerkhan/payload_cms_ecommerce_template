'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product, ProductCategory, ProductImage } from '@/payload-types'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useHeaderTheme } from '@/providers/HeaderTheme'

interface CategoryPageProps {
  category: ProductCategory
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null)

  // Filters
  const [specFilters, setSpecFilters] = useState<{ [label: string]: string[] }>({})
  const [selectedFilters, setSelectedFilters] = useState<{ [label: string]: Set<string> }>({})

  // Collapsible state for each filter section
  const [collapsedSections, setCollapsedSections] = useState<{ [label: string]: boolean }>({})

  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  // Fetch products
  useEffect(() => {
    const fetchCategoryData = async () => {
      const query = new URLSearchParams({
        'where[primaryCategory][equals]': category.id.toString(),
        depth: '2',
        limit: '100',
      })
      const res = await fetch(`/api/products?${query.toString()}`, {
        cache: 'no-cache',
      })
      const data = await res.json()
      setProducts(data.docs)
    }
    fetchCategoryData()
  }, [category.id])

  // Build the specification filters when products change
  useEffect(() => {
    if (!Array.isArray(products) || products.length === 0) {
      setSpecFilters({})
      return
    }

    const filters: { [label: string]: Set<string> } = {}

    for (const product of products) {
      const specs = product?.specifications?.specs || []
      for (const spec of specs) {
        const { label, value } = spec
        if (!filters[label]) {
          filters[label] = new Set<string>()
        }
        filters[label].add(value)
      }
    }

    const filterObj: { [label: string]: string[] } = {}
    for (const label in filters) {
      filterObj[label] = Array.from(filters[label] || []).sort()
    }

    setSpecFilters(filterObj)

    // Initialize collapse states to true (collapsed) for new labels if not existing
    setCollapsedSections((prev) => {
      const newState = { ...prev }
      for (const label in filterObj) {
        if (newState[label] === undefined) {
          newState[label] = true // default collapsed
        }
      }
      return newState
    })
  }, [products])

  // Compute filtered products
  const filteredProducts = products.filter((product) => {
    const filterLabels = Object.keys(selectedFilters)
    if (filterLabels.length === 0) return true

    return filterLabels.every((label) => {
      const requiredValues = selectedFilters[label]
      if (requiredValues?.size === 0) return true

      const productSpecs = product?.specifications?.specs || []
      const productValuesForLabel: string[] = productSpecs
        .filter((s: { label: string; value: string }) => s.label === label)
        .map((s: { label: string; value: string }) => s.value)

      return productValuesForLabel.some((val) => requiredValues?.has(val))
    })
  })

  // Handler for filter changes
  const handleFilterChange = (label: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[label] ? new Set<string>(prev[label]) : new Set<string>()
      if (currentValues.has(value)) {
        currentValues.delete(value)
      } else {
        currentValues.add(value)
      }

      const newFilters: { [label: string]: Set<string> } = { ...prev, [label]: currentValues }
      if (currentValues.size === 0) {
        delete newFilters[label]
      }

      return newFilters
    })
  }

  const toggleSection = (label: string) => {
    setCollapsedSections((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <article className="mt-48 mb-32 w-11/12 max-w-[var(--max-width)] mx-auto">
      {/* Page Breadcrumbs */}
      <p className="text-lg mb-8">
        <Link href="/" className="hover:text-secondary transition-colors">
          Home
        </Link>
        &nbsp;/&nbsp;<span>{category.title}</span>
      </p>
      <h1 className="text-3xl font-bold mb-16">{category.title}</h1>

      <div className="flex flex-col sm:flex-row gap-8">
        {/* Filter Section */}
        {Object.keys(specFilters).length > 0 && (
          <aside className="mb-8 min-w-max">
            <h2 className="text-xl font-bold mb-4">Filter</h2>
            <div className="flex flex-wrap gap-4 flex-col">
              {Object.entries(specFilters).map(([label, values]) => {
                const isCollapsed = collapsedSections[label]
                return (
                  <div key={label} className="border rounded">
                    <button
                      type="button"
                      onClick={() => toggleSection(label)}
                      className="flex justify-between items-center w-full p-4 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <h3 className="font-semibold">{label}</h3>
                      {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {!isCollapsed && (
                      <ul className="p-4 space-y-1">
                        {values.map((val) => {
                          const isChecked = selectedFilters[label]?.has(val) || false
                          return (
                            <li key={val}>
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleFilterChange(label, val)}
                                />
                                <span>{val}</span>
                              </label>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
          </aside>
        )}

        <div className="text-lg flex-1">
          {filteredProducts.length === 0 ? (
            <p>No products found with the selected filters.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product) => {
                const images = product.images as ProductImage[]

                let imageUrl = ''
                if (
                  product.productType === 'variable' &&
                  Array.isArray(product.variants) &&
                  product.variants?.length >= 0
                ) {
                  imageUrl = (product.variants[0]?.image as ProductImage).url as string
                } else {
                  imageUrl =
                    hoveredProductId === product.id.toString() && images.length > 1
                      ? (images[1]?.url as string)
                      : (images[0]?.url as string)
                }

                return (
                  <li
                    key={product.id}
                    className="border border-border rounded-lg p-4 bg-card"
                    onMouseEnter={() => setHoveredProductId(product.id.toString())}
                    onMouseLeave={() => setHoveredProductId(null)}
                  >
                    <Link href={`./${category.slug}/${product.slug}`}>
                      <div className="w-full h-80 relative mb-4">
                        <Image
                          src={imageUrl as string}
                          alt={`${product.name} Image`}
                          fill
                          className="rounded-lg transition-all duration-300 ease-in-out object-cover"
                        />
                      </div>
                      <h2 className="text-xl font-semibold">{product.name}</h2>
                      <p className="my-2 text-gray-600 text-sm">{/* RICH TEXT */}</p>
                      {product.price && <p className="font-bold text-2xl mb-4">£{product.price}</p>}
                      {product.productType === 'variable' && Array.isArray(product.variants) && (
                        <p>
                          From{' '}
                          <span className="font-bold text-2xl mb-4">
                            £{product.variants[0]?.price}
                          </span>
                        </p>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </article>
  )
}

export default CategoryPage
