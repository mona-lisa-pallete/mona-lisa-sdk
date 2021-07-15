export const IS_H5 = process.env.TARO_ENV === "h5";

export const SDKUtils = {
  request: (options) => {},
  showToast: (options) => {},
  navigateToMiniProgram: (options) => {},
  navigateTo: (options) => {},
  setStorageSync: (key, value) => {},
  getStorageSync: (options) => {},
  getStorageInfoSync: () => {},
  removeStorageSync: (options) => {},
  pxTransform: (options, other) => {return options},
  getCurrentPages: () => {
    return []
  },
}
