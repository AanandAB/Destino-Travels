import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:      '#144F51',
        accent:       '#C8913A',
        'accent-light':'#D4A855',
        'accent-dark': '#A6772A',
        emerald:      '#144F51',
        surface:      '#E7EEEE',
        'surface-alt': '#F4F8F8',
        dark:         '#374151',
        card:         '#FFFFFF',
        muted:        '#6B7280',
        'bg-light':   '#FFFFFF',
        'charcoal':   '#374151',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'wa-pulse':      'wa-pulse 2s ease-in-out infinite',
        'marquee':       'marquee 30s linear infinite',
        'marquee-rev':   'marquee-rev 30s linear infinite',
        'bounce-slow':   'bounce 3s infinite',
        'fade-in':       'fadeIn 0.6s ease forwards',
      },
      keyframes: {
        'wa-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(37,211,102,0.5)' },
          '70%':      { boxShadow: '0 0 0 14px rgba(37,211,102,0)' },
        },
        'marquee': {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
