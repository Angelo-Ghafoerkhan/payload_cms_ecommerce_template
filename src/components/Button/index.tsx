'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { forwardRef, type ComponentPropsWithRef, type ElementType, type ReactNode } from 'react'

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
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
} as const

const radii = {
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
} as const

type Variant = keyof typeof variants
type Size = keyof typeof sizes
type Radius = keyof typeof radii

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export interface ButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'size'> {
  as?: ElementType
  variant?: Variant
  size?: Size
  full?: boolean
  rounded?: Radius
  opensInNewTab?: boolean
  link?: string
  children: ReactNode
}

/* -------------------------------------------------------------------------- */
/*  Implementation                                                            */
/* -------------------------------------------------------------------------- */

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      as = 'button',
      variant = 'primary',
      size = 'md',
      rounded = 'md',
      full,
      className,
      opensInNewTab,
      link,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = clsx(
      base,
      variants[variant],
      sizes[size],
      radii[rounded],
      full && 'w-full',
      className,
    )

    const extraProps = link && opensInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

    if (link) {
      return (
        <Link href={link} className={classes} {...extraProps}>
          {children}
        </Link>
      )
    }

    const Comp = as

    return (
      <Comp ref={ref as never} className={classes} {...extraProps} {...rest}>
        {children}
      </Comp>
    )
  },
)

Button.displayName = 'Button'

export default Button
