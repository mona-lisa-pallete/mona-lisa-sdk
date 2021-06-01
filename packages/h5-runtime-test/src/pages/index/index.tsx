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
  const [UI, isReady] = core.useWidget([]);
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
      <UI.DavinciPage
        id="28"
        onClick={action["bb_cc"]}
        {...{ style: { position: "relative" } }}
      >
        <UI.DavinciImage
          id="1"
          onLoad={action["cc"]}
          onClick={action["bca84122a2a498e30300bce50b2ca490"]}
          {...{
            src: "https://static.guorou.net/upload_collection/202125/3d6dbc359b7181614943756062.png",
          }}
        ></UI.DavinciImage>
        <UI.DavinciDiv
          id="102"
          {...{ style: { height: "800px", border: "1px solid" } }}
        ></UI.DavinciDiv>
      </UI.DavinciPage>{" "}
      <React.Fragment>
        {" "}
        {/* fixed content */}{" "}
        <UI.DavinciDiv id="29" {...{ style: { position: "fixed", bottom: 0 } }}>
          <UI.DavinciImage
            id="21"
            {...{
              style: { width: "100px", height: "100px" },
              src: "https://static.guorou.net/upload_collection/202125/3d6dbc359b7181614943756062.png",
            }}
          ></UI.DavinciImage>
          <UI.DavinciImage
            id="23"
            {...{
              style: { width: "100px", height: "100px" },
              src: "https://static.guorou.net/upload_collection/202125/3d6dbc359b7181614943756062.png",
            }}
          ></UI.DavinciImage>
        </UI.DavinciDiv>
        <UI.DavinciImage
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
        ></UI.DavinciImage>{" "}
      </React.Fragment>{" "}
    </React.Fragment>
  );
};
