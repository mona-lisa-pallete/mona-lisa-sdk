import React, { useReducer } from "react";
import { AppContext } from "@davinci/core";
import "./app.less";

const App = props => {
  const [state, dispatch] = useReducer((state, action) => {
    return { ...state, ...action };
  }, {});

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default App;
