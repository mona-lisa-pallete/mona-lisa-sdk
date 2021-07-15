const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    index: path.join(__dirname, "src", "index.ts"),
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        TARO_ENV: JSON.stringify(process.env.type),
      },
    }),
  ],
  externals: {
    "react-dom": "reactVendor.ReactDOM",
    react: "reactVendor.React",
    "@tarojs/components": "taroVendor.components",
    "@tarojs/taro": "taroVendor.taro",
    "@tarojs/components/loader": "taroVendor",

    "@monalisa-lowcode/core": "davinciCore",
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
    ],
  },
  // devtool: "eval",
  devtool: "inline-source-map",
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "lib"),
    library: "[name]",
  },
};
