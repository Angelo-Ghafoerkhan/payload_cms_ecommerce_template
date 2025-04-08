import type { Access } from 'payload'
import type { User } from '@/payload-types'

export const ownerOrRelevant: Access = ({ req: { user }, data }) => {
  // Deny access if no user is authenticated.
  if (!user) return false

  // Admins always have access.
  if (user.role === 'admin') return true

  // If the document has an email, check if it matches the authenticated user's email.
  if (data?.email && user.email && data.email === user.email) {
    return true
  }

  // If the document has a "user" field, check if it matches the authenticated user's ID.
  if (data?.user && user.id && data.user === user.id) {
    return true
  }

  return false
}
