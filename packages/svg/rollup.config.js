import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    format: 'umd',
    file: 'dist/d3-composer-svg.umd.js',
    name: 'd3.composer.svg',
    globals: {
      '@d3-composer/utils': 'd3.composer.utils',
      'd3-shape': 'd3'
    }
  },
  external: ['@d3-composer/utils', 'd3-shape'],
  plugins: [resolve()]
};
