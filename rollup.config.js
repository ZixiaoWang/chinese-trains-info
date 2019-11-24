import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import scss from 'rollup-plugin-scss';

export default {
    input: './frontend/index.tsx',
    output: {
        file: './static/main.js',
        format: 'cjs',
        intro: 'const process = { env: { NODE_ENV: null } };'
    },
    plugins: [
        typescript({
            clean: true,
            objectHashIgnoreUnknownHack: false
        }),
        commonjs(),
        resolve(),
        scss({ output: './static/main.css' }),
        copy({
            targets: [{ src: './frontend/index.html', dest: './static' }],
            verbose: true
        })
    ]
}