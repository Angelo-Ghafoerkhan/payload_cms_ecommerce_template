'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  getCartItems,
  addToCart,
  removeFromCart,
  updateCartWithDiscount,
  getUserCart,
  checkAndAdjustCartStock,
} from '@/collections/Ecommerce/Carts/utils/cartFunctions'
import { Product, ProductImage } from '@/payload-types'
import Image from 'next/image'
import { ChevronDown, Minus, Plus, ShoppingCart } from 'lucide-react'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Input from '@/components/forms/none-react-hook-form/Input/Input'
import ItemLoaderShimmer from '@/components/Loaders/ItemLoaderShimmer'
import { useRouter, useSearchParams } from 'next/navigation'

interface CartPageProps {
  className?: string
}

interface LineItem {
  product: number | object
  productVariant?: string | null
  quantity: number
  linePrice: number
}

const CartPage: React.FC<CartPageProps> = ({ className }) => {
  const [cartItems, setCartItems] = useState<LineItem[]>([])
  const [productDetails, setProductDetails] = useState<{ [key: number]: Product }>({})
  const [showDiscount, setShowDiscount] = useState(false)
  const [discountCode, setDiscountCode] = useState<string | null>(null)
  const [discountError, setDiscountError] = useState(false)
  const [discountAmount, setDiscountAmount] = useState<number>(0) // discount factor e.g., 0.1 for 10% off
  const [loading, setLoading] = useState(true)

  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  // Check cart items have stock available
  useEffect(() => {
    async function adjustCart() {
      await checkAndAdjustCartStock()
    }
    adjustCart()
  }, [])

  // Helper: Given a line item, get available stock from the corresponding product details.
  const getStockForItem = (item: LineItem): number => {
    const prodId = typeof item.product === 'number' ? item.product : (item.product as any).id
    const product = productDetails[prodId]
    if (!product) return Infinity
    if (product.productType === 'variable') {
      const variant = product.variants?.find((v: any) => v.sku === item.productVariant)
      return variant ? variant.stock : 0
    }
    return product.stock || 0
  }

  // Fetch cart items on mount and on "cartUpdated" events.
  useEffect(() => {
    const fetchCartItems = async () => {
      const { lineItems, discountCode: dc } = await getCartItems()
      setCartItems(lineItems ?? [])
      setDiscountCode(dc ?? null)
      // For each line item, fetch product details if not already loaded.
      lineItems?.forEach(async (item: LineItem) => {
        const prodId = typeof item.product === 'number' ? item.product : (item.product as any).id
        if (prodId && !productDetails[prodId]) {
          const response = await fetch(`/api/products/${prodId}?depth=2`)
          const product = await response.json()
          setProductDetails((prevState) => ({
            ...prevState,
            [prodId]: product,
          }))
        }
      })
      setLoading(false)
    }
    fetchCartItems()
    window.addEventListener('cartUpdated', fetchCartItems)
    return () => window.removeEventListener('cartUpdated', fetchCartItems)
  }, [])

  const incrementQuantity = async (productId: number, productVariant?: string | null) => {
    await addToCart(productId, 1, productVariant)
    const { lineItems } = await getCartItems()
    setCartItems(lineItems ?? [])
  }

  const decrementQuantity = async (productId: number, productVariant?: string | null) => {
    await addToCart(productId, -1, productVariant)
    const { lineItems } = await getCartItems()
    setCartItems(lineItems ?? [])
  }

  const handleRemoveFromCart = async (productId: number, productVariant?: string | null) => {
    await removeFromCart(productId, productVariant)
    const { lineItems } = await getCartItems()
    setCartItems(lineItems ?? [])
  }

  const calculateOriginalTotal = () => {
    return cartItems.reduce((total, item) => total + item.linePrice, 0)
  }

  const calculateFinalTotal = () => {
    const originalTotal = calculateOriginalTotal()
    return (originalTotal * (1 - discountAmount)).toFixed(2)
  }

  const applyDiscountCode = async () => {
    const response = await fetch(`/api/discounts?code=${discountCode}`)
    const data = await response.json()
    const discount = data.docs[0]
    if (!discount || discount.code !== discountCode) {
      setDiscountError(true)
      return
    }
    setDiscountError(false)
    const discountAmountPercent = discount.amount
    const discountFactor = discountAmountPercent / 100
    const updatedCart = await updateCartWithDiscount(discountCode ?? '', discountAmountPercent)
    if (updatedCart && updatedCart.lineItems) {
      setCartItems(updatedCart.lineItems)
    }
    setDiscountCode(discountCode)
    setDiscountAmount(discountFactor)
  }

  useEffect(() => {
    if (discountCode) {
      applyDiscountCode()
    }
  }, [discountCode])

  const handleCheckout = async () => {
    const { user } = await getUserCart()
    const payload = {
      cartItems,
      discountCode,
      user: user ?? 'guest',
    }
    const res = await fetch('/api/base/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      console.error('Checkout error:', data.error)
    }
  }

  if (loading) {
    return (
      <div className="mt-48 mb-32 w-11/12 max-w-[var(--max-width)] mx-auto min-h-[50vh]">
        <h1 className="font-bold text-3xl mb-8">Cart</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ItemLoaderShimmer height={100} />
            <ItemLoaderShimmer height={100} />
            <ItemLoaderShimmer height={100} />
          </div>
          <div className="lg:col-span-1">
            <ItemLoaderShimmer height={310} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-48 mb-32 w-11/12 max-w-[var(--max-width)] mx-auto min-h-[50vh]">
      <h1 className="font-bold text-3xl mb-8">Cart</h1>
      {cartItems.length === 0 && <p>Your cart is empty</p>}
      {cartItems.length > 0 && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <table className="min-w-full bg-card">
              <thead className="text-lg hidden md:contents">
                <tr>
                  <th className="text-left py-2">Product</th>
                  <th className="text-center py-2">Quantity</th>
                  <th className="text-center py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  const product =
                    productDetails[
                      typeof item.product === 'number' ? item.product : (item.product as any).id
                    ] || (item.product as Product)
                  let image = '/placeholder.jpg'
                  if (product) {
                    if (product.productType === 'variable') {
                      const variant = product.variants?.find(
                        (v: any) => v.sku === item.productVariant,
                      )
                      if (variant && variant.image) {
                        image = (variant.image as ProductImage).url || '/placeholder.jpg'
                      }
                    } else {
                      const firstImage = (product.images?.[0] as ProductImage)?.url
                      image = firstImage || '/placeholder.jpg'
                    }
                  }
                  const totalPrice = item.linePrice.toFixed(2)
                  const availableStock = getStockForItem(item)
                  return (
                    <tr
                      key={`${product.id}-${item.productVariant ?? 'standard'}-${index}`}
                      className="border-b"
                    >
                      <td className="py-2 flex gap-4">
                        <div className="relative w-16 h-16">
                          <Image
                            src={image}
                            alt={product.name || 'Product Image'}
                            layout="fill"
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold">
                            {product.name}{' '}
                            {item.productVariant && item.productVariant !== 'default' && (
                              <span className="capitalize">({item.productVariant})</span>
                            )}
                          </p>
                          <p className="text-sm">Qty: {item.quantity}</p>
                          <p className="text-sm">
                            Price: £
                            {item.productVariant
                              ? product.variants?.find((v: any) => v.sku === item.productVariant)
                                  ?.price
                              : product.price}
                          </p>
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={() => decrementQuantity(product.id, item.productVariant)}
                            className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="mx-4 text-xl font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => {
                              // Only allow increment if current quantity is less than available stock.
                              if (item.quantity < availableStock) {
                                incrementQuantity(product.id, item.productVariant)
                              }
                            }}
                            disabled={item.quantity >= availableStock}
                            className={`inline-flex items-center justify-center h-8 w-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground ${
                              item.quantity >= availableStock ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-2">
                        <p className="text-center">£{totalPrice}</p>
                        <button
                          onClick={() => handleRemoveFromCart(product.id, item.productVariant)}
                          className="text-center items-center justify-center h-8 w-full rounded-md hover:text-secondary transition-all duration-300"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-card p-4 rounded-lg">
              <h2 className="font-bold text-2xl mb-4">Order Summary</h2>
              {discountAmount ? (
                <>
                  <p className="text-lg mb-2">
                    Total:{' '}
                    <span className="line-through">£{calculateOriginalTotal()?.toFixed(2)}</span>
                  </p>
                  <p className="text-lg mb-2">After Discount: £{calculateFinalTotal()}</p>
                </>
              ) : (
                <p className="text-lg mb-2">Total: £{calculateOriginalTotal()?.toFixed(2)}</p>
              )}
              <div>
                <div
                  className="mt-8 mb-1 flex gap-1 items-center cursor-pointer"
                  onClick={() => setShowDiscount((current) => !current)}
                >
                  <p className="font-bold">I have a discount code.</p>
                  <ChevronDown />
                </div>
                {showDiscount && (
                  <div className="relative">
                    <Input
                      id="discountCode"
                      animatePlaceholder={true}
                      value={discountCode || ''}
                      onChange={(event) => setDiscountCode(event.target.value)}
                    />
                    <button
                      onClick={() => applyDiscountCode()}
                      className="absolute right-0 top-1/2 -translate-y-1/2 px-4 w-min bg-primary text-white py-[6px] rounded-lg hover:bg-primary-dark"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {discountError && discountCode !== '' && discountCode !== null && (
                  <p>This code doesn&apos;t seem right.</p>
                )}
              </div>
              <button
                onClick={handleCheckout}
                className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
