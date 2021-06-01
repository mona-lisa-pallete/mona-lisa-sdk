import React from "react";
import * as UI from "@davinci/components";

export default () => {
  const liveUrl = "https://view.officeapps.live.com/op/view.aspx?src=";
  return (
    <UI.DvPage>
      <UI.DvDocViewer
        list={[
          {
            name: "四年级英语深度课程EXCEL",
            src: `${liveUrl}https%3A%2F%2Fstatic-zy-com.oss-cn-hangzhou.aliyuncs.com%2Fgrow%2Fgrow_mp%2Ftemp%2Fwps.xls`,
          },
          {
            name: "四年级英语深度课程PDF",
            src: `https://static-zy-com.oss-cn-hangzhou.aliyuncs.com/grow/grow_mp/temp/wps.pdf`,
          },
          {
            name: "四年级英语深度课程PPT",
            src: `${liveUrl}https%3A%2F%2Fstatic-zy-com.oss-cn-hangzhou.aliyuncs.com%2Fgrow%2Fgrow_mp%2Ftemp%2Fwps.ppt`,
          },
          {
            name: "四年级英语深度课程WORD",
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
    </UI.DvPage>
  );
};
