import React from "react";
import { View } from "@tarojs/components";

const index = (props) => {
  console.log("page props: ", props);
  const { contentProp = {}, children } = props || {};
  return <View {...contentProp}> {children}</View>;
};

export default index;
