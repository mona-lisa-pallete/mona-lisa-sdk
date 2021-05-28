import qs from "query-string";
import { IS_H5 } from ".";

export const getAppInstancePath = () => {
  if (IS_H5) {
    return window.location.pathname;
  }
  const pages = Taro.getCurrentPages();
  let path = "";
  if (pages && pages.length > 0) {
    const currentPage = pages[pages.length - 1];
    path = `/${currentPage && currentPage.route}`;
  } else {
    console.error("获取 path 失败");
  }
  return path;
};

export function buildParams(param) {
  if (!param) {
    return "";
  }
  delete param.nv_toString;
  return (
    "?" +
    Object.keys(param)
      .reverse()
      .map((name) => `${name}=${param[name]}`)
      .join("&")
  );
}
/**
 * 获取应用的路由参数
 * 兼容小程序与H5端
 */
export const getRouterParams = () => {
  let params;
  if (IS_H5) {
    params = qs.parse(window.location.search);
  } else {
    params = Taro.getCurrentInstance().router?.params;
  }
  if (!params) {
    // cf ref: http://doc.shensz.local/x/k1r0B
    const errStr =
      '在切换小程序到后台的一瞬间前后或在应用刚开始初始化时，尝试获取路由参数会为"undefined"';
    if (process.env.NODE_ENV === "development") {
      Taro.showToast({
        title: errStr,
        duration: 2000,
      });
    }
    console.info(errStr);
  }
  return params;
};
