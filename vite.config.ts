import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8')) as {
  homepage?: string;
};
const homepagePath = (() => {
  if (!pkg.homepage) {
    return '/';
  }
  try {
    const { pathname } = new URL(pkg.homepage);
    if (!pathname || pathname === '/') {
      return '/';
    }
    return pathname.endsWith('/') ? pathname : `${pathname}/`;
  } catch {
    return '/';
  }
})();

export default defineConfig({
  base: homepagePath,
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
});
