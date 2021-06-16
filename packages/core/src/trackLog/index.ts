import Taro from "@tarojs/taro";
import Storage from "../utils/storage";
import { LOCAL_KEY_OPENID, SESSION_ID, USER_ID } from "../constants";
import { collectUrl } from "../config/api";
import { buildParams, getAppInstancePath } from "../utils/router";

function sendInH5(url: string, params = {}) {
  let image: any = new Image();

  var query: any[] = [];
  for (var k in params) {
    if (params.hasOwnProperty(k)) {
      var v = params[k];
      query.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }

  const requestUrl = url + "?" + Array.prototype.join.call(query, "&");

  const close = function () {
    image.onload = image.onerror = image.onabort = null;
    image = null;
  };
  image.onload =
    image.onerror =
    image.onabort =
      function () {
        close();
      };

  image.src = requestUrl;
}

export const random128Key = () => {
  return [randomKey(), randomKey(), randomKey(), randomKey()].join("");
};
export const randomKey = () => {
  return Math.floor(2147483648 * Math.random()).toString(16);
};

export default function trackLog(
  params: any = { e_n: null },
  queryObj?: any // 避免 getAppInstanceParams 引用循环调用
) {
  // 未登录情况下获取sessionId
  let sessionId =
    Storage.getStorageSync(SESSION_ID) ||
    Storage.getStorageSync(LOCAL_KEY_OPENID); // 避免只写了 openId 而未写 sessionId.
  if (!sessionId) {
    sessionId = random128Key();
    // Taro.setStorage({ key: SESSION_ID, data: sessionId });
    Storage.setStorageSync(SESSION_ID, sessionId);
  }

  const uid = Storage.getStorageSync(USER_ID) || null;
  let e_params = {
    p: "sell_web_grow",
    v: "1.0.0",
    sid: sessionId,
    uid,
    pi: `${Taro.getSystemInfoSync().screenWidth}*${
      Taro.getSystemInfoSync().screenHeight
    }`,
    t: Date.now(),
    pl: 4,
    url: `${getAppInstancePath()}${buildParams({
      ...queryObj,
      ...params,
    })}`,
    ...params,
  };

  let logParams = e_params;
  if (
    logParams.other &&
    Object.prototype.toString.call(logParams.other) === "[object Object]"
  ) {
    logParams = merge(logParams.other, logParams);
    delete logParams.other;
  }

  sendInH5(collectUrl, logParams);

  if (process.env.NODE_ENV === "development") {
    console.groupCollapsed(`%c${logParams.e_n}`, "font-weight: bold;");
    console.log(logParams);
    console.groupEnd();
  }
}

/**
 * 合并两个对象，返回合并后的对象，如果key有重复，第二个对象合并第一个对象的值
 * @param o1
 * @param o2
 * @returns {{}}
 */
function merge(o1, o2) {
  if (!o1) {
    return o2;
  }
  if (!o2) {
    return o1;
  }
  var o3 = {};
  var k, v;
  for (k in o1) {
    if (o1.hasOwnProperty(k)) {
      v = o1[k];
      o3[k] = v;
    }
  }
  for (k in o2) {
    if (o2.hasOwnProperty(k)) {
      v = o2[k];
      o3[k] = v;
    }
  }
  return o3;
}
