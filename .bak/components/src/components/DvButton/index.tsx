import React from "react";
import Taro from "@tarojs/taro";
import { Button } from "@tarojs/components";

const index = (props) => {
  const { children } = props || {};
  return (
    <Button
      onClick={() =>
        Taro.showToast({
          title: "test",
        })
      }
    >
      {children}
    </Button>
  );
};

export default index;
