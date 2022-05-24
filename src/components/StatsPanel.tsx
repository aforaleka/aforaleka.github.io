import React from "react"

import { useFrame } from "@react-three/fiber"
import Stats from "stats.js"


const StatsPanel: React.FC = () => {
    const showPanel = window.location.hash === "#debug"
    
    const stats = React.useMemo(() => {
        let stats = new Stats()
        if (showPanel) {
            stats.showPanel(0)
            document.body.appendChild(stats.dom)
        }
        return stats
    }, [showPanel])

    useFrame(() => {
        stats.update()
    })

    return null
}

export default StatsPanel