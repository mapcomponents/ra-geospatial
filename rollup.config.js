import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

import babel from "@rollup/plugin-babel";
import url from "@rollup/plugin-url";
import external from "rollup-plugin-peer-deps-external";

import del from "rollup-plugin-delete";

const config = {
  input: "src/index.ts",
  output: [
    {
      inlineDynamicImports: true,
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    url(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"],
    }),
    external(),
    peerDepsExternal(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfig: "tsconfig.json",
    }),
    del({ targets: ["build/*"] }),
  ],
  external: [
    "@mapcomponents/react-maplibre",
    "react-admin",
    "react",
    "wellknown"
  ],

  onwarn: function (warning, warn) {
    warn(warning);
  },
};
export default config;
