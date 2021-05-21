import React from "react";
import { Image } from "@tarojs/components";

const index = (props) => {
  const { contentProp = {}, ...p } = props || {};
  return <Image {...p} {...contentProp} />;
};

export default index;
