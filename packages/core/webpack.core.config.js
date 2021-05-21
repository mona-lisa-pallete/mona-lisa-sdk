const path = require("path");

module.exports = {
  entry: {
    davinciCore: path.join(__dirname, "src", "index.ts"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s?$/,
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
