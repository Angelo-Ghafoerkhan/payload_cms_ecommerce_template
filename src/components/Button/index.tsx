'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { forwardRef, type ComponentPropsWithRef, type ElementType } from 'react'

/* -------------------------------------------------------------------------- */
/*  Tailwind class maps                                                       */
/* -------------------------------------------------------------------------- */

const base =
  'inline-flex items-center justify-center gap-2 font-medium ' +
  'transition-colors focus:outline-none focus-visible:ring ' +
  'disabled:pointer-events-none disabled:opacity-60'

const variants = {
  primary: 'bg-primary text-white hover:bg-secondary',
  secondary: 'bg-secondary text-white hover:bg-tertiary',
  outline: 'border-2 border-current bg-transparent hover:bg-white hover:text-black',
  link: 'underline underline-offset-4 text-primary hover:text-secondary',
} as const

const sizes = {
  sm: 'px-3 py-1 text-sm rounded',
  md: 'px-4 py-2 text-base rounded-md',
  lg: 'px-6 py-3 text-lg rounded-lg',
} as const

type Variant = keyof typeof variants
type Size = keyof typeof sizes

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export interface ButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'size'> {
  as?: ElementType
  variant?: Variant
  size?: Size
  full?: boolean
  opensInNewTab?: boolean
}

/* -------------------------------------------------------------------------- */
/*  Implementation                                                            */
/* -------------------------------------------------------------------------- */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as: Comp = 'button',
      variant = 'primary',
      size = 'md',
      full,
      className,
      opensInNewTab,
      children,
      ...rest
    },
    ref,
  ) => {
    const extra =
      Comp === 'a' && opensInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

    return (
      <Comp
        ref={ref as never}
        className={clsx(base, variants[variant], sizes[size], full && 'w-full', className)}
        {...extra}
        {...rest}
      >
        {children}
      </Comp>
    )
  },
)

Button.displayName = 'Button'
