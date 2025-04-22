import tsconfig from './tsconfig.app.json';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

const mapTsconfigPathsToAliases = () => {
  const { paths, baseUrl } = tsconfig.compilerOptions;
  const srcPath = path.resolve(__dirname, baseUrl || 'src');

  const aliases: Record<string, string> = {};

  for (const [alias, patterns] of Object.entries<string[]>(paths)) {
    // Убираем звездочку из алиаса
    const cleanAlias = alias.replace('/*', '');

    // Берем первый паттерн и убираем звездочку
    const pattern = patterns[0].replace('/*', '');

    aliases[cleanAlias] = path.resolve(srcPath, pattern);
  }

  return aliases;
};

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/styles/_variables.scss" as *;`,
      },
    },
  },
  base: '/hw-3/',
  plugins: [react(), svgr()],
  resolve: {
    alias: mapTsconfigPathsToAliases(),
  },
});
