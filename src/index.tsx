import React from 'react';

import './index.css';
import { render } from 'react-dom'

import App from './components/App';
import Content from './components/Content'
import TripModeToggle, { LOCAL_STORAGE_MODE_KEY } from './components/modes/TripModeToggle';
import { DEFAULT_MODE, ModeOption, ModeOptions } from './components/modes/ModeConfig';

const getSavedMode = () => {
	const savedItem = localStorage.getItem(LOCAL_STORAGE_MODE_KEY)
	if (!savedItem) return null
	return Object.keys(ModeOptions).includes(savedItem) ? savedItem as ModeOption : null
}

const startingMode = getSavedMode() || DEFAULT_MODE

export const ModeContext = React.createContext(startingMode)

const Wrapped: React.VFC = () => {
	const [mode, setMode] = React.useState(startingMode)
	return (
		<>
			<TripModeToggle mode={mode} setMode={setMode} />
			<ModeContext.Provider value={mode}>
				<Content />
				<App />
			</ModeContext.Provider>
		</>
	)
}

render(
	<Wrapped />,
	document.getElementById('root')
)