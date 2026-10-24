/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#EB4618', // Vermilion Orange
          dark: '#C8320A',
          light: '#FF5C2E',
        },
        swiss: {
          bg: '#F6F6F4', // Warm off-white primary light background
          surface: '#FFFFFF', // Pure white
          stone: '#EBEBE9', // Muted stone gray for bento/contact tiles
          pill: '#EAEAE8', // Pill badge gray
          ink: '#111111', // Primary ink
          muted: '#8A8A8A', // Secondary gray
          border: '#E2E2E0', // Structural hairline grid
          dark: '#0F0F0F', // Deep carbon black
          darkSurface: '#161616',
          darkCard: '#1C1C1C',
          espresso: '#140E0C', // Full-screen menu overlay
        },
        surface: {
          950: 'rgb(var(--surface-950) / <alpha-value>)',
          900: 'rgb(var(--surface-900) / <alpha-value>)',
          800: 'rgb(var(--surface-800) / <alpha-value>)',
          700: 'rgb(var(--surface-700) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
};
