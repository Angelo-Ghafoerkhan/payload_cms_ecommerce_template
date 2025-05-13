'use client'

import React from 'react'
import { useField } from '@payloadcms/ui'

interface ColorPickerProps {
  path: string
}

const ColorPicker: React.FC<ColorPickerProps> = ({ path }) => {
  const { value, setValue } = useField<string>({ path })

  return (
    <div>
      <label className="field-label">Color</label>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="color"
          value={value || '#000000'}
          onChange={(e) => setValue(e.target.value)}
          style={{
            width: '40px',
            height: '40px',
            border: 'none',
            cursor: 'pointer',
          }}
        />
        <input
          type="text"
          value={value || '#000000'}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter color hex"
          style={{
            border: '1px solid lightgray',
            borderRadius: '4px',
            padding: '5px 10px',
            width: '120px',
          }}
        />
      </div>
    </div>
  )
}

export default ColorPicker
