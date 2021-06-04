import Taro from "@tarojs/taro";
import { getUrlWithQuery } from "../utils/router";

export function showToast(msg: string) {
  Taro.showToast({
    title: String(msg),
    icon: "none",
    duration: 1500,
  });
}

type navigateParam = {
  jumpMethod: "h5" | "mini";
  url: string;
  id: string;
};
export function navigateTo(params: navigateParam) {
  const { jumpMethod, url } = params;

  if (jumpMethod === "h5") {
    useH5Navigate(url);
  } else if (jumpMethod === "mini") {
    miniNavigate(url);
  }
}

function miniNavigate(url: string) {
  Taro.navigateTo({
    url,
  });
}

function useH5Navigate(url: string) {
  const reg = /sell(\.dev)?\.guorou\.net(\/dv(.*))/; // hotfix:  应用内跳转必须为 /g
  const isInternalHost = reg.test(url);
  const parsedUrl = getUrlWithQuery(url);
  if (isInternalHost) {
    Taro.navigateTo({
      url: parsedUrl,
    });
  } else {
    window.location.href = parsedUrl;
  }
}
