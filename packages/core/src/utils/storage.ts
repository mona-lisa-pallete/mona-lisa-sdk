import { IS_H5 } from "./index";
import Taro from "@tarojs/taro";

export const setStorageSync = (key, value) => {
  if (IS_H5) {
    if (typeof value === "object") {
      return window.localStorage.setItem(key, JSON.stringify(value));
    }
    return window.localStorage.setItem(key, value);
  } else {
    return Taro.setStorageSync(key, value);
  }
};

export function isStorageWithKey(key: string) {
  // Taro.getStorageSync 获取不存在的 key时返回  ''（长度为0的字符串）
  return (
    (IS_H5 && localStorage.getItem(key) !== null) ||
    (!IS_H5 && Taro.getStorageInfoSync().keys.indexOf(key) !== -1)
  );
}

export const getStorageSync = (key) => {
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
    return Taro.getStorageSync(key); // 没有key时会返回 ''
  }
};

export const removeStorageSync = (key) => {
  if (IS_H5) {
    return window.localStorage.removeItem(key);
  } else {
    return Taro.removeStorageSync(key);
  }
};

export default {
  setStorageSync,
  getStorageSync,
  removeStorageSync,
};
