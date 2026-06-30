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
        target: 'https://gist.githubusercontent.com/pandawabs/9d98240d06ce64162aebc93905798655/raw/cb800e3aefe9a03fddd9762e260c69933f5a5f23',
        changeOrigin: true,
        rewrite: () => '/pandawabs-cv-en.json',
      },
      '/api/cv-id.json': {
        target: 'https://gist.githubusercontent.com/pandawabs/9d98240d06ce64162aebc93905798655/raw/cb800e3aefe9a03fddd9762e260c69933f5a5f23',
        changeOrigin: true,
        rewrite: () => '/pandawabs-cv-id.json',
      },
    },
  },
})
