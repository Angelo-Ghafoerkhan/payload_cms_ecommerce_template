import type { Field, GroupField } from 'payload'
import deepMerge from '@/utilities/deepMerge'
import { colorField } from '../ColorPicker/field'

/* -------------------------------------------------------------------------- */
/*  Public type                                                               */
/* -------------------------------------------------------------------------- */

type IconField = (options?: {
  /** Merge anything on top of the generated field */
  overrides?: Partial<GroupField>
  /** Group-level condition */
  condition?: (data: Partial<any>, siblingData: Partial<any>) => boolean
}) => Field

/* -------------------------------------------------------------------------- */
/*  Factory                                                                   */
/* -------------------------------------------------------------------------- */

export const iconField: IconField = ({ overrides = {}, condition } = {}) => {
  const base: GroupField = {
    name: 'icon',
    type: 'group',
    label: 'Icon Settings',
    admin: {
      condition, // <- overridable at call-site
      hideGutter: true,
    },
    fields: [
      /* -------------------------------------------------- Source toggle -- */
      {
        name: 'source',
        type: 'radio',
        label: 'Source',
        defaultValue: 'lucide',
        options: [
          { label: 'Lucide', value: 'lucide' },
          { label: 'Upload', value: 'upload' },
        ],
      },

      /* -------------------------------------------------- Colour / size -- */
      {
        type: 'row',
        fields: [
          colorField,
          {
            name: 'size',
            type: 'number',
            label: 'Icon Size (px)',
            defaultValue: 24,
          },
        ],
      },

      /* -------------------------------------------------- Lucide picker -- */
      {
        name: 'name',
        type: 'text',
        label: 'Pick an icon',
        admin: {
          condition: (_, siblingData) => siblingData.source === 'lucide',
          components: {
            Field: { path: '@/fields/IconSelector/component' },
          },
        },
      },

      /* -------------------------------------------------- Upload field ---- */
      {
        name: 'upload',
        type: 'upload',
        label: 'Upload your own icon',
        relationTo: 'media',
        admin: {
          condition: (_, siblingData) => siblingData.source === 'upload',
        },
      },
    ],
  }

  /* ---------------------------------------------------------------------- */
  /*  Return the merged result                                              */
  /* ---------------------------------------------------------------------- */
  return deepMerge(base, overrides)
}

export default iconField
