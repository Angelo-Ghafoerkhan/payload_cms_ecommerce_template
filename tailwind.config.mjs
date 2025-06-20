import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'
import tailwindScrollbarHide from 'tailwind-scrollbar-hide'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [tailwindcssAnimate, typography, tailwindScrollbarHide],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        DEFAULT: '1800px',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        uniform: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        tertiary: {
          DEFAULT: 'hsl(var(--tertiary))',
          foreground: 'hsl(var(--tertiary-foreground))',
        },

        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      fontFamily: {
        header: ['var(--font-header)'],
        body: ['var(--font-body)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: [
            {
              h1: {
                fontFamily: theme('fontFamily.header'),
                fontSize: '3rem', // Smaller size as default
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
              h2: {
                fontFamily: theme('fontFamily.header'),
                fontSize: '2rem',
                marginTop: '0.5rem',
                marginBottom: '0.25em',
              },
              h3: {
                fontFamily: theme('fontFamily.header'),
                fontSize: '1.75rem',
                marginTop: '0.5rem',
                marginBottom: '0.25em',
              },
              h4: {
                fontFamily: theme('fontFamily.header'),
                fontSize: '1.5rem',
                marginTop: '0.5rem',
                marginBottom: '0.25em',
              },
              h5: {
                fontFamily: theme('fontFamily.header'),
                fontSize: '1.25rem',
                marginTop: '0.5rem',
                marginBottom: '0.25em',
              },
              h6: {
                fontFamily: theme('fontFamily.header'),
                fontSize: '1.125rem',
                marginTop: '0.5rem',
                marginBottom: '0.25em',
              },
              p: {
                fontSize: '1.125rem',
                fontWeight: 'normal',
                fontFamily: theme('fontFamily.body'),
                marginTop: '0.5rem',
                marginBottom: '0.25em',
              },
              li: {
                fontSize: '1.125rem',
                fontWeight: 'normal',
                fontFamily: theme('fontFamily.body'),
                marginTop: '0.5rem',
                marginBottom: '0.25em',
              },
              a: {
                fontSize: '1.125rem',
                fontWeight: 'normal',
                fontFamily: theme('fontFamily.body'),
                marginBottom: '0.25em',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
