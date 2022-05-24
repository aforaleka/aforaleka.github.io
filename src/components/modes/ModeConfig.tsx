export const ModeOptions = {
    trippy: 'trippy',
    zen: 'zen'
}

export type ModeOption = keyof typeof ModeOptions

export const DEFAULT_MODE = ModeOptions.trippy as ModeOption

export type BlobConfig = { brightness: number, minBeta: number, maxBeta: number }

export type ModeConfig = {
    icon: string,
    blob: BlobConfig,
    canvasGl: Object,
}

export const ModeMapping: { [key in ModeOption]: ModeConfig } = {
    trippy: {
        icon: '🍄',
        canvasGl: {
            powerPreference: "high-performance",
            antialias: false,
            stencil: false,
            depth: false
        },
        blob: {
            brightness: 0.6,
            minBeta: 0.8,
            maxBeta: 20.,
        },
    },
    zen: {
        icon: '🍃',
        canvasGl: {
            antialias: true,
            alpha: true,
            depth: true,
            stencil: true,
        },
        blob: {
            brightness: 0.4,
            minBeta: 0.,
            maxBeta: 4.,
        },
    },
}