import { SDKUtils } from ".";

function isNumber(n: any): n is Number {
  return !isNaN(parseFloat(n)) && !isNaN(n);
}

export function dvPxTransform(size?: string | number) {
  // 为了适配低版本 pxTransform，添加第二参数
  // 为了适配B端图片使用，这里乘以2
  return isNumber(size) ? SDKUtils.pxTransform(size * 2, 750) : size;
}
