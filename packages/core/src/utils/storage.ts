import { IS_H5, SDKUtils } from "./index";

export const dvSetStorageSync = (key, value) => {
  if (IS_H5) {
    if (typeof value === "object") {
      return window.localStorage.setItem(key, JSON.stringify(value));
    }
    return window.localStorage.setItem(key, value);
  } else {
    return SDKUtils.setStorageSync(key, value);
  }
};

export function isStorageWithKey(key: string) {
  // Taro.getStorageSync 获取不存在的 key时返回  ''（长度为0的字符串）
  return (
    (IS_H5 && localStorage.getItem(key) !== null)
  );
}

export const dvGetStorageSync = (key) => {
  if (IS_H5) {
    let value = window.localStorage.getItem(key);
    let data;
    try {
      data = JSON.parse(value || "");
    } catch (e) {
      if (value !== "undefined" && value !== "null") {
        data = value;
      } else {
        console.error("JSON.parse error", key, value);
      }
    }

    return data || "";
  } else {
    return SDKUtils.getStorageSync(key); // 没有key时会返回 ''
  }
};

export const dvRemoveStorageSync = (key) => {
  if (IS_H5) {
    return window.localStorage.removeItem(key);
  } else {
    return SDKUtils.removeStorageSync(key);
  }
};
