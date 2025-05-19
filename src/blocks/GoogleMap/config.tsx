import type { Block, TextFieldSingleValidation } from 'payload'

/** Accept only URLs that already contain '/maps/embed' */
const embedRegex = /^https?:\/\/.*?google\.[a-z.]+\/maps\/embed/i

const validateEmbed: TextFieldSingleValidation = (val) =>
  !val || embedRegex.test(val) ? true : 'Paste the <iframe src="…"> URL from “Share → Embed a map”.'

export const GoogleMapBlock: Block = {
  slug: 'googleMap',
  interfaceName: 'GoogleMapBlock',

  fields: [
    {
      name: 'mapUrl',
      type: 'text',
      label: 'Google Maps embed URL',
      required: true,
      validate: validateEmbed,
      admin: {
        placeholder: 'https://www.google.com/maps/embed?pb=!1m18!1m12…',
        description: 'Click “Share” in Google Maps → “Embed a map” → copy the iframe src.',
      },
    },
    {
      name: 'height',
      type: 'number',
      label: 'Height (px)',
      min: 100,
      max: 1000,
      defaultValue: 400,
      admin: { width: '50%' },
    },
  ],
}
export default GoogleMapBlock
