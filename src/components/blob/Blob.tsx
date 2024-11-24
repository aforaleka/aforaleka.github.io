import React from "react";
import * as THREE from "three";

import { useFrame } from "@react-three/fiber";

import BlobCanvas from "./BlobCanvas";
import Mouse from "../../utils/Mouse";
import { fragmentShader, vertexShader } from "../../glsl/shader";

const Blob = () => {
  const meshRef = React.useRef<THREE.Mesh>(null!);
  const shaderRef = React.useRef<THREE.ShaderMaterial>(null!);
  const canvas = new BlobCanvas();
  const trackedMouse = new Mouse();

  canvas.draw();

  const shader: THREE.Shader = {
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: 0 },
      uTexture: { value: canvas.texture },
      uBrightness: { value: 0.8 },
    },
    vertexShader,
    fragmentShader,
  };

  let meshP = new THREE.Vector3(0, 0, -50);
  let meshV = new THREE.Vector3();
  let beta = 4;

  useFrame(({ camera, clock, mouse }) => {
    const time = clock.getElapsedTime();

    // animate sphere towards camera
    meshV.subVectors(new THREE.Vector3(), meshP).multiplyScalar(0.05);
    meshP.add(meshV);
    meshRef.current.position.copy(meshP);
    meshRef.current.rotation.y = -Math.PI * 2;

    beta -= (beta - trackedMouse.speed) * 0.006;
    trackedMouse.speed *= 0.98;

    shaderRef.current.uniforms.uTime.value = time;
    shaderRef.current.uniforms.uMouse.value = Math.min(Math.max(beta, 0), 3);

    const target = new THREE.Vector3();
    target.x += mouse.x - target.x;
    target.y += mouse.y - target.y;
    target.z = camera.position.z;
    meshRef.current.lookAt(target);
  });

  return (
    <mesh visible position={meshP} ref={meshRef}>
      <sphereGeometry
        attach="geometry"
        args={[1, 128, 128]}
      />
      <shaderMaterial
        attach="material"
        ref={shaderRef}
        args={[shader]}
        wireframe
      />
    </mesh>
  );
};

export default Blob;
