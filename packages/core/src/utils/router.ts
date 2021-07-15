import queryString from 'query-string';
import { IS_H5, SDKUtils } from '.';
import { merge } from '../trackLog';

export const getAppInstancePath = () => {
  if (IS_H5) {
    return window.location.pathname;
  }
  // const pages = SDKUtils.getCurrentPages();
  let path = '';
  // if (pages && pages.length > 0) {
  //   const currentPage = pages[pages.length - 1];
  //   path = `/${currentPage && currentPage.route}`;
  // } else {
  //   console.error('获取 path 失败');
  // }
  return path;
};

export function buildParams(param) {
  if (!param) {
    return '';
  }
  delete param.nv_toString;

  let logParams = param;
  // 把所有参数拼接到url上，仅作打点归档
  if (
    logParams.other &&
    Object.prototype.toString.call(logParams.other) === '[object Object]'
  ) {
    logParams = merge(logParams.other, logParams);
    delete logParams.other;
  }

  return (
    '?' +
    Object.keys(logParams)
      .reverse()
      .map((name) => `${name}=${logParams[name]}`)
      .join('&')
  );
}

export const getUrlWithQuery = (
  urlWithParams: string,
  params?: Partial<Record<string, string>>,
): string => {
  const { url, query } = queryString.parseUrl(urlWithParams);

  const queryObj = {
    ...(params || {}),
    ...query,
  };

  const stringified = queryString.stringify(queryObj);
  return stringified ? `${url.replace(/(.*?)\/$/, '$1')}?${stringified}` : url;
};