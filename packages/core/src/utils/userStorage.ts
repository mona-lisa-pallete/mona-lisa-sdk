import queryString from "query-string";
import { LOCAL_KEY_TOKEN, USER_INFO } from "../constants";
import { getSSZUserAccessToken, isInClient } from "./appSSZ";
import { dvGetStorageSync, dvSetStorageSync } from "./storage";

export type UserInfoType = {
  accessToken?: string;
  avatar?: string;
  phoneNumber?: string;
  registerSource?: string;
  registerActivity?: string;
  userId?: string;
  userName?: string;
};

export function getToken() {
  const { query } = queryString.parseUrl(window.location.search);
  const token =
    getSSZUserAccessToken() ||
    query?.access_token ||
    dvGetStorageSync(LOCAL_KEY_TOKEN);
  return token;
}

export const judgeLoginStatus = () => {
  let isLogin = false;

  if (isInClient) {
    // 如果 APP 端当前的 token 值与 storage 值不一致时，表示使用新账号登录，此情况为非登录状态。
    if (getToken() !== dvGetStorageSync(LOCAL_KEY_TOKEN)) {
      isLogin = false;
    }
  } else if (dvGetStorageSync(LOCAL_KEY_TOKEN)) {
    if (dvGetStorageSync(USER_INFO)?.userId) {
      isLogin = true;
    }
  }
  // if (!IS_H5) {
  //   // TODO: 小程序必须有 openId
  //   isLogin = isLogin && !!dvGetStorageSync(LOCAL_KEY_OPENID);
  // }
  return isLogin;
};

export const getUserInfoFromStorage = (): UserInfoType => {
  return dvGetStorageSync(USER_INFO);
};

export const setUserInfoFromStorage = (userInfo: UserInfoType) => {
  dvSetStorageSync(USER_INFO, userInfo);
  dvSetStorageSync(LOCAL_KEY_TOKEN, userInfo?.accessToken || "");
};
