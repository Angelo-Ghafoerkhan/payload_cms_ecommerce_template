'use client'

import React from 'react'
import { useField, SelectInput } from '@payloadcms/ui'
import type { OptionObject } from 'payload'

type ColorPickerProps = {
  /** Payload injects the full path automatically */
  path: string
  /** Presets shown in the dropdown */
  palette?: string[]
}

const DEFAULT_PALETTE = ['primary', 'secondary', 'tertiary'] as const

export const ColorPicker: React.FC<ColorPickerProps> = ({ path, palette = DEFAULT_PALETTE }) => {
  const { value, setValue } = useField<string>({ path })

  /* ---­­ helpers ------------------------------------------------------ */
  const isPreset = (palette as string[]).includes(value ?? '')
  const currentHex = !isPreset && value?.startsWith('#') ? value : '#000000'

  /* Build dropdown options once (memo optional) */
  const options: OptionObject[] = [
    ...palette.map((p) => ({
      label: p.charAt(0).toUpperCase() + p.slice(1),
      value: p,
    })),
    { label: 'Custom…', value: 'custom' },
  ]

  /* ---­­ render ------------------------------------------------------- */
  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      {/* Preset selector */}
      <SelectInput
        path={`${path}.preset`} /* anything unique is fine */
        name={`${path}.preset`}
        label="Colour"
        value={isPreset ? value : 'custom'}
        options={options}
        onChange={(opt) => {
          const next = Array.isArray(opt) ? opt[0]?.value : opt?.value
          setValue(next === 'custom' ? currentHex : (next as string))
        }}
      />

      {/* Hex inputs only when Custom… */}
      {!isPreset && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="color"
            value={currentHex}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: 40, height: 40, border: 'none', cursor: 'pointer' }}
          />
          <input
            type="text"
            value={currentHex}
            placeholder="#ffffff"
            onChange={(e) => setValue(e.target.value)}
            style={{
              border: '1px solid lightgray',
              borderRadius: 4,
              padding: '5px 10px',
              width: 120,
            }}
          />
        </div>
      )}
    </div>
  )
}

export default ColorPicker
