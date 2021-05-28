import React from "react";
import * as UI from "@davinci/components";

export default () => {
  const liveUrl = "https://view.officeapps.live.com/op/view.aspx?src=";
  return (
    <UI.DavinciPage>
      <UI.DavinciDocViewer
        list={[
          {
            name: "xls 文件1",
            src: `${liveUrl}https%3A%2F%2Fstatic-zy-com.oss-cn-hangzhou.aliyuncs.com%2Fgrow%2Fgrow_mp%2Ftemp%2Fwps.xls`,
          },
          {
            name: "pdf 文件1",
            src: `https://static-zy-com.oss-cn-hangzhou.aliyuncs.com/grow/grow_mp/temp/wps.pdf`,
          },
          {
            name: "ppt 文件1",
            src: `${liveUrl}https%3A%2F%2Fstatic-zy-com.oss-cn-hangzhou.aliyuncs.com%2Fgrow%2Fgrow_mp%2Ftemp%2Fwps.ppt`,
          },
          {
            name: "doc 文件1",
            src: `${liveUrl}https%3A%2F%2Fstatic-zy-com.oss-cn-hangzhou.aliyuncs.com%2Fgrow%2Fgrow_mp%2Ftemp%2Fwps.doc`,
          },
        ]}
        {...{
          style: {
            height: "100vh",
            width: "100vw",
          },
        }}
      />
    </UI.DavinciPage>
  );
};
