import React from "react";
import { DvProvider } from "@davinci/core";
import "./app.less";

const App = (props) => {
  return <DvProvider>{props.children}</DvProvider>;
};

export default App;
