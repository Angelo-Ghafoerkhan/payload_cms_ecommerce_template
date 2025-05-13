import { Field } from 'payload'
import { colorField } from '../ColorPicker/field'
// import { colorField } from '../ColorPicker/field'

export const iconField: Field = {
  name: 'icon',
  type: 'group',
  fields: [
    colorField,
    {
      name: 'size',
      type: 'number',
      label: 'Icon Size (px)',
      defaultValue: 24, // Default 24px
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        components: {
          Field: {
            path: '@/fields/IconSelector/component',
          },
        },
      },
    },
  ],
}

export default iconField
