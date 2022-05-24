import React from 'react';
import * as THREE from 'three'

import { useFrame } from '@react-three/fiber';

import PlasmaCanvas from './PlasmaCanvas';
import Mouse from '../../utils/Mouse';
import { fragmentShader, vertexShader } from '../../glsl/shader';
import { BlobConfig } from '../modes/ModeConfig';


const Blob = ({ blobConfig }: { blobConfig: BlobConfig }) => {
    const {brightness, minBeta, maxBeta} = blobConfig
    const meshRef = React.useRef<THREE.Mesh>(null!)
    const shaderRef = React.useRef<THREE.ShaderMaterial>(null!)
    const plasmaCanvas = new PlasmaCanvas()
    const trackedMouse = new Mouse()

    plasmaCanvas.draw()

    const shader: THREE.Shader = {
        uniforms: {
            uTime: { value: 0 },
            uMouse: { value: 0 },
            uTexture: { value: plasmaCanvas.texture },
            uBrightness: { value: brightness }
        },
        vertexShader,
        fragmentShader,
    }

    let meshP = new THREE.Vector3(0, 0, -50)
    let meshV = new THREE.Vector3()
    let beta = 4.

    useFrame(({ camera, clock, mouse }) => {
        const time = clock.getElapsedTime()
        shaderRef.current.uniforms.uTexture.value.needsUpdate = true
        plasmaCanvas.update(time)

        // animate sphere towards camera
        meshV.subVectors(new THREE.Vector3(), meshP).multiplyScalar(0.05)
        meshP.add(meshV)
        meshRef.current.position.copy(meshP)
        meshRef.current.rotation.y = - Math.PI * 2

        beta -= (beta - trackedMouse.speed) * 0.006
        trackedMouse.speed *= .98

        shaderRef.current.uniforms.uTime.value = time
        shaderRef.current.uniforms.uMouse.value = Math.min(Math.max(beta, minBeta), maxBeta)

        const target = new THREE.Vector3()
        target.x += (mouse.x - target.x)
        target.y += (mouse.y - target.y)
        target.z = camera.position.z
        meshRef.current.lookAt(target)
    })

    return (
        <mesh visible position={meshP} ref={meshRef}>
            <sphereGeometry attach="geometry" args={[window.innerWidth <= 768 ? 1 : 2, 720, 720]} />
            <shaderMaterial attach="material" ref={shaderRef} args={[shader]} side={THREE.FrontSide} wireframe />
        </mesh>
    )
}

export default Blob