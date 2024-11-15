import React from "react";

import Frame from "../Frame";

const JamesTurrellFrame = () => (
  <Frame
    tagName="Turrell"
    w={300}
    h={150}
    className="animate-[jamesTurrell_90s_infinite] flex-center min-w-[100px] min-h-[40px]"
  >
    <div className="animate-[jamesTurrell_45s_infinite] rounded-3xl blur-xl w-2/3 h-1/3" />
  </Frame>
);

export default JamesTurrellFrame;
