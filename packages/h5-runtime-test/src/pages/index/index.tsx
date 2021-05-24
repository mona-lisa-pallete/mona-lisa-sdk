import React, { useContext, useRef } from "react";
import * as UI from "@davinci/components";
import * as core from "@davinci/core";

import { Button, View } from "@tarojs/components";

const rawAction = {
  /* 打开新页面-bb */ bca84122a2a498e30300bce50b2ca490: [
    {
      fn: async function (args) {
        const { dispatch } = args;
        console.log(args);
        // const res = await core.login(props.url, props.type);
        // console.log("async res: ", res);
        dispatch({ [args.props.modalId]: { isOpen: true } });
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
function initAction(dispatch: any): { [key: string]: any } {
  return Object.keys(rawAction).reduce((res, id) => {
    const curActions = rawAction[id];
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
  const context = useContext(core.AppContext) as any;
  const { state, dispatch } = context;
  const actionWrapRef = useRef<{ [key: string]: any }>();
  if (!actionWrapRef.current) {
    actionWrapRef.current = initAction(dispatch);
  }
  const action = actionWrapRef.current;
  return (
    <UI.DavinciPage>
      <UI.DavinciDiv>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </UI.DavinciDiv>
      <Button onClick={action["id1_id2"]}>
        bca84122a2a498e30300bce50b2ca490
      </Button>
      <Button onClick={action["ccccccccc"]}>ccccccccc</Button>
      <Foo onClick={action["b"]}>bbbbbbbbbbb</Foo>
      <UI.DavinciImage
        id="id_1"
        onClick={action["bca84122a2a498e30300bce50b2ca490"]}
        contentProp={{
          src: "https://static.guorou.net/upload_collection/202125/3d6dbc359b7181614943756062.png",
        }}
      ></UI.DavinciImage>
      <UI.DavinciModal id="id_1">hello from parent</UI.DavinciModal>
    </UI.DavinciPage>
  );
};
