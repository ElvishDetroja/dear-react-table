import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/dear-react-table.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    postcss({
      extract: "dear-react-table.css",
      minimize: true,
    }),
    resolve(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
      presets: ["@babel/preset-react", "@babel/preset-env"],
    }),
    terser(),
  ],
  external: ["react", "react-dom"], // Exclude React and ReactDOM
};
