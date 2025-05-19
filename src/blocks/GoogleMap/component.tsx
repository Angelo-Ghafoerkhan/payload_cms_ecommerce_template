'use client'

import clsx from 'clsx'
import React from 'react'

export interface GoogleMapBlockProps {
  mapUrl: string
  height?: number
  enableContainer?: boolean
}

export const GoogleMap: React.FC<GoogleMapBlockProps> = ({
  mapUrl,
  height = 400,
  enableContainer = true,
}) => (
  <div className={clsx(enableContainer && 'container')}>
    <iframe
      src={mapUrl}
      width="100%"
      height={height}
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className="rounded-2xl shadow-uniform"
    />
  </div>
)
