import detect from "./detect";

export const isInClient = detect().browser.ssz;

export function checkApi(apiName) {
  if (typeof window === "undefined") return false;
  if (
    window.ssz &&
    window.ssz[apiName] &&
    typeof window.ssz[apiName] === "function"
  ) {
    return true;
  }
  // console.warn(`Undefined API: ${apiName}`);
  return false;
}

// 获取客户端用户的 access_token
export function getSSZUserAccessToken() {
  if (checkApi("token")) {
    return window.ssz.token();
  }
  return "";
}
