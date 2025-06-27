import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './public/index.html',
    './src/**/*.{tsx,ts,jsx,js,css}',
    './node_modules/@headlessui/react/**/*.{js,ts,jsx,tsx}',
  ],
  theme: { extend: {} },
  plugins: []
}

export default config