import React from "react";

import "./index.css";
import { render } from "react-dom";

import App from "./components/App";
import Content from "./components/Content";

const Wrapped: React.VFC = () => (
  <>
    <Content />
    <App />
  </>
);

render(<Wrapped />, document.getElementById("root"));
