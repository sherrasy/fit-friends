/// <reference types='vite/client' />
import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { InlineConfig } from 'vitest';
import path from 'path';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@dto': path.resolve(__dirname, './src/dto'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@frontend-types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    root:'./frontend',
    setupFiles: [
      './src/setupTests.ts'
    ]
  },
  server: {
    open: true,
    port: 4001,
  },
} as VitestConfigExport);
