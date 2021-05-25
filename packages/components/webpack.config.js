const path = require("path");
const taroBaseReg = /@tarojs[\\/][a-z]+/;

module.exports = {
  entry: {
    davinciComponents: path.join(__dirname, "src", "index.ts"),
    antd: path.join(__dirname, "src", "antd.ts")
  },
  externals: {
    "react-dom": "reactVendor.ReactDOM",
    react: "reactVendor.React",
    "@tarojs/components": "taroVendor.components",
    "@tarojs/taro": "taroVendor.taro",
    "@tarojs/runtime": "taroVendor.runtime",
    "@davinci/core": "davinciCore",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.join(__dirname, "src")],
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  // devtool: "eval",
  devtool: "inline-source-map",
  mode: "development",
  output: {
    filename: "[name].dll.js",
    path: path.join(__dirname, "lib"),
    library: "[name]",
  },
};
