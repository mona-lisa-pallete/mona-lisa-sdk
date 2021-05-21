import React from "react";
import { Button } from "@tarojs/components";

const index = (props) => {
  const { children } = props || {};
  return <Button>{children}</Button>;
};

export default index;
