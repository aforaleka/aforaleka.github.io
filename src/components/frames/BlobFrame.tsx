import React from "react";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Blob from "../blob/Blob";
import Frame from "../Frame";

const BlobFrame = () => (
  <Frame tagName="perspective_01" w={280} h={180} className="bg-fadedDark min-w-[100px] min-h-[50px]">
    <BlobCanvas />
  </Frame>
);

const BlobCanvas = () => {
  const orbitControlsRef = React.useRef(null!);
  const memoizedBlob = React.useMemo(() => <Blob />, []);
  return (
    <Canvas
      dpr={2}
      camera={{ position: [0, 0, 6], fov: 50, near: 0.01, far: 50 }}
      gl={{ antialias: true, alpha: true, depth: true, stencil: true }}
    >
      {memoizedBlob}
      <OrbitControls
        ref={orbitControlsRef}
        minDistance={2}
        maxDistance={12}
        enablePan={false}
        enableDamping
      />
    </Canvas>
  );
};

export default BlobFrame;
