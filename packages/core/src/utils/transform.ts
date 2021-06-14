import { pxTransform } from "@tarojs/taro";

function isNumber(n: any): n is Number {
  return !isNaN(parseFloat(n)) && !isNaN(n);
}

export function dvPxTransform(size?: string | number) {
  return isNumber(size) ? pxTransform(size) : size;
}
