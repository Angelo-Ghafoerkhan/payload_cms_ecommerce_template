import type { DefaultDocumentIDType, NavPreferences, Payload } from 'payload'

import { cache } from 'react'

export const getNavPrefs = cache(
  async (
    payload: Payload,
    userID: DefaultDocumentIDType,
    userSlug: string,
  ): Promise<NavPreferences | undefined> => {
    return userSlug
      ? await payload
          .find({
            collection: 'payload-preferences',
            depth: 0,
            limit: 1,
            pagination: false,
            where: {
              and: [
                {
                  key: {
                    equals: 'nav',
                  },
                },
                {
                  'user.relationTo': {
                    equals: userSlug,
                  },
                },
                {
                  'user.value': {
                    equals: userID,
                  },
                },
              ],
            },
          })
          ?.then((res) => (res?.docs?.[0]?.value as NavPreferences) || null)
      : undefined
  },
)
