import React, { useContext, useRef, useState } from "react";
// import * as UI from '@davinci/components';
import * as core from "@gr-davinci/core";

const rawAction = {
  /* 打开新页面-toast */ 2: { fn: () => {}, prop: {} },
  /* 打开新页面-openPage */ bca84122a2a498e30300bce50b2ca490: {
    fn: () => {},
    prop: {},
  },
};

/**
 * 避免因运行时的动态函数组件导致'事件'每次变化，这里使用 dsl 编译时确定 function
 */
const finalAction = {
  bca84122a2a498e30300bce50b2ca490: [
    rawAction["bca84122a2a498e30300bce50b2ca490"],
  ],
  2: [rawAction["2"]],
};

/**
 * 构建真正的action 字段
 */
function initAction(dispatch: any): { [key: string]: any } {
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

const loadScript = (elemRef, id, cb) => {
  return new Promise((resolve, reject) => {
    const _id = `__widget_entity_${id}`;
    if (document.querySelector(_id)) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.id = _id;
      script.src = `http://localhost:22111/${elemRef}.js`;
      script.onload = () => {
        resolve();
        cb();
      };
      document.head.appendChild(script);
    }
  });
};

const UIColl = {};
const useWidget = (elementRefs) => {
  const requestQueue = [];
  const [isReady, setIsReady] = useState(false);
  if (Array.isArray(elementRefs) && elementRefs.length > 0) {
    elementRefs.forEach((elemRef) => {
      requestQueue.push(
        loadScript(elemRef, elemRef, () => {
          UIColl[elemRef] = window?.[elemRef]?.default || "div";
        })
      );
    });
  }
  Promise.all(requestQueue).then(() => {
    setIsReady(true);
  });
  return [UIColl, isReady];
};

export default () => {
  const [UI, isReady] = useWidget(["DavinciDiv", "DvImage"]);

  const context = useContext(core.AppContext) as any;
  const { state, dispatch } = context;
  const actionWrapRef = useRef<{ [key: string]: any }>();
  if (!actionWrapRef.current) {
    actionWrapRef.current = initAction(dispatch);
  }
  const action = actionWrapRef.current;

  return isReady ? (
    <React.Fragment>
      <UI.DavinciDiv
        id="undefined"
        {...{ style: { position: "relative", width: "100%", height: "300px" } }}
      >
        <UI.DvImage
          id="2"
          onClick={action["bca84122a2a498e30300bce50b2ca490"]}
          onBlur={action["2"]}
          {...{
            style: {
              position: "absolute",
              left: "20px",
              top: "30px",
              width: "300px",
            },
            url: "https://static.guorou.net/kbase/davinciprovider/assets/rc-upload-1622109525503-2.jpg",
          }}
        ></UI.DvImage>
      </UI.DavinciDiv>
    </React.Fragment>
  ) : (
    "loading"
  );
};
