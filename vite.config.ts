import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Root base for local dev (nicer URLs); the GitHub Pages project subpath only
// for production builds. Override the build base with VITE_BASE (e.g. '/' for a
// custom domain, or '/your-repo/' if the repo name isn't 'gift'). See PRD §37.
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : (process.env.VITE_BASE ?? '/gift/'),
  plugins: [react()],
}))
