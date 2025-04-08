'use client'

import clsx from 'clsx'
import React, { FC, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import {
  disabledStyles,
  errorStyles,
  basicStyles,
  requiredStyles,
  textareaStyles,
  labelStyles,
  noErrorsStyles,
  inputStyles,
  errorWarningStyles,
} from '../../styles/input'

interface InputProps {
  label?: string
  id: string
  type?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  animatePlaceholder: boolean
  className?: string
  allowShowPassword?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur?: () => void
}

const Input: FC<InputProps> = ({
  label,
  id,
  type = 'text',
  required,
  disabled,
  placeholder,
  animatePlaceholder,
  className = '',
  allowShowPassword,
  value,
  onChange,
  onBlur,
}) => {
  // Function to enforce numeric-only input when type is "number"
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')
    }
  }

  const [hasFocus, setHasFocus] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const hasValue = value?.trim() !== '' // Check if value is not an empty string or only whitespace

  const topClass =
    type === 'textarea'
      ? hasFocus || hasValue
        ? '-top-7'
        : 'top-3'
      : hasFocus || hasValue
        ? '-top-7'
        : 'top-1/2 -translate-y-1/2'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e)
  }

  if (animatePlaceholder) {
    return (
      <div className="flex flex-col w-full">
        <div className="relative">
          {type === 'textarea' ? (
            <textarea
              id={id}
              autoComplete={id}
              disabled={disabled}
              value={value}
              onChange={handleChange}
              placeholder=" "
              className={clsx(
                className,
                basicStyles,
                textareaStyles,
                !value && noErrorsStyles,
                value && errorStyles, // You can add your custom validation logic here if needed
                disabled && disabledStyles,
              )}
              onFocus={() => setHasFocus(true)}
              onBlur={() => setHasFocus(false)}
            />
          ) : (
            <div className="relative">
              <input
                id={id}
                type={showPassword ? 'text' : type}
                autoComplete={id}
                disabled={disabled}
                value={value}
                onChange={handleChange}
                placeholder=" "
                className={clsx(
                  className,
                  basicStyles,
                  inputStyles,
                  !value && noErrorsStyles,
                  value && errorStyles, // You can add your custom validation logic here if needed
                  disabled && disabledStyles,
                )}
                onFocus={() => setHasFocus(true)}
                onBlur={() => setHasFocus(false)}
                onInput={type === 'number' ? handleInput : undefined}
              />
              {/* Show/hide password icon */}
              {type === 'password' && allowShowPassword && (
                <div
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </div>
              )}
            </div>
          )}
          {/* Floating label */}
          <label
            htmlFor={id}
            className={clsx(
              'absolute transition-all duration-300 pointer-events-none',
              topClass,
              hasFocus || hasValue
                ? 'bg-inherit text-gray-600 left-0'
                : 'text-base text-gray-400 left-4',
            )}
          >
            {label}
          </label>
        </div>
        {/* Display error message if there's any */}
        {/* {value && <span className={errorWarningStyles}>This field is required</span>} */}
      </div>
    )
  }

  // Default rendering (without animated placeholder)
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={id} className={clsx(labelStyles, required && requiredStyles)}>
          {label}
        </label>
      )}
      <div>
        {type === 'textarea' ? (
          <textarea
            id={id}
            autoComplete={id}
            disabled={disabled}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={clsx(
              className,
              basicStyles,
              textareaStyles,
              !value && noErrorsStyles,
              value && errorStyles, // You can add your custom validation logic here if needed
              disabled && disabledStyles,
            )}
          />
        ) : (
          <div className="relative">
            <input
              id={id}
              type={showPassword ? 'text' : type}
              autoComplete={id}
              disabled={disabled}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              className={clsx(
                className,
                basicStyles,
                inputStyles,
                !value && noErrorsStyles,
                value && errorStyles, // You can add your custom validation logic here if needed
                disabled && disabledStyles,
              )}
              onInput={type === 'number' ? handleInput : undefined}
            />
            {/* Show/hide password icon */}
            {type === 'password' && allowShowPassword && (
              <div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </div>
            )}
          </div>
        )}
        {/* Display error message if there's any */}
        {/* {value && <span className={errorWarningStyles}>This field is required</span>} */}
      </div>
    </div>
  )
}

export default Input
