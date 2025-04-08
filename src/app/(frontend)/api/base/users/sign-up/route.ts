import { NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

export async function POST(request: Request) {
  const payload = await getPayload({
    config,
  })

  try {
    const body = await request.json()

    const { name, email, createPassword } = body

    // Check if all required fields are provided
    if (!name || !email || !createPassword) {
      return NextResponse.json(
        { message: 'Name, email, and password are required.' },
        { status: 400 },
      )
    }

    // Server-side password validation
    const lengthValid = createPassword.length >= 8
    const capitalValid = /[A-Z]/.test(createPassword)
    const symbolValid = /[^a-zA-Z0-9]/.test(createPassword)

    if (!lengthValid || !capitalValid || !symbolValid) {
      return NextResponse.json(
        {
          message:
            'Password must be at least 8 characters long, contain at least one uppercase letter, and at least one symbol.',
        },
        { status: 400 },
      )
    }

    // Check if the user already exists
    const userSearch = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
    })

    let user = userSearch.docs[0] // Get the first user, if any

    if (user) {
      // Return error that email is already connected to an account
      return NextResponse.json(
        { message: 'An account with this email already exists.' },
        { status: 409 }, // 409 Conflict
      )
    }

    // Create a new user
    user = await payload.create({
      collection: 'users',
      data: {
        name: name,
        email,
        password: createPassword,
        role: 'customer',
      },
    })

    return NextResponse.json({ user }, { status: 201 }) // 201 Created
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}
