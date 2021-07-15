import { SDKUtils } from "../utils";
import { getUrlWithQuery } from "../utils/router";

export function showToast(msg: string) {
  SDKUtils.showToast({
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
  envVersion: "develop" | "trial" | "release";
  appId: string;
  urlH5: string;
  urlMini: string;
  id: string;
};
const navigateTypeFieldName = "navigateType";

export function navigateTo(params: navigateParam) {
  const {
    [navigateTypeFieldName]: navigateType,
    urlH5,
    urlMini,
    appId,
    envVersion = "release",
  } = params;

  if (navigateType === PageType.H5) {
    useH5Navigate(urlH5);
  } else if (navigateType === PageType.Mini) {
    miniNavigate(urlMini, appId, envVersion);
  } else {
    SDKUtils.showToast({
      icon: "none",
      title: `暂不支持${navigateType}类型跳转`,
    });
  }
}

function miniNavigate(
  path: string,
  appId?: string,
  envVersion?: "develop" | "trial" | "release"
) {
  if (appId) {
    SDKUtils.navigateToMiniProgram({
      appId,
      path,
      envVersion,
      success: function () {
        // 打开成功
      },
    });
  } else {
    SDKUtils.navigateTo({
      url: path,
    });
  }
}

function useH5Navigate(url: string) {
  // const reg = /sell(\.dev)?\.guorou\.net(\/dv(.*))/; // hotfix:  应用内跳转必须为 /g
  const isInternalHost = url.indexOf("http") === -1;
  const parsedUrl = getUrlWithQuery(url);
  if (isInternalHost) {
    SDKUtils.navigateTo({
      url: parsedUrl,
    });
  } else {
    window.location.href = url;
  }
}
