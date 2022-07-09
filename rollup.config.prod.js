import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/registerPlugin.ts',
  output: {
    file: './dist/CostInflator.js',
    format: 'iife',
  },
  plugins: [
    typescript(),
    terser({
      format: {
        quote_style: 1,
        wrap_iife: true,
        preamble:
          '// "CostInflator" plugin for OpenRCT2. Copyright (c) 2022 Dan Stevens. Licensed under MIT.\n' +
          '// https://github.com/DanStevens/openrct2-Inflator',
      },
    }),
  ],
};
