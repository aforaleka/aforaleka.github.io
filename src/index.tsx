import React from "react";

import { render } from "react-dom";

import "./index.css";
import { Frames } from "./components/FramesLayer";

const Root: React.VFC = () => {
  return (
    <div className="full-screen">
      <Frames />
    </div>
  );
};

render(<Root />, document.getElementById("root"));
