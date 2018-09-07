import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    format: 'iife',
    file: 'dist/example.js'
  },
  plugins: [resolve()]
};
