// @see https://github.com/snowpackjs/create-snowpack-app/tree/master/packages/app-scripts-react/jest
"use strict";

const babelJest = require("babel-jest");
const importMetaBabelPlugin = require("./importMetaBabelPlugin");

module.exports = babelJest.createTransformer({
  plugins: [[importMetaBabelPlugin]],
});
