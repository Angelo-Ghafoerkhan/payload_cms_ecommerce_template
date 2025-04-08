import React from 'react'

interface ProductSchemaProps {
  product: any // You can type this more strictly as needed.
}

const ProductSchema: React.FC<ProductSchemaProps> = ({ product }) => {
  // If variable, compute aggregate pricing; otherwise, use product.price.
  let offers
  if (product.productType === 'variable' && product.variants?.length) {
    const prices = product.variants.map((v: any) => v.price)
    const lowPrice = Math.min(...prices)
    const highPrice = Math.max(...prices)
    offers = {
      '@type': 'AggregateOffer',
      lowPrice: lowPrice,
      highPrice: highPrice,
      offerCount: product.variants.length,
      priceCurrency: 'GBP',
    }
  } else {
    offers = {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'GBP',
      availability:
        product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    }
  }

  const schemaData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images ? product.images.map((img: any) => img.url) : undefined,
    description: product.introDescription || product.description,
    sku: product.sku || undefined, // if applicable
    offers: offers,
  }

  return (
    <script
      type="application/ld+json"
      // JSON.stringify with 2 spaces indent for readability (optional)
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData, null, 2) }}
    />
  )
}

export default ProductSchema
