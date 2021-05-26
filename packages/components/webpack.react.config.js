const path = require("path");
const webpack = require("webpack");
const taroBaseReg = /@tarojs[\\/][a-z]+/;

module.exports = {
  entry: {
    reactVendor: path.join(__dirname, "src", "react.ts"),
  },
  // devtool: "eval",
  // devtool: "source-map",
  mode: "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
  },
  output: {
    filename: "[name].dll.js",
    path: path.join(__dirname, "lib"),
    library: "[name]",
  },
};
