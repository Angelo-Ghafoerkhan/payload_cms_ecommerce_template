// src/fields/AnimationPicker/animationField.ts
import { Field } from 'payload'

export const animationField: Field = {
  name: 'animation',
  type: 'group',
  label: 'Animation Settings',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Enable Animation',
      defaultValue: false,
    },
    {
      name: 'trigger',
      type: 'select',
      label: 'Animation Trigger',
      defaultValue: 'onLoad',
      options: [
        { label: 'On Page Load', value: 'onLoad' },
        { label: 'On Component Mount', value: 'onComponentLoad' },
        { label: 'On Scroll Into View', value: 'onScroll' },
        { label: 'On Hover', value: 'onHover' },
      ],
      admin: {
        condition: (data, siblingData) => siblingData.enabled === true,
      },
    },
    {
      name: 'type',
      type: 'select',
      label: 'Animation Type',
      defaultValue: 'fade',
      options: [
        { label: 'Fade In', value: 'fade' },
        { label: 'Slide In From Left', value: 'slideLeft' },
        { label: 'Slide In From Right', value: 'slideRight' },
        { label: 'Zoom In', value: 'zoom' },
      ],
      admin: {
        condition: (data, siblingData) => siblingData.enabled === true,
      },
    },

    {
      name: 'threshold',
      type: 'number',
      label: 'Scroll Threshold (%)',
      defaultValue: 50,
      min: 0,
      max: 100,
      admin: {
        condition: (_, { enabled, trigger }) => enabled === true && trigger === 'onScroll',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'duration',
          type: 'number',
          label: 'Duration (ms)',
          defaultValue: 500,
          admin: {
            condition: (data, siblingData) => siblingData.enabled === true,
          },
        },
        {
          name: 'delay',
          type: 'number',
          label: 'Delay (ms)',
          defaultValue: 0,
          admin: {
            condition: (data, siblingData) => siblingData.enabled === true,
          },
        },
      ],
    },
  ],
}
