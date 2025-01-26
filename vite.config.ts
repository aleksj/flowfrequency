import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    open: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: [
        '@tanstack/react-query',
        'react-router-dom',
        'lucide-react',
        'next-themes',
        'sonner',
        '@radix-ui/react-tooltip',
        'class-variance-authority',
        'tailwind-merge'
      ]
    }
  }
});