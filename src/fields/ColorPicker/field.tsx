import { Field } from 'payload'

export const colorField: Field = {
  name: 'color',
  type: 'text',
  label: 'Color',
  admin: {
    components: {
      Field: {
        path: '@/fields/ColorPicker/component',
      },
    },
  },
}
