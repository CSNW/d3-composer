import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';

export default {
  input: 'src/index.js',
  output: {
    format: 'umd',
    file: 'dist/d3-composer-grid.umd.js',
    name: 'd3c',
    extend: true
  },
  plugins: [resolve(), filesize()]
};
