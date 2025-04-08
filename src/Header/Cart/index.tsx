'use client'

import clsx from 'clsx'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getCartItems } from '@/collections/Ecommerce/Carts/utils/cartFunctions'
import Image from 'next/image'
import { LineItem } from '@/app/(frontend)/api/base/cart/route'
import { Cart, Product, ProductImage } from '@/payload-types'

interface CartProps {
  className?: string
  type?: 'page' | 'popup'
}

const CartPopup: React.FC<CartProps> = ({ className, type }) => {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<Cart['lineItems']>([])
  const [cartItemCount, setCartItemCount] = useState(0)
  const [productDetails, setProductDetails] = useState<{ [key: number]: Product }>({}) // Store fetched products by id

  // Fetch cart items when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      console.log('fetching cart items...')
      const { lineItems } = await getCartItems() // Fetch the cart items from your cart function
      setCartItems(lineItems)

      // Calculate the total number of items in the cart
      const itemCount = lineItems?.reduce(
        (total: number, item: LineItem) => total + item.quantity,
        0,
      )
      setCartItemCount(itemCount ?? 0)

      console.log('cart items:', lineItems)

      // Fetch product details for each item in the cart if it's a local cart
      lineItems?.forEach(async (item: LineItem) => {
        if (typeof item.product === 'number' && !productDetails[item.product]) {
          const response = await fetch(`/api/products/${item.product}?depth=2`)
          const product = await response.json()
          setProductDetails((prevState) => ({
            ...prevState,
            [item.product as number]: product,
          }))
        }
      })
    }

    fetchCartItems()

    window.addEventListener('cartUpdated', fetchCartItems)

    return () => {
      window.removeEventListener('cartUpdated', fetchCartItems)
    }
  }, [productDetails]) // Re-run when the productDetails state changes

  if (type === 'page') {
    return (
      <Link href="/cart" className={clsx(className, 'relative')}>
        <ShoppingCart size={24} className="min-w-6 stroke-foreground" />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-card text-card-foreground text-xs font-semibold rounded-full border border-border">
            {cartItemCount}
          </span>
        )}
      </Link>
    )
  }

  return (
    <div className="relative">
      <div
        className={clsx(className, 'relative')}
        onClick={() => setCartOpen((current) => !current)}
      >
        <ShoppingCart size={24} className="min-w-6 stroke-foreground cursor-pointer" />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-card text-card-foreground text-xs font-semibold rounded-full border border-border">
            {cartItemCount}
          </span>
        )}
      </div>

      <div
        id="cart-body"
        className={clsx(
          'bg-background w-80 pt-8 p-4 absolute right-0 top-full mt-2 shadow-lg rounded-lg',
          cartOpen ? 'flex flex-col' : 'hidden',
        )}
      >
        <div className="max-h-[400px] overflow-y-auto text-foreground">
          {cartItems?.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems?.map((item) => {
              const product = productDetails[item.product as number] || (item.product as Product)

              let image = '/placeholder.jpg'
              if (product.productType === 'variable') {
                const variant = product.variants?.find(
                  (variant) => variant.sku === item.productVariant,
                )
                if (variant && variant.image) {
                  image = (variant.image as ProductImage).url ?? '/placeholder.jpg'
                }
              } else {
                const firstImage = (product.images?.[0] as ProductImage)?.url
                image = firstImage ?? '/placeholder.jpg'
              }

              return (
                <div
                  key={`${product.id}-${item.productVariant ?? 'standard'}`}
                  className="flex items-center mb-4"
                >
                  <div className="relative w-16 h-16 mr-4">
                    <Image
                      src={image}
                      alt={product.name}
                      layout="fill"
                      className="object-cover rounded-lg"
                      priority={false}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm">Qty: {item.quantity}</p>
                    <p className="text-sm">Price: £{item.linePrice}</p>
                  </div>
                </div>
              )
            })
          )}
        </div>
        <div className="mt-4 text-center w-full flex flex-col gap-2">
          <Link
            href="/cart"
            onClick={() => setCartOpen(false)}
            className="w-full bg-primary text-white py-2 rounded-lg"
          >
            View Full Cart
          </Link>
          <button
            onClick={() => setCartOpen(false)}
            className="w-full bg-secondary text-white py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPopup
