import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { Cart } from '@/payload-types'

export type LineItem = NonNullable<Cart['lineItems']>[0]

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })

    // Get the JWT token from the cookies
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const secret: string = payload.secret || (process.env.PAYLOAD_SECRET as string)

    let payloadData: any
    try {
      payloadData = jwt.verify(token, secret)
    } catch (error) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = payloadData?.id

    const body: { cart: { lineItems: Cart['lineItems'] } } = await request.json()
    const { cart } = body

    console.log('cart in api cart route', cart.lineItems)

    if (!cart || !Array.isArray(cart.lineItems)) {
      return NextResponse.json({ error: 'Invalid cart data' }, { status: 400 })
    }

    // Use a Map with a compound key (productId + variant)
    const processedCartItemsMap = new Map<string, LineItem>()

    for (const item of cart.lineItems) {
      let productId: any = item.product

      if (typeof productId === 'object' && productId.id) {
        productId = productId.id
      }
      if (typeof productId === 'string') {
        productId = parseInt(productId, 10)
      }
      if (typeof productId !== 'number' || isNaN(productId)) {
        throw new Error('Invalid product ID in cart item')
      }

      // Verify that the product exists and fetch its full data
      const productExists = await payload.findByID({
        collection: 'products',
        id: productId,
      })

      if (!productExists) {
        throw new Error(`Product with ID ${productId} does not exist.`)
      }

      // Determine the unit price based on product type:
      let unitPrice = productExists.price
      if (productExists.productType === 'variable' && item.productVariant) {
        // Try to find the variant price.
        const variantData = productExists.variants?.find((v: any) => v.sku === item.productVariant)
        if (variantData && variantData.price != null) {
          unitPrice = variantData.price
        }
      }

      // Create a compound key using productId and productVariant (or "default")
      const variantKey = item.productVariant ? String(item.productVariant).trim() : 'default'
      const key = `${productId}-${variantKey}`

      if (processedCartItemsMap.has(key)) {
        // Merge quantities if the key already exists.
        const existingItem = processedCartItemsMap.get(key)!
        existingItem.quantity += item.quantity
        // Recalculate linePrice using the unit price.
        existingItem.linePrice = (unitPrice ?? 0) * existingItem.quantity
      } else {
        // Create new line item with correct unit price.
        const newItem: LineItem = {
          product: productId,
          productVariant: item.productVariant || null,
          quantity: item.quantity,
          linePrice: (unitPrice ?? 0) * item.quantity,
        }
        if (item.id) {
          newItem.id = item.id
        }
        processedCartItemsMap.set(key, newItem)
      }
    }

    const processedCartItems = Array.from(processedCartItemsMap.values())

    const updatedTotal = processedCartItems.reduce((total, item) => total + item.linePrice, 0)

    // First, find the cart that belongs to the user
    const existingCart = await payload.find({
      collection: 'carts',
      where: { customer: { equals: userId } },
    })

    if (!existingCart.docs.length) {
      // If no cart found, create one
      const createdCart = await payload.create({
        collection: 'carts',
        data: {
          customer: userId,
          lineItems: processedCartItems,
          total: updatedTotal,
        },
      })

      return NextResponse.json(
        { message: 'Cart created successfully', cart: createdCart },
        { status: 200 },
      )
    }

    // If found, update using cart ID
    const cartId = parseInt(existingCart.docs[0]?.id?.toString() || '0')

    const updatedCart = await payload.update({
      collection: 'carts',
      id: cartId,
      data: {
        lineItems: processedCartItems,
        total: updatedTotal,
      },
    })

    return NextResponse.json(
      { message: 'Cart updated successfully', cart: updatedCart },
      { status: 200 },
    )
  } catch (error: any) {
    console.error('Error updating user cart:', error)
    if (error.data) {
      console.error('Validation Errors:', error.data.errors)
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
