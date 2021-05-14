import React from "react";

const index = (props) => {
  return (
    <div>
      <h1>这是 Image 组件</h1>
      <img style={props.style} src={props.src} />
    </div>
  );
};

export default index;
