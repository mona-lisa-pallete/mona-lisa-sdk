const path = require("path");
const taroBaseReg = /@tarojs[\\/][a-z]+/;

module.exports = {
  entry: {
    reactVendor: path.join(__dirname, "src", "vendor.ts"),
    // taroVendor: path.join(__dirname, "src", "taro.ts"),
  },
  // devtool: "eval",
  // devtool: "source-map",
  mode: "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
  },
  output: {
    filename: "[name].dll.js",
    path: path.join(__dirname, "dist"),
    library: "[name]",
  },
};
