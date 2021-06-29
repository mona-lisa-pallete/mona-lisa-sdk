import React from "react";
import * as UI from "@gr-davinci/components";
import { Button } from "@tarojs/components";

export default () => {
  return (
    <UI.DvPage>
      <Button>按钮1</Button>
      <UI.DvVideoViewer
        src="https://static.guorou.net/grow/grow_mp/video.mp4"
        style={{
          height: "320px",
        }}
      />
      <Button>按钮2</Button>
    </UI.DvPage>
  );
};
