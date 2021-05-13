import React from "react";

const index = (props) => {
  return (
    <div>
      <h1>这是 Div 组件</h1>
      {props && props.children}
    </div>
  );
};

export default index;
