import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/proxy': {
        target: 'http://13.60.31.36:7251',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ''), // Optional, to adjust path
      },
    },
  },
});
