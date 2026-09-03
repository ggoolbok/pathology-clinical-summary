import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from https://<owner>.github.io/pathology-clinical-summary/ on GitHub
// Pages, so assets must resolve under that subpath rather than domain root.
// Local dev (`npm run dev`) is unaffected — Vite defaults BASE_URL to '/' unless
// this is set for a build, and dev always runs with the dev server's own base.
export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/pathology-clinical-summary/' : '/',
  plugins: [react()],
});
