import queryString from "query-string";
import Taro from "@tarojs/taro";
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

export const getUrlWithQuery = (
  urlWithParams: string,
  params?: Partial<Record<string, string>>
): string => {
  const { url, query } = queryString.parseUrl(urlWithParams);

  const queryObj = {
    ...(params || {}),
    ...query,
  };

  const stringified = queryString.stringify(queryObj);
  return stringified ? `${url.replace(/(.*?)\/$/, "$1")}?${stringified}` : url;
};

export function userParams() {
  const p = Taro.useRouter()?.params;
  delete p.$taroTimestamp;
  return p;
}
