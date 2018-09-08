export default {
  input: 'src/index.js',
  output: {
    format: 'umd',
    file: 'dist/d3-composer-utils.umd.js',
    name: 'd3.composer.utils',
    globals: {
      'd3-array': 'd3',
      'd3-selection': 'd3'
    }
  },
  external: ['d3-array', 'd3-selection']
};
