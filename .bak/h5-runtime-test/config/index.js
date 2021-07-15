/* eslint-disable import/no-commonjs */
const path = require("path");

const taroBaseReg = new RegExp(`@tarojs[\\/]`);
console.log("__dirname", __dirname);
const config = {
  projectName: "h5-runtime-test",
  date: "2021-5-13",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: "react",
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
    devServer: {
      contentBase: [path.join(__dirname, "..", "link")],
    },
    webpackChain(chain) {
      chain.mode("development");

      chain.externals({
        // "@monalisa-lowcode/components": "davinciComponents",
        "@monalisa-lowcode/core": "davinciCore",
        react: "reactVendor.React",
        "react-dom": "reactVendor.ReactDOM",
        "@tarojs/components": "taroVendor.components",
      });
      chain.optimization.sideEffects(false);
      chain.optimization.splitChunks({
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        name: "vendors",
        cacheGroups: {
          taro: {
            name: "taro_foo",
            test: (module) => {
              return taroBaseReg.test(module.context);
            },
            priority: 100,
          },
        },
      });
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
