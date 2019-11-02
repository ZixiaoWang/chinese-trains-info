import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'frontend/index.ts',
    output: {
        file: './index.js',
        format: 'iife'
    },
    plugins: [
        commonjs(),
        resolve(),
        typescript()
    ]
}