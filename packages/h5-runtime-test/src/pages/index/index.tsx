import React, { useContext, useRef } from "react";
import * as core from "@davinci/core";
const rawAction = {
  /* 打开新页面-openPage */ cc: {
    fn: () => {},
    prop: { url: "path/a", type: "h5" },
  },
  /* 登录页面test-login */ bb: {
    fn: async function (props) {
      const res = await core.login(props.phone, props.password);
      console.log("async res: ", res);
    },
    prop: { phone: "${store.user.phone}", password: "${store.user.password}" },
  },
  /* 登录-login */ bca84122a2a498e30300bce50b2ca490: {
    fn: async function (props) {
      const res = await core.login(props.phone, props.password);
      console.log("async res: ", res);
    },
    prop: { phone: "${store.user.phone}", password: "${store.user.password}" },
  },
};
/**       * 避免因运行时的动态函数组件导致'事件'每次变化，这里使用 dsl 编译时确定 function       */ const finalAction =
  {
    bb_cc: [rawAction["bb"], rawAction["cc"]],
    cc: [rawAction["cc"]],
    bca84122a2a498e30300bce50b2ca490: [
      rawAction["bca84122a2a498e30300bce50b2ca490"],
    ],
  };
/**       * 构建真正的action 字段       */ function initAction(dispatch: any): {
  [key: string]: any;
} {
  return Object.keys(finalAction).reduce((res, id) => {
    const curActions = finalAction[id];
    res[id] = (e) => {
      curActions.forEach((_action) => {
        const { fn, prop } = _action;
        fn({ id, e, props: prop, dispatch });
      });
    };
    return res;
  }, {});
}
export default () => {
  const [UI, isReady] = core.useWidget([
    "https://static.guorou.net/davinci/component/DvImage/1622446363668/index.js",
    "https://static.guorou.net/davinci/component/DvDiv/1622446464812/index.js",
    "https://static.guorou.net/davinci/component/DvPage/1622446449933/index.js",
    "https://static.guorou.net/davinci/component/DvDocViewer/1622528317317/index.js",
    "https://static.guorou.net/davinci/component/DvVideoViewer/1622529288052/index.js",
  ]);
  const context = useContext(core.AppContext) as any;
  const { state, dispatch } = context;
  const actionWrapRef = useRef<{ [key: string]: any }>();
  if (!actionWrapRef.current) {
    actionWrapRef.current = initAction(dispatch);
  }
  const action = actionWrapRef.current;
  if (!isReady) {
    return "加载中..";
  }
  return (
    <React.Fragment>
      {" "}
      <UI.DvPage
        id="28"
        onClick={action["bb_cc"]}
        {...{ style: { position: "relative" } }}
      >
        <UI.DvImage
          id="1"
          onLoad={action["cc"]}
          onClick={action["bca84122a2a498e30300bce50b2ca490"]}
          {...{
            src: "https://static.guorou.net/upload_collection/202125/3d6dbc359b7181614943756062.png",
          }}
        ></UI.DvImage>
        <UI.DvDocViewer
          id="31"
          {...{
            style: { height: "50%", width: "50%" },
            list: [
              {
                name: "四年级英语深度课程EXCEL",
                src: "https://static.guorou.net/davinci/test_doc/wps.xls",
              },
              {
                name: "四年级英语深度课程PDF",
                src: "https://static.guorou.net/davinci/test_doc/wps.pdf",
              },
              {
                name: "四年级英语深度课程PPT",
                src: "https://static.guorou.net/davinci/test_doc/wps.ppt",
              },
              {
                name: "四年级英语深度课程WORD",
                src: "https://static.guorou.net/davinci/test_doc/wps.doc",
              },
            ],
          }}
        ></UI.DvDocViewer>
        <UI.DvVideoViewer
          id="1"
          {...{
            src: "https://static.guorou.net/grow/grow_mp/video.mp4",
            style: { height: "320px" },
          }}
        ></UI.DvVideoViewer>
        <UI.DvDiv
          id="102"
          {...{ style: { height: "800px", border: "1px solid" } }}
        ></UI.DvDiv>
      </UI.DvPage>{" "}
      <React.Fragment>
        {" "}
        {/* fixed content */}{" "}
        <UI.DvDiv id="29" {...{ style: { bottom: 0, position: "fixed" } }}>
          <UI.DvImage
            id="21"
            {...{
              style: { width: "100px", height: "100px" },
              src: "https://static.guorou.net/upload_collection/202125/3d6dbc359b7181614943756062.png",
            }}
          ></UI.DvImage>
          <UI.DvImage
            id="23"
            {...{
              style: { width: "100px", height: "100px" },
              src: "https://static.guorou.net/upload_collection/202125/3d6dbc359b7181614943756062.png",
            }}
          ></UI.DvImage>
        </UI.DvDiv>
        <UI.DvImage
          id="22"
          {...{
            style: {
              position: "fixed",
              top: 0,
              right: 0,
              width: "100px",
              height: "100px",
            },
            src: "https://static.guorou.net/upload_collection/202125/3d6dbc359b7181614943756062.png",
          }}
        ></UI.DvImage>{" "}
      </React.Fragment>{" "}
    </React.Fragment>
  );
};
