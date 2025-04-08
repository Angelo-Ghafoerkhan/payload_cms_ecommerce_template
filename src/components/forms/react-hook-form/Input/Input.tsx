'use client'
import clsx from 'clsx'
import React, { FC, Fragment, useState } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
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
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  disabled?: boolean
  placeholder?: string
  animatePlaceholder: boolean
  className?: string
  allowShowPassword?: boolean
}

const Input: FC<InputProps> = ({
  label,
  id,
  type = 'text',
  required,
  register,
  errors,
  disabled,
  placeholder,
  animatePlaceholder,
  className = '',
  allowShowPassword,
}) => {
  // Function to enforce numeric-only input when type is "number"
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')
    }
  }

  // Local state to help with floating label behavior (optional)
  const [hasFocus, setHasFocus] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Helper to determine if input/textarea has a value.
  const hasValue = Boolean((register(id)?.ref as any)?.value)

  const topClass =
    type === 'textarea'
      ? (hasFocus || hasValue ? '-top-7' : 'top-3')
      : (hasFocus || hasValue ? '-top-7' : 'top-1/2 -translate-y-1/2')

  if (animatePlaceholder) {
    return (
      <div className="flex flex-col w-full">
        <div className="relative">
          {type === 'textarea' ? (
            <textarea
              id={id}
              autoComplete={id}
              disabled={disabled}
              {...register(id, { required })}
              // Use a blank placeholder so the browser doesn't show its own
              placeholder=" "
              className={clsx(
                className,
                basicStyles,
                textareaStyles,
                !errors[id] && noErrorsStyles,
                errors[id] && errorStyles,
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
                {...register(id, { required })}
                placeholder=" "
                className={clsx(
                  className,
                  basicStyles,
                  inputStyles,
                  !errors[id] && noErrorsStyles,
                  errors[id] && errorStyles,
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
              (hasFocus || hasValue)
                ? 'bg-inherit text-gray-600 left-0'
                : 'text-base text-gray-400 left-4'
            )}
          >
            {label}
          </label>
        </div>
        {errors[id] && (
          <span className={errorWarningStyles}>This field is required</span>
        )}
      </div>
    )
  }

  // Default rendering (without animated placeholder)
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className={clsx(labelStyles, required && requiredStyles)}>
        {label}
      </label>
      <div>
        {type === 'textarea' ? (
          <textarea
            id={id}
            autoComplete={id}
            disabled={disabled}
            {...register(id, { required })}
            placeholder={placeholder}
            className={clsx(
              className,
              basicStyles,
              textareaStyles,
              !errors[id] && noErrorsStyles,
              errors[id] && errorStyles,
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
              {...register(id, { required })}
              placeholder={placeholder}
              className={clsx(
                className,
                basicStyles,
                inputStyles,
                !errors[id] && noErrorsStyles,
                errors[id] && errorStyles,
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
        {errors[id] && (
          <span className={errorWarningStyles}>This field is required</span>
        )}
      </div>
    </div>
  )
}

export default Input
