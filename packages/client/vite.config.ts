import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import svgrPlugin from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: 'build',
  },
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  plugins: [react(), svgrPlugin(), tsconfigPaths()],
})
