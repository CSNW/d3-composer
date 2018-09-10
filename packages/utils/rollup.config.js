import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';

export default {
  input: 'src/index.js',
  output: {
    format: 'umd',
    file: 'dist/d3-composer-utils.umd.js',
    name: 'd3c',
    globals: {
      'd3-array': 'd3',
      'd3-selection': 'd3'
    },
    extend: true
  },
  external: ['d3-array', 'd3-selection'],
  plugins: [resolve(), filesize()]
};
