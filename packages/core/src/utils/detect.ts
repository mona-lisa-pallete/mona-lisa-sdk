/* eslint-disable */

import { IS_H5 } from ".";

/**
 * 设备判断
 */

declare global {
  interface Window {
    ua: any;
    ssz: any;
    dpr: any;
  }
}

// 兼容 CommonJS 与 ES6 module
function detect() {
  if (!IS_H5) {
    return {
      os: {},
      browser: {
        wechat: true,
        // pcwechat: false,
        // desktop: false,
        // chromePc: false,
        // ssz: false,
        appVersion: -1,
      },
    };
  }
  const ua = window.navigator.userAgent as any;
  const os: any = {};
  const browser: any = {};
  const webkit = ua.match(/WebKit\/([\d.]+)/);
  const android = ua.match(/(Android).*([\d.]+)/);
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  const kindle = ua.match(/Kindle\/([\d.]+)/);
  const silk = ua.match(/Silk\/([\d._]+)/);
  const uc = ua.match(/UC/);
  const ssz = ua.match(/ssz|shensz/gi);
  const windows = ua.match(/Win/);
  const mac = ua.match(/Mac/);
  const wechat = ua.match(/MicroMessenger/);
  const qq = ua.match(/QQ/);
  const ie = ua.match(/msie (\d+\.\d+)/i); // 只能判断IE11以下（不包含IE11）
  const electron = ua.match(/electron/i);
  const meizu = ua.match(/MZbroswer/i); // 魅族手机自带浏览器
  const wxIosNativeApp = ua.match(/iPhone;/i); // ios网校APP平台
  browser.webkit = !!webkit;
  const hasEdgeWord = ua.match(/Edge/i);
  const hasFirefoxWord = ua.match(/Firefox/i);
  const hasChromeWord = ua.match(/Chrome/i);
  const hasSafariWord = ua.match(/Safari/i);

  if (browser.webkit) {
    browser.version = browser.webkit[1];
  }
  if (android) {
    os.android = true;
    os.version = android[2];
  }
  if (iphone) {
    os.ios = true;
    os.iphone = true;
    os.version = iphone[2].replace(/_/g, ".");
  }
  // ios网校app带来的坑
  if (wxIosNativeApp) {
    os.ios = true;
    os.iphone = true;
    os.version = "";
  }
  if (ipad) {
    os.ios = true;
    os.ipad = true;
    os.version = ipad[2].replace(/_/g, ".");
  }
  if (kindle) {
    os.kindle = true;
    os.version = kindle[1];
  }
  if (windows) {
    os.windows = true;
    if (ua.search(/[win|x|wow]64/i) === -1) os.winCpu = "32";
    else os.winCpu = "64";
    const userAgent = ua.toLowerCase();
    if (
      userAgent.indexOf("windows nt 5.0") > -1 ||
      userAgent.indexOf("Windows 2000") > -1
    ) {
      os.winVersion = "Windows 2000";
    } else if (
      userAgent.indexOf("windows nt 5.1") > -1 ||
      userAgent.indexOf("Windows XP") > -1
    ) {
      os.winVersion = "Windows XP";
    } else if (
      userAgent.indexOf("windows nt 5.2") > -1 ||
      userAgent.indexOf("Windows 2003") > -1
    ) {
      os.winVersion = "Windows 2003";
    } else if (
      userAgent.indexOf("windows nt 6.0") > -1 ||
      userAgent.indexOf("Windows Vista") > -1
    ) {
      os.winVersion = "Windows Vista";
    } else if (
      userAgent.indexOf("windows nt 6.1") > -1 ||
      userAgent.indexOf("windows 7") > -1
    ) {
      os.winVersion = "Windows 7";
    } else if (
      userAgent.indexOf("windows nt 6.2") > -1 ||
      userAgent.indexOf("windows 8") > -1
    ) {
      os.winVersion = "Windows 8";
    } else if (userAgent.indexOf("windows nt 6.3") > -1) {
      os.winVersion = "Windows 8.1";
    } else if (
      userAgent.indexOf("windows nt 6.4") > -1 ||
      userAgent.indexOf("windows nt 10") > -1
    ) {
      os.winVersion = "Windows 10";
    } else {
      os.winVersion = "Unknown";
    }
  }
  if (ssz) {
    browser.ssz = true;
    if (android) {
      // 安卓 app 版本号 1.5.1
      browser.appVersion = ua.match(/([^/]*) SszVersionCode/)[1];
    } else {
      // ios app 版本号 1.5.1
      browser.appVersion = ua.match(/([^/]*) AppDevice/)[1];
    }
  }
  if (mac) {
    os.mac = true;
  }
  if (silk) {
    browser.silk = true;
    browser.version = silk[1];
  }
  if (!silk && os.android && ua.match(/Kindle Fire/)) {
    browser.silk = true;
  }
  if (uc) {
    browser.uc = true;
    const ucstr = ua.substring(
      ua.indexOf("UC"),
      ua.length
    );
    let uclen = ucstr.indexOf(" ");
    uclen = uclen > -1 ? uclen : ucstr.length;
    browser.version = ucstr.substring(ucstr.indexOf("/") + 1, uclen);
  }
  if (wechat) {
    browser.wechat = true;
  }
  if (qq) {
    browser.qq = true;
  }
  if (ie) {
    browser.ie = true;
    browser.version = +ie[1];
  }
  if (electron) {
    browser.electron = true;
  }
  if (wechat && !/Mobile/i.test(ua) && !android) {
    browser.pcwechat = true;
  }
  if (
    !android &&
    !ipad &&
    !iphone &&
    !kindle &&
    !silk &&
    !(wechat && !browser.pcwechat) &&
    !uc &&
    !meizu &&
    !wxIosNativeApp
  ) {
    browser.desktop = true;
  }

  if (browser.desktop) {
    if (hasEdgeWord) {
      browser.edgePc = true;
    }
    if (hasFirefoxWord) {
      browser.firefoxPc = true;
    }
    if (hasChromeWord) {
      if (!hasEdgeWord && !hasFirefoxWord) {
        browser.chromePc = true;
      }
    }
    if (hasSafariWord) {
      if (!hasChromeWord && !hasEdgeWord && !hasFirefoxWord) {
        browser.safariPc = true;
      }
    }
  }

  const scaleRate = (() => {
    const dpr = window.dpr || 1;
    if (os.iphone) {
      return dpr;
    } else if (os.android) {
      if (browser.uc) {
        return 1;
      }
      return dpr;
    }
    return 1;
  })();

  return {
    os,
    browser,
    scaleRate,
  };
}

export default detect;
