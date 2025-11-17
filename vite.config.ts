import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import lightningcss from "vite-plugin-lightningcss";

export default defineConfig({
  plugins: [react(), tailwindcss(), lightningcss({
      browserslist: ">= 1%, last 2 versions",
      minify: true,
    })],
})