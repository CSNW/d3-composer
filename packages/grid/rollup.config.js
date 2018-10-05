import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import buble from 'rollup-plugin-buble';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const banner = `//! ${pkg.name} v${pkg.version} - ${pkg.homepage} - @license: ${
  pkg.license
}`;
const config = {
  input: 'src/index.js',
  output: {
    format: 'umd',
    file: 'dist/d3-composer-grid.js',
    name: 'd3c',
    globals: {
      '@d3-composer/utils': 'd3c'
    },
    extend: true,
    banner
  },
  external: ['@d3-composer/utils'],
  plugins: [resolve(), filesize(), buble()]
};

export default [
  config,
  {
    ...config,
    output: {
      ...config.output,
      file: 'dist/d3-composer-grid.min.js'
    },
    plugins: [
      ...config.plugins,
      buble(),
      terser({ output: { preamble: banner } })
    ]
  }
];
