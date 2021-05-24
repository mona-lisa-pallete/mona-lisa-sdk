import React, { FC, ReactElement, useContext, useMemo } from "react";
import { Image, View } from "@tarojs/components";
import { AppContext } from "@davinci/core";

/**
 * 结合 useMemo，避免因使用 useContext 后的不必要 re-render
 */
function withContext(Components: FC, selector: any) {
  return (props: any): ReactElement => {
    const { state, dispatch } = useContext(AppContext);
    const deps = selector(state)(props);
    return useMemo(
      () => <Components dispatch={dispatch} {...props} {...deps} />,
      [...Object.values(deps), ...Object.values(props)]
    );
  };
}
const index = (props) => {
  const { id, dispatch, ...p } = props;

  return (
    <View>
      <Image
        {...p}
        onClick={() => {
          dispatch({
            [id]: {
              time: +new Date(),
            },
          });
        }}
      />
    </View>
  );
};

export default withContext(index, (state) => (props) => {
  const { id } = props;
  return { foo: (state && state[id] && state[id].foo) || "foo" };
});
