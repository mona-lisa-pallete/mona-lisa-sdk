import Taro from "@tarojs/taro";
import { getUrlWithQuery } from "../utils/router";

export function showToast(msg: string) {
  Taro.showToast({
    title: String(msg),
    icon: "none",
    duration: 1500,
  });
}

export enum PageType {
  InternalPage = "internalPage",
  H5 = "h5",
  Mini = "mini",
}

type navigateParam = {
  navigateType: PageType;
  url: string;
  id: string;
};
const navigateTypeFieldName = "navigateType";

export function navigateTo(params: navigateParam) {
  const { [navigateTypeFieldName]: navigateType, url } = params;

  if (navigateType === PageType.H5) {
    useH5Navigate(url);
  } else if (navigateType === PageType.Mini) {
    miniNavigate(url);
  } else {
    Taro.showToast({
      icon: "none",
      title: `暂不支持${navigateType}类型跳转`,
    });
  }
}

function miniNavigate(url: string) {
  Taro.navigateTo({
    url,
  });
}

function useH5Navigate(url: string) {
  // const reg = /sell(\.dev)?\.guorou\.net(\/dv(.*))/; // hotfix:  应用内跳转必须为 /g
  const isInternalHost = url.indexOf('http') === -1;
  const parsedUrl = getUrlWithQuery(url);
  if (isInternalHost) {
    Taro.navigateTo({
      url: parsedUrl,
    });
  } else {
    window.location.href = url;
  }
}
