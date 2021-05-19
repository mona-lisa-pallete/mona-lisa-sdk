import React from "react";
import Taro from "@tarojs/taro";

const index = (props) => {
  return (
    <div>
      <h1>这是 Image 组件</h1>
      <img
        onClick={() => {
          Taro.showToast({
            title: "hello taro toast",
          });
        }}
        style={props.style}
        src={props.src}
      />
    </div>
  );
};

export default index;
