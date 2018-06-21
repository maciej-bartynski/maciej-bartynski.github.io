import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import sassImporter from 'node-sass-package-importer';
import scss from 'rollup-plugin-scss';
import multiEntry from "rollup-plugin-multi-entry";

export default {
    input: ['source/main.js'],
    output: {name: 'bundle', file: './bundle/main.js'},
    format: 'iife',
    sourceMap: 'inline',
    plugins: [
        multiEntry(),
        scss({
            failOnError: false,
            importer: sassImporter(),
            insert: false,
            outputStyle: 'expanded',
            output: './bundle/styles.css'
        }),
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
        }),
        replace({
            exclude: 'node_modules/**',
            ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        uglify(),

    ],
};