import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import scss from 'rollup-plugin-scss';

export default {
    input: 'frontend/index.tsx',
    output: {
        file: './main.js',
        format: 'cjs'
    },
    plugins: [
        typescript(),
        commonjs(),
        resolve(),
        scss({ output: 'main.css' })
    ]
}