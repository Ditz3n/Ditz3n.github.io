import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Ditz3n.github.io/frontend', // This is the default value for Ditz3n.github.io
});
