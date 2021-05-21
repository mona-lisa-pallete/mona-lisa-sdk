import React from "react";
import * as UI from "@davinci/components";
import * as core from "@davinci/core";

const action = {
  /* 打开新页面-bb */ bca84122a2a498e30300bce50b2ca490: {
    fn: async function(props) {
      const res = await core.login(props.url, props.type);
      console.log("async res: ", res);
    },
    prop: { url: "path/a", type: "h5" }
  }
};

export default () => {
  return (
    <UI.DavinciPage
      contentProp={{
        style: { height: "300px", width: "100%", background: "lightblue" }
      }}
    >
      <UI.DavinciImage
        onClick={() => {
          action["bca84122a2a498e30300bce50b2ca490"].fn(
            action["bca84122a2a498e30300bce50b2ca490"].prop
          );
        }}
        contentProp={{
          style: { position: "absolute", left: "20px", top: "30px" },
          src:
            "https://static.guorou.net/upload_collection/202125/3d6dbc359b7181614943756062.png"
        }}
      ></UI.DavinciImage>
    </UI.DavinciPage>
  );
};
