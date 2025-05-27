import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { admin } from '@/access/admin'
import { getSettings } from '@/Globals/Settings/Component'
import { Media } from '@/payload-types'
import { emailSettings } from '@payload-config'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: admin,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
    group: 'Admin',
  },
  auth: {
    forgotPassword: {
      generateEmailHTML: async ({ req, token, user }: any) => {
        const resetPasswordURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token}`

        const settings = await getSettings()

        return `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif;">
          <tr>
            <td align="center" style="padding: 20px;">
              <!-- Logo -->
              <img src="${process.env.NEXT_PUBLIC_SERVER_URL}${(settings.logoDark as Media).url as string}" alt="Logo"
                style="max-width: 250px; width: 100%; height: auto;" />
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px;">
              <h1 style="font-size: 24px; color: ${emailSettings.colors.primary};">
                Password Reset
              </h1>
              <p style="font-size: 16px; color: ${emailSettings.colors.textSecondary};">
                Someone requested a password reset. If this wasn't you, please email us at
                <a href="mailto:${settings.email}" style="color: ${emailSettings.colors.secondary}; text-decoration: none;">
                  ${settings.email}
                </a>.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px;">
              <a href="${resetPasswordURL}" style="background-color: ${emailSettings.colors.primary}; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                Reset Password
              </a>
            </td>
          </tr>
        </table>
      `
      },
    },
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        const { payload } = req

        // Function to create a new cart and update the user record with the cart ID.
        const createCartForUser = async () => {
          const newCart = await payload.create({
            collection: 'carts',
            data: {
              customer: doc.id,
              lineItems: [],
              total: 0,
            },
            req,
          })
          await payload.update({
            collection: 'users',
            id: doc.id,
            data: {
              cart: newCart.id,
            },
            req,
          })
        }

        // Function to link orders from guest checkouts to this new user.
        const linkGuestOrdersToUser = async () => {
          // Find orders where user is not set and the order's email matches the new user's email.
          const ordersResult = await payload.find({
            collection: 'orders',
            where: {
              user: { equals: null },
              email: { equals: doc.email },
            },
            req,
          })

          if (ordersResult.docs && ordersResult.docs.length > 0) {
            for (const order of ordersResult.docs) {
              await payload.update({
                collection: 'orders',
                id: order.id,
                data: {
                  user: doc.id,
                },
                req,
              })
            }
          }
        }

        if (operation === 'create') {
          await createCartForUser()
          await linkGuestOrdersToUser()
        } else if (operation === 'update') {
          if (!doc.cart) {
            await createCartForUser()
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Customer', value: 'customer' },
      ],
      defaultValue: 'customer',
    },
    {
      name: 'stripeCustomerId',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'cart',
      type: 'relationship',
      relationTo: 'carts',
      required: false,
    },
  ],
  timestamps: true,
}
