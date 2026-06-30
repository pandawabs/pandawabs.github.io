import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/cv-en.json': {
        target: 'https://gist.githubusercontent.com/pandawabs/9d98240d06ce64162aebc93905798655/raw/466d0c961c0894f65c6ff8c5753fa16ebc679389',
        changeOrigin: true,
        rewrite: () => '/pandawabs-cv-en.json',
      },
      '/api/cv-id.json': {
        target: 'https://gist.githubusercontent.com/pandawabs/9d98240d06ce64162aebc93905798655/raw/466d0c961c0894f65c6ff8c5753fa16ebc679389',
        changeOrigin: true,
        rewrite: () => '/pandawabs-cv-id.json',
      },
    },
  },
})
