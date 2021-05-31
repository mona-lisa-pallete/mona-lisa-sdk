import React, { useContext, useRef } from "react";
import * as core from "@davinci/core";

import { Button, View } from "@tarojs/components";

const rawAction = {
  /* 打开新页面-bb */ bca84122a2a498e30300bce50b2ca490: [
    {
      fn: async function (args) {
        const { dispatch } = args;
        console.log(args);
        const { modalId } = args.props;
        const { [modalId]: curState } = args.stateRef.current;
        dispatch({
          [modalId]: {
            isOpen: curState ? !curState.isOpen : true,
          },
        });
      },
      prop: { modalId: "id_1", url: "path/a", type: "h5" },
    },
  ],
  /* 打开新页面-bb */ b: [
    {
      fn: async function (args) {
        const { dispatch, props } = args;
        dispatch({ [props.modalId]: { isOpen: false } });

        const res = await core.login(props.url, props.type);
        console.log("async res: ", res);
      },
      prop: { modalId: "id_1", url: "path/a", type: "h5" },
    },
  ],

  id1_id2: [
    {
      fn: async function (args) {
        console.log("1", args);
      },
      prop: { url: "path/a", type: "h5" },
    },
    {
      fn: async function (args) {
        console.log("2", args);
      },
      prop: { url: "path/a", type: "h5" },
    },
  ],
};

const Foo = React.memo((props: any) => {
  return <View onClick={props.onClick}>{+new Date()}</View>;
});

/**
 * 构建真正的action 字段
 */
function initAction(dispatch: any, stateRef: any): { [key: string]: any } {
  return Object.keys(rawAction).reduce((res, id) => {
    const curActions = rawAction[id];
    res[id] = (e) => {
      curActions.forEach((_action) => {
        const { fn, prop } = _action;
        fn({ id, e, props: prop, dispatch, stateRef });
      });
    };
    return res;
  }, {});
}

export default () => {
  const [UI_DLL, isReady] = core.useWidget([
    "https://static.guorou.net/davinci/component/DvImage/1622445939737/index.js",
    "https://static.guorou.net/davinci/component/DvDiv/1622446464812/index.js",
    "https://static.guorou.net/davinci/component/DvPage/1622446449933/index.js",
    "https://static.guorou.net/davinci/component/DvModal/1622446479830/index.js",
    "https://static.guorou.net/davinci/component/DvDocViewer/1622446494246/index.js",
  ]);
  const context = useContext(core.AppContext) as any;
  const { state, dispatch } = context;
  const actionWrapRef = useRef<{ [key: string]: any }>();
  const stateRef = useRef<{ [key: string]: any }>();
  if (!isReady) {
    return "加载中..";
  }
  stateRef.current = state;
  if (!actionWrapRef.current) {
    actionWrapRef.current = initAction(dispatch, stateRef);
  }
  const action = actionWrapRef.current;
  return (
    <UI_DLL.DvPage>
      <UI_DLL.DvDocViewer
        list={[
          {
            src: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fstatic.guorou.net%2Ftiku%2F2021%E5%AF%926%E5%B9%B4%E7%BA%A7%E6%95%B0%E5%AD%A6%E7%B2%BE%E8%8B%B1%E7%8F%AD%E8%AE%B2%E4%B9%89-%E7%AC%AC1%E8%AE%B2-%E5%88%86%E6%95%B0%E8%AE%A1%E7%AE%97%E7%BB%BC%E5%90%88.docx",
            name: "docx",
          },
        ]}
        {...{
          style: {
            height: "50%",
            width: "50%",
          },
        }}
      />
      <UI_DLL.DvDiv>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </UI_DLL.DvDiv>
      <Button onClick={action["id1_id2"]}>
        bca84122a2a498e30300bce50b2ca490
      </Button>
      <Button onClick={action["ccccccccc"]}>ccccccccc</Button>
      <Foo onClick={action["b"]}>bbbbbbbbbbb</Foo>
      <UI_DLL.DvImage
        id="id_0"
        onClick={action["bca84122a2a498e30300bce50b2ca490"]}
        {...{
          src: "https://static.guorou.net/upload_collection/202125/3d6dbc359b7181614943756062.png",
        }}
      ></UI_DLL.DvImage>
      <UI_DLL.DvImage
        id="id_1"
        onClick={action["bca84122a2a498e30300bce50b2ca490"]}
        {...{
          src: "https://static.guorou.net/upload_collection/202125/3d6dbc359b7181614943756062.png",
        }}
      ></UI_DLL.DvImage>
      <UI_DLL.DvModal id="id_1">hello from parent</UI_DLL.DvModal>
    </UI_DLL.DvPage>
  );
};
