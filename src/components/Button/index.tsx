import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { FC, ElementType } from 'react'

interface ButtonProps {
  text: string
  type?: 'button' | 'submit'
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  secondary?: boolean
  link?: string
  disabled?: boolean
  opensInNewTab?: boolean
  outline?: boolean
  bgColor?: string // Color value, e.g., '#ff0000' or 'red'
  bgHoverColor?: string // Color value for hover state
  textColor?: string // Color value
  textHoverColor?: string // Color value for hover state
  onClick?: () => void
}

const Button: FC<ButtonProps> = ({
  text,
  type = 'button',
  rounded,
  secondary,
  link,
  disabled,
  opensInNewTab,
  outline,
  bgColor,
  bgHoverColor,
  textColor,
  textHoverColor,
  onClick,
}) => {
  // Build class names using Tailwind's arbitrary value syntax
  const className = clsx(
    // Default classes
    'grow min-h-8 px-6 py-1 min-w-max max-h-min text-lg text-center transition-colors duration-300',

    // Default styles if not overridden by props
    !bgColor && !secondary && !outline && 'bg-primary',
    !bgHoverColor && !secondary && !outline && 'hover:bg-secondary',
    !textColor && !secondary && !outline && 'text-white',

    secondary && !bgColor && 'bg-secondary',
    secondary && !bgHoverColor && 'hover:bg-tertiary',
    secondary && !textColor && 'text-white',

    outline && !bgColor && 'bg-transparent',
    outline && 'border-2', // Default border width
    outline && !textColor && 'text-gray-800',
    outline && !bgHoverColor && 'hover:bg-white',
    outline && !textHoverColor && 'hover:text-black',

    disabled && 'cursor-not-allowed opacity-75',

    rounded &&
      {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      }[rounded],

    // Apply custom colors using Tailwind's arbitrary values
    bgColor && `bg-[${bgColor}]`,
    bgHoverColor && `hover:bg-[${bgHoverColor}]`,
    textColor && `text-[${textColor}]`,
    textHoverColor && `hover:text-[${textHoverColor}]`,

    outline && 'border', // Ensure 'border' class is applied when outline is true
  )

  // Determine the component type and props based on 'link' and 'opensInNewTab'
  const Component: ElementType = link ? (opensInNewTab ? 'a' : Link) : 'button'

  const componentProps: any = {
    className,
    onClick,
  }

  if (link) {
    componentProps.href = link
    if (opensInNewTab) {
      componentProps.target = '_blank'
      componentProps.rel = 'noopener noreferrer'
    }
  } else {
    componentProps.type = type
    componentProps.disabled = disabled
  }

  return <Component {...componentProps}>{text}</Component>
}

export default Button
