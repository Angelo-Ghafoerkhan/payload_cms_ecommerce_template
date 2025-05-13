'use client'

import React, { useState, lazy, Suspense } from 'react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { LucideProps } from 'lucide-react'
import { TextInput, useField, Button } from '@payloadcms/ui'

const fallback = <div style={{ background: '#ddd', width: 24, height: 24 }} />

// Component to dynamically import and render an icon
interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name])

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  )
}

const PAGE_SIZE = 20 // Number of icons per page

const IconSelectorComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path })
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  // List of all available icon names
  const iconNames = Object.keys(dynamicIconImports) as Array<keyof typeof dynamicIconImports>

  // Filter icons based on the search query
  const filteredIcons = iconNames.filter((iconName) =>
    iconName.toLowerCase().includes(search.toLowerCase()),
  )

  // Pagination
  const startIndex = currentPage * PAGE_SIZE
  const paginatedIcons = filteredIcons.slice(startIndex, startIndex + PAGE_SIZE)

  const totalPages = Math.ceil(filteredIcons.length / PAGE_SIZE)

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <div>
      <label className="field-label">Selected Icon</label>
      {/* Selected Icon */}
      {value && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '10px',
            border: '1px solid lightgray',
            padding: '10px',
            borderRadius: '4px',
          }}
        >
          <Icon name={value as keyof typeof dynamicIconImports} />
          <span style={{ fontSize: '16px', textAlign: 'center' }}>{value}</span>
        </div>
      )}
      <label className="field-label" style={{ marginTop: '15px' }}>
        Select an Icon
      </label>
      {/* Search Input */}
      <TextInput
        path={`${path}-search`}
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value)
          setCurrentPage(0) // Reset to first page when searching
        }}
        placeholder="Search icons..."
        className="search-input"
      />
      {/* Icon Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '10px',
          marginTop: '10px',
        }}
      >
        {paginatedIcons.map((iconName) => (
          <div
            key={iconName}
            onClick={() => setValue(iconName)}
            style={{
              cursor: 'pointer',
              border: value === iconName ? '3px solid black' : '1px solid lightgray',
              borderRadius: '4px',
              padding: '10px',
              textAlign: 'center',
            }}
          >
            <Icon name={iconName} />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>{iconName}</p>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          // style={{ cursor: currentPage === 0 ? 'not-allowed' : 'pointer' }}
        >
          Previous
        </Button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          // style={{ cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer' }}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default IconSelectorComponent
