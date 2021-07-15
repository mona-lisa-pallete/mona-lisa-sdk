if (!process.env.COMP) {
  console.log(
    "====Error! 缺少参数 COMP=[组件目录名称]\t====\ne.g. COMP=DvImage yarn build:comp"
  );
  return;
}
const webpack = require("webpack");
const webpackConfig = require("./webpack.component.config");

const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {});
