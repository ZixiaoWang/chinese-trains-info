import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'frontend/index.tsx',
    output: {
        file: './index.js',
        format: 'cjs'
    },
    plugins: [
        typescript(),
        commonjs(),
        resolve()
    ]
}