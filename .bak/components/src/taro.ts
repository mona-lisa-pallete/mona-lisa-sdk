import * as components from "@tarojs/components/dist-h5/react";
import * as taro from "@tarojs/taro/h5";

const pxTransformConfig = {
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
};
taro.initPxTransform(pxTransformConfig);

export { components, taro };

export {
  applyPolyfills,
  defineCustomElements,
} from "@tarojs/components/loader";
