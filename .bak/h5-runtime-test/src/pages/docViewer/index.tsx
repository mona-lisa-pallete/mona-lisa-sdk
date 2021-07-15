import React from "react";
import * as UI from "@monalisa-lowcode/components";

export default () => {
  return (
    <UI.DvPage>
      <UI.DvDocViewer
        list={[
          {
            name: "四年级英语深度课程EXCEL",
            src: `https://static.guorou.net/davinci/test_doc/wps.xls`,
          },
          {
            name: "四年级英语深度课程PDF",
            src: `https://static.guorou.net/davinci/test_doc/wps.pdf`,
          },
          {
            name: "四年级英语深度课程PPT",
            src: `https://static.guorou.net/davinci/test_doc/wps.ppt`,
          },
          {
            name: "四年级英语深度课程WORD",
            src: `https://static.guorou.net/davinci/test_doc/wps.doc`,
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
