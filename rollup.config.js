import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const extensions = ['.ts'];

const name = 'RollupTypeScriptBabel';

export default [
  {
    input: 'src/null-safety.ts',

    // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
    // https://rollupjs.org/guide/en#external-e-external
    external: [],

    plugins: [
      // Allows node_modules resolution
      resolve({ extensions }),

      // Allow bundling cjs modules. Rollup doesn't understand cjs
      commonjs(),

      typescript({
        tsconfig: 'src/tsconfig.json',
        useTsconfigDeclarationDir: true,
      }),

      // Compile TypeScript/JavaScript files
      babel({ extensions }),
    ],

    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
      {
        file: pkg.browser,
        format: 'iife',
        name,

        // https://rollupjs.org/guide/en#output-globals-g-globals
        globals: {},
      },
    ],
  },
];
