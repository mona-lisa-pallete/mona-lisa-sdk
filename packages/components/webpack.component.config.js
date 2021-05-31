const path = require("path");

const compName = process.env.COMP;
const time = (+new Date()).toString();
module.exports = {
  entry: path.join(__dirname, "src", "components", compName),
  externals: {
    "react-dom": "reactVendor.ReactDOM",
    react: "reactVendor.React",
    "@tarojs/components": "taroVendor.components",
    "@tarojs/taro": "taroVendor.taro",
    "@tarojs/components/loader": "taroVendor",

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
    filename: "index.js",
    path: path.join(__dirname, "lib", compName, time),
    library: compName,
  },
};
