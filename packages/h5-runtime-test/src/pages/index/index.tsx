import React from "react";
import { DavinciImage, DavinciPage } from "@davinci/components";

export default () => {
  return (
    <DavinciPage>
      <DavinciImage
        src={
          "https://img.alicdn.com/tfs/TB1lle4yQzoK1RjSZFlXXai4VXa-200-64.png"
        }
        style={{ width: 400, height: 100 }}
      ></DavinciImage>
    </DavinciPage>
  );
};
