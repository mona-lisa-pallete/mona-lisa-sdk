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
    extensions: [".tsx", ".ts", ".js", ".jsx", ".css"],
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
      {
        test: /\.less$/,
        include: [path.join(__dirname, "src")],
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|bpm|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 3000,
          name: "img/[name].[ext]",
        },
      },
    ],
  },
  watch: true,
  // devtool: "eval",
  devtool: "inline-source-map",
  mode: "development",
  output: {
    filename: "index.js",
    path: path.join(__dirname, "lib", compName, time),
    library: compName,
  },
};
