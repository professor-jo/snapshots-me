import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages serves the site from /snapshots-me/ (set in the deploy workflow); elsewhere it is /.
  base: process.env.BASE_PATH || "/",
  plugins: [react()],
});
