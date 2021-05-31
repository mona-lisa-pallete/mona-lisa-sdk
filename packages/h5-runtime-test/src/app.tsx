import React, { useReducer } from "react";
import { AppContext } from "@davinci/core";
import "./app.less";

const App = (props) => {
  const [state, dispatch] = useReducer((s, action) => {
    return { ...s, ...action };
  }, {});

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default App;
