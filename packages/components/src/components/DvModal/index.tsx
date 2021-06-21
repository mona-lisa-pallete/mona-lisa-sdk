import React, { useContext, useMemo } from "react";
import { Button, View } from "@tarojs/components";
import { AppContext } from "@gr-davinci/core";

const Modal = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const { children, id } = props || {};
  const { isOpen } = state[id] || {};

  return useMemo(
    () =>
      !isOpen ? null : (
        <View>
          {+new Date()}
          <Button
            onClick={() => {
              dispatch({
                [id]: {
                  isOpen: false,
                },
              });
            }}
          >
            关闭
          </Button>
          {children}
        </View>
      ),
    [isOpen]
  );
};

export default React.memo(Modal);
