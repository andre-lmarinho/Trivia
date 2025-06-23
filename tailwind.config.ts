import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './public/index.html',
    './src/**/*.{tsx,ts,jsx,js,css}'
  ],
  theme: { extend: {} },
  plugins: []
}

export default config