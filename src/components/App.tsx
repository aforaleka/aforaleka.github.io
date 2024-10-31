import React from "react";

import styled from "styled-components";

import { OrbitControls} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Blob from "./blob/Blob";
import StatsPanel from "./StatsPanel"

const App: React.VFC = () => {
  return (
    <Container>
      <BlobCanvas />
      <Glow />
    </Container>
  );
};

const BlobCanvas = () => {
  const orbitControlsRef = React.useRef(null!);
  return (
    <Canvas
      dpr={Math.min(window.devicePixelRatio, 2)}
      camera={{ position: [0, 0, 8], fov: 50, near: 0.01, far: 50 }}
      gl={{ antialias: true, alpha: true, depth: true, stencil: true }}
    >
      <React.Suspense fallback={null}>
        <Blob />
      </React.Suspense>
      <OrbitControls
        ref={orbitControlsRef}
        minDistance={4}
        maxDistance={12}
        enableDamping
      />
      <StatsPanel />
    </Canvas>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  outline: none;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  animation: animatedJamesTurrell 30s infinite;
`;

const Glow = styled.div`
  position: absolute;
  pointer-events: none;
  border-radius: 10vw;
  -webkit-filter: blur(100px);
  -moz-filter: blur(100px);
  -o-filter: blur(100px);
  -ms-filter: blur(100px);
  filter: blur(100px);
  width: 60vw;
  height: 60vh;

  animation: animatedJamesTurrell 15s infinite;

  @keyframes animatedJamesTurrell {
    0% {
      background: #ff817b;
    }
    12% {
      background: #c1ae00;
    }
    24% {
      background: #f64793;
    }
    36% {
      background: #a166ab;
    }
    48% {
      background: #767cee;
    }
    60% {
      background: #4ca4db;
    }
    72% {
      background: #0ce4db;
    }
    84% {
      background: #6e8301;
    }
    96% {
      background: #d17327;
    }
    100% {
      background: #ff817b;
    }
  }
`;

export default App;
