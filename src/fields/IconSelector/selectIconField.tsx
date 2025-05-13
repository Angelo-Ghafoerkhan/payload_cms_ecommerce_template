import { Field } from 'payload'

export const selectIconField: Field = {
  name: 'icon',
  type: 'text',
  admin: {
    components: {
      Field: {
        path: '@/fields/IconSelector/component',
      },
    },
  },
}

export default selectIconField
