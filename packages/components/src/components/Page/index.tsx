import React from "react";
// import { View } from "@tarojs/components";

const index = (props) => {
  console.log("props: ", props);
  return (
    <div>
      <h1>这是 Page 组件</h1>
      {props && props.children}
    </div>
  );
};

export default index;
