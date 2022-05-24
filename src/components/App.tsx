import React from 'react';

import styled from 'styled-components'

import { CameraShake, OrbitControls, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber';
import { EffectComposer, ChromaticAberration } from '@react-three/postprocessing'

import { ModeContext } from '..';
import Blob from './blob/Blob';
import StatsPanel from './StatsPanel';
import { ModeMapping, ModeOption, ModeOptions } from './modes/ModeConfig';


const App: React.VFC = () => {
	const mode = React.useContext(ModeContext) as ModeOption;

	return (
		<FullScreen>
			{mode === ModeOptions.trippy ? <TripModeCanvas /> : <ZenModeCanvas />}
		</FullScreen>
	)
}

const TripModeCanvas = () => {
	const orbitControlsRef = React.useRef(null!)
	const modeConfig = ModeMapping[ModeOptions.trippy as ModeOption]
	return (
		<Canvas
			dpr={Math.min(window.devicePixelRatio, 2)}
			camera={{ position: [0, 0, 8], fov: 50, near: 0.01, far: 50 }}
			gl={modeConfig.canvasGl}>
			<React.Suspense fallback={null}>
				<Blob blobConfig={modeConfig.blob} />
				<Stars radius={1} depth={8} count={880} factor={1} fade />
				<EffectComposer>
					<ChromaticAberration />
				</EffectComposer>
			</React.Suspense>
			<OrbitControls
				ref={orbitControlsRef}
				minDistance={4}
				maxDistance={12}
				minAzimuthAngle={- Math.PI * 0.1}
				maxAzimuthAngle={Math.PI * 0.1}
				minPolarAngle={Math.PI * 0.48}
				maxPolarAngle={Math.PI * 0.52}
				enableDamping
			/>
			<CameraShake maxYaw={0.05} maxPitch={0.05} maxRoll={0.1} controls={orbitControlsRef} />
			<StatsPanel />
		</Canvas>)
}

const ZenModeCanvas = () => {
	const modeConfig = ModeMapping[ModeOptions.zen as ModeOption]
	return (
		<Canvas
			dpr={Math.min(window.devicePixelRatio, 2)}
			camera={{ position: [0, 0, 8], fov: 50, near: 0.01, far: 50 }}
			gl={modeConfig.canvasGl}>
			<React.Suspense fallback={null}>
				<Blob blobConfig={modeConfig.blob} />
			</React.Suspense>
			<OrbitControls
				minDistance={4}
				maxDistance={12}
				minAzimuthAngle={- Math.PI * 0.1}
				maxAzimuthAngle={Math.PI * 0.1}
				minPolarAngle={Math.PI * 0.48}
				maxPolarAngle={Math.PI * 0.52}
				enableDamping
			/>
			<StatsPanel />
		</Canvas>
	)
}

const FullScreen = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	outline: none;
	width: 100%;
	height: 100%;
`

export default App