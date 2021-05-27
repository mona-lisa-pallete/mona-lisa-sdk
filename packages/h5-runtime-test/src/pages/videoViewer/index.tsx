import React from "react";
import * as UI from "@davinci/components";
import { Button } from "@tarojs/components";

export default () => {
  return (
    <UI.DavinciPage>
      <Button>按钮1</Button>
      <UI.DavinciVideoViewer
        src="https://static.guorou.net/grow/grow_mp/video.mp4"
        style={{
          height: "320px",
          position: "relative",
        }}
      />
      <Button>按钮2</Button>
    </UI.DavinciPage>
  );
};
