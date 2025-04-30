'use client'

import clsx from 'clsx'
import React, { useState } from 'react'
import { Controller, FieldErrors, FieldValues, Control } from 'react-hook-form'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'

// Import your existing input style classes.
import {
  labelStyles,
  disabledStyles,
  errorStyles,
  basicStyles,
  requiredStyles,
  uploadStyles,
  noErrorsStyles,
  errorWarningStyles,
} from '../../styles/input'

interface CustomUploadInputProps {
  id: string
  required: boolean
  errors: FieldErrors
  accepts: string
  control: Control<FieldValues>
  label: string
  hasMany?: boolean
  isImages?: boolean
}

const CustomUploadInput: React.FC<CustomUploadInputProps> = ({
  id,
  required,
  errors,
  accepts,
  control,
  label,
  hasMany = false,
  isImages = false,
}) => {
  // Store selected files in state (always as an array)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      if (hasMany) {
        // Append new files to the existing selectedFiles.
        setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)])
      } else {
        setSelectedFiles([files[0] ?? new File([], '')])
      }
    }
  }

  // Render file names (if not images) or a count when multiple.
  const renderFileNames = () => {
    if (hasMany) {
      return `${selectedFiles.length} file(s) selected`
    }
    return selectedFiles[0]?.name || 'Choose File'
  }

  // Remove a file at given index.
  const removeFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  // Render a grid of image previews if isImages is true, with a hover overlay “X” to remove.
  const renderImagePreviews = () => {
    return (
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedFiles.map((file, index) => {
          const imageUrl = URL.createObjectURL(file)
          return (
            <div key={index} className="relative w-20 h-20 border rounded overflow-hidden group">
              <Image src={imageUrl} alt={`Preview ${index + 1}`} fill className="object-cover" />
              <div
                onClick={() => removeFile(index)}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <X size={32} className="text-white" />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      {/* Label */}
      <label htmlFor={id} className={clsx(labelStyles, required && requiredStyles)}>
        {label}
      </label>
      {/* Upload button & hidden file input controlled via Controller */}
      <div className="relative">
        <label
          htmlFor={id}
          className={clsx(
            basicStyles,
            uploadStyles,
            'px-4 py-2 rounded-lg flex items-center justify-between cursor-pointer',
            errors[id] ? errorStyles : noErrorsStyles,
            disabledStyles,
          )}
        >
          <span>{renderFileNames()}</span>
          <Upload size={24} />
        </label>
        <Controller
          control={control}
          name={id}
          rules={{ required: required ? 'This field is required' : false }}
          render={({ field: { onChange, ref } }) => (
            <input
              id={id}
              type="file"
              multiple={hasMany}
              accept={accepts}
              onChange={(e) => {
                // For multiple files, pass the updated array (existing + new files).
                if (hasMany) {
                  const newFiles = Array.from(e.target.files || [])
                  // Append to current selectedFiles.
                  const updatedFiles = [...selectedFiles, ...newFiles]
                  onChange(updatedFiles)
                } else {
                  onChange(e.target.files ? e.target.files[0] : undefined)
                }
                handleFileChange(e)
              }}
              ref={ref}
              className="hidden"
            />
          )}
        />
      </div>
      {/* Error message */}
      {errors[id] && <p className={errorWarningStyles}>{errors[id]?.message as string}</p>}
      {/* Allowed types */}
      <div className="pt-2">
        <p className="text-sm text-gray-500">Allowed Type(s): {accepts}</p>
      </div>
      {/* Image previews */}
      {isImages && selectedFiles.length > 0 && renderImagePreviews()}
    </div>
  )
}

export default CustomUploadInput

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      // The result will be a base64 data URL like "data:image/png;base64,iVBORw0KGgoA..."
      // If you want just the base64 portion, you may split on the comma.
      const result = reader.result as string
      if (typeof result === 'string') {
        const base64Data = result.split(',')[1]
        if (base64Data) {
          resolve(base64Data)
        } else {
          reject(new Error('Base64 data is undefined'))
        }
      } else {
        reject(new Error('FileReader result is not a string'))
      }
    }
    reader.onerror = (error) => reject(error)
  })
}
