import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/registerPlugin.ts',
  output: {
    file: './dev-build/CostInflator.js',
    format: 'iife',
  },
  plugins: [
    resolve(),
    typescript(),
    terser({
      format: {
        beautify: true,
        quote_style: 1,
        wrap_iife: true,
        preamble:
          '// "CostInflator" plugin for OpenRCT2. Copyright (c) 2022 Dan Stevens. Licensed under MIT.\n' +
          '// https://github.com/DanStevens/openrct2-Inflator' +
          '\n// Development build',
      },
    }),
  ],
};
