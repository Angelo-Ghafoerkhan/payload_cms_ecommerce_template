import { createServerFeature } from '@payloadcms/richtext-lexical'

export const FontColorFeature = createServerFeature({
  key: 'fontColor',
  feature: {
    ClientFeature: 'src/components/payload/lexical/features/fontColor/feature.client.ts',
  },
})
