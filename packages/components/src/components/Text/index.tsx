import React from "react";
import { Text } from "@tarojs/components";
const index = (props) => {
  const { children, ...p } = props || {};
  return <Text {...p}>{children}</Text>;
};

export default index;
