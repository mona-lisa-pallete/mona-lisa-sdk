const path = require("path");

module.exports = {
  entry: {
    davinciCore: path.join(__dirname, "src", "index.ts"),
  },
  externals: {
    "react-dom": "reactVendor.ReactDOM",
    react: "reactVendor.React",
    "@tarojs/components": "taroVendor.components",
    "@tarojs/taro": "taroVendor.taro",
    "@tarojs/runtime": "taroVendor.runtime",
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx"],
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
