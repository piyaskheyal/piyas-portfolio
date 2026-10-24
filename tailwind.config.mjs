/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        surface: {
          950: '#090A0C',
          900: '#101216',
          800: '#181B20',
          700: '#242930',
        },
        accent: {
          DEFAULT: '#10B981', // Crisp Robotics Telemetry Emerald
          muted: 'rgba(16, 185, 129, 0.12)',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
};