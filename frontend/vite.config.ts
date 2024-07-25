/// <reference types='vite/client' />
import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { InlineConfig } from 'vitest';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    root:'frontend',
    setupFiles: [
      './src/setupTests.ts'
    ]
  },
  server: {
    open: true,
    port: 4001,
  },
} as VitestConfigExport);
