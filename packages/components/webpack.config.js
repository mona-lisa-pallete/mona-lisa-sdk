const path = require("path");
const taroBaseReg = /@tarojs[\\/][a-z]+/;

module.exports = {
  entry: {
    davinciComponents: path.join(__dirname, "src", "index.ts"),
  },
  externals: {
    "react-dom": "reactVendor.ReactDOM",
    react: "reactVendor.React",
    "@tarojs/components": "taroVendor.components",
    "@tarojs/taro": "taroVendor.taro",
    "@tarojs/runtime": "taroVendor.runtime",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [path.join(__dirname, "src")],
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  // devtool: "eval",
  // devtool: "source-map",
  mode: "development",
  output: {
    filename: "[name].dll.js",
    path: path.join(__dirname, "dist"),
    library: "[name]",
  },
};
