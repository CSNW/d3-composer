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
    format: 'es',
    file: 'dist/d3-composer.es.js',
    name: 'd3c',
    globals: {
      'd3-array': 'd3',
      'd3-axis': 'd3',
      'd3-selection': 'd3',
      'd3-shape': 'd3'
    },
    extend: true,
    banner
  },
  external: ['d3-array', 'd3-axis', 'd3-selection', 'd3-shape'],
  plugins: [resolve(), filesize()]
};

export default [
  config,
  {
    ...config,
    output: {
      ...config.output,
      format: 'umd',
      file: 'dist/d3-composer.js'
    },
    plugins: [...config.plugins, buble()]
  },
  {
    ...config,
    output: {
      ...config.output,
      format: 'umd',
      file: 'dist/d3-composer.min.js'
    },
    plugins: [
      ...config.plugins,
      buble(),
      terser({ output: { preamble: banner } })
    ]
  }
];
