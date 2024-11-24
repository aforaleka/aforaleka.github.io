import React from "react";

import { Canvas } from "@react-three/fiber";

import Blob from "../blob/Blob";
import Frame from "../Frame";

const ZoomedInBlobFrame = () => (
  <Frame
    tagName="perspective_02"
    w={180}
    h={180}
    className="min-w-[100px] min-h-[50px]"
  >
    <BlobCanvas />
  </Frame>
);

const BlobCanvas = () => {
  const memoizedBlob = React.useMemo(() => <Blob />, []);
  return (
    <Canvas
      dpr={2}
      camera={{ position: [0, 0, 2], fov: 20, near: 0.01, far: 20 }}
      gl={{ antialias: true, alpha: true, depth: true, stencil: true }}
    >
      {memoizedBlob}
    </Canvas>
  );
};

export default ZoomedInBlobFrame;
