import React from "react";
import { Text } from "@tarojs/components";
const index = (props) => {
  const { contentProp = {}, children } = props || {};
  return <Text {...contentProp}>{children}</Text>;
};

export default index;
