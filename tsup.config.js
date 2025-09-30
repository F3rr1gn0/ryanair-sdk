import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.js'],
  format: ['cjs', 'esm'],
  sourcemap: true,
  clean: true,
  target: 'node18',
  splitting: false,
  shims: false,
  skipNodeModulesBundle: true,
  dts: false,
});
