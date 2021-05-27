const path = require("path");
const webpack = require("webpack");
const taroBaseReg = /@tarojs[\\/][a-z]+/;

module.exports = {
  entry: {
    antdVendor: path.join(__dirname, "src", "antd.ts"),
    taroVendor: path.join(__dirname, "src", "taro.ts"),
  },
  externals: {
    "react-dom": "reactVendor.ReactDOM",
    react: "reactVendor.React",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        TARO_ENV: JSON.stringify("h5"),
        FRAMEWORK: JSON.stringify("react"),
      },
    }),
  ],
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
