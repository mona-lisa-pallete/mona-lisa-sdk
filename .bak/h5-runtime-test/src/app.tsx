import React from "react";
import { DvProvider } from "@monalisa-lowcode/core";
import "./app.less";

const App = (props) => {
  return <DvProvider>{props.children}</DvProvider>;
};

export default App;
