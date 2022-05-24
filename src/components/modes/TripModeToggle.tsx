import styled from "styled-components"

import { ModeMapping, ModeOption, ModeOptions } from "./ModeConfig"


export const LOCAL_STORAGE_MODE_KEY = 'mode'


type TripModeToggleProps = {
    mode: ModeOption
    setMode: (mode: ModeOption) => void
}

const TripModeToggle = ({ mode, setMode }: TripModeToggleProps) => {
    const onToggle = () => {
        const newMode = mode === ModeOptions.trippy ? ModeOptions.zen : ModeOptions.trippy
        localStorage.setItem(LOCAL_STORAGE_MODE_KEY, newMode)
        setMode(newMode as ModeOption)
    }
    return (
        <Toggle onClick={onToggle}>{ModeMapping[mode].icon} mode</Toggle>
    )
}

const Toggle = styled.span`
    cursor: pointer;
	position: fixed;
	top: 0;
	right: 0;
    padding: 1em;
	z-index: 2;
`

export default TripModeToggle