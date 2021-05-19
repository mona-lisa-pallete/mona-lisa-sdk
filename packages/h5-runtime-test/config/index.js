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
    publicPath: "/packages/h5-runtime-test/dist",
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
    webpackChain(chain) {
      chain.mode("development");
      // chain.optimization.splitChunks({
      //   chunks: "all",
      //   maxInitialRequests: Infinity,
      //   minSize: 0,
      //   name: "vendors",
      //   cacheGroups: {
      //     // vendors: {
      //     //   name:  "vendors",
      //     //   minChunks: 2,
      //     //   test: (module) => {
      //     //     // 如果需要自定义配置，PARSE_AST_TYPE 可以从 webpackChain 第三个参数获得
      //     //     return (
      //     //       /[\\/]node_modules[\\/]/.test(module.resource) &&
      //     //       module.miniType !== PARSE_AST_TYPE.COMPONENT
      //     //     );
      //     //   },
      //     //   priority: 10,
      //     // },
      //     taro: {
      //       name: "taro_foo",
      //       test: (module) => {
      //         const taroBaseReg = new RegExp(`@tarojs[\\/]taro`);
      //         return taroBaseReg.test(module.context);
      //       },
      //       priority: 100,
      //     },
      //   },
      // });

      chain.externals({
        "@davinci/components": "davinciComponents",
        react: "reactVendor.React",
        "react-dom": "reactVendor.ReactDOM",
        "@tarojs/components": "taroVendor.components",
        "@tarojs/taro": "taroVendor.taro",
        "@tarojs/runtime": "taroVendor.runtime",
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
