import * as THREE from "three"

// Lava Lamp Plasma from Slawomir Chodnicki's tutorial
// https://towardsdatascience.com/fun-with-html-canvas-lets-make-lava-lamp-plasma-e4b0d89fe778

export default class PlasmaCanvas {
    public texture

    private _ctx: CanvasRenderingContext2D
    private readonly size: number = 256
    private readonly mapSize: number = 512

    private prevDirection: number = 1
    private dx1: number = 0
    private dy1: number = 0
    private dx2: number = 0
    private dy2: number = 0
    private heightMap1: number[] = []
    private heightMap2: number[] = []
    private palette: THREE.RGB[] = []
    private palettes: THREE.RGB[][] = []
    private image: ImageData

    constructor() {
        const canvas = document.createElement('canvas')
        canvas.width = this.size * 2 // one sided
        canvas.height = this.size

        this._ctx = canvas.getContext('2d')!
        this.texture = new THREE.CanvasTexture(canvas)

        this.palettes = [this._makeRandomPalette(), this._makeRandomPalette()]
        this.image = this._ctx.createImageData(this.size, this.size)

        this._setImageData()
        this._setHeightMap()
    }

    draw = () => {
        this._ctx.putImageData(this.image, 0, 0)
    }

    update = (time: number) => {
        this._ctx.clearRect(0, 0, this.size, this.size)
        this._updateHeightMap(time)
        this._updatePalette(time * 2)
        this._updateImageData()
        this.draw()
    }

    _setImageData() {
        for (let i = 0; i < this.image.data.length; i += 4) {
            this.image.data[i + 0] = 0
            this.image.data[i + 1] = 0
            this.image.data[i + 2] = 0
            this.image.data[i + 3] = 255
        }
    }

    _setHeightMap() {
        for (let x = 0; x < this.mapSize; x++) {
            for (let y = 0; y < this.mapSize; y++) {
                const i = x * this.mapSize + y
                const cx = x - this.mapSize / 2
                const cy = y - this.mapSize / 2
                const d = this._distance(cx, cy)
                const s = (Math.PI * 2) / (this.mapSize / 2)
                const r = Math.sin(d * s)
                const n = (r + 1) / 2

                this.heightMap1[i] = Math.floor(n * 128)
            }
        }

        for (let x = 0; x < this.mapSize; x++) {
            for (let y = 0; y < this.mapSize; y++) {
                const i = x * this.mapSize + y
                const cx = x - this.mapSize / 2
                const cy = y - this.mapSize / 2
                const d1 = this._distance(cx, cy) * 0.1
                const d2 = this._distance(cx, cy) * 0.02
                const s = Math.sin(d1)
                const c = Math.cos(d2)
                const h = s + c
                const n = (h + 2) / 4

                this.heightMap2[i] = Math.floor(n * 127)
            }
        }
    }

    _updateHeightMap(time: number) {
        this.dx1 = Math.floor(
            (((Math.cos(time * 0.5) + 1) / 2) * this.mapSize) / 2
        )
        this.dy1 = Math.floor(
            (((Math.sin(time * 0.2) + 1) / 2) * this.mapSize) / 2
        )
        this.dx2 = Math.floor(
            (((Math.cos(time * 0.3) + 1) / 2) * this.mapSize) / 2
        )
        this.dy2 = Math.floor(
            (((Math.sin(time * 0.4) + 1) / 2) * this.mapSize) / 2
        )
    }

    _updatePalette(time: number) {
        const inter = (Math.cos(time) + 1) / 2
        const direction = Math.sin(time) >= 0 ? -1 : 1

        if (this.prevDirection !== direction) {
            this.prevDirection = direction
            if (direction === -1) {
                this.palettes[0] = this._makeRandomPalette()
            } else {
                this.palettes[1] = this._makeRandomPalette()
            }
        }

        for (let i = 0; i < 256; i++) {
            this.palette[i] = this._interpolate(this.palettes[0][i], this.palettes[1][i], inter)
        }
    }

    _updateImageData() {
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                const i = (x + this.dy1) * this.mapSize + (y + this.dx1)
                const k = (x + this.dy2) * this.mapSize + (y + this.dx2)
                const j = x * this.size * 4 + y * 4
                const h = this.heightMap1[i] + this.heightMap2[k]
                const c = this.palette[h]

                this.image.data[j] = c.r
                this.image.data[j + 1] = c.g
                this.image.data[j + 2] = c.b
            }
        }
    }

    _makeRandomPalette() {
        const c1 = this._randomColor()
        const c2 = this._randomColor()
        const c3 = this._randomColor()
        const c4 = this._randomColor()
        const c5 = this._randomColor()

        return this._makeFiveColorGradient(c1, c2, c3, c4, c5)
    }

    _makeFiveColorGradient(c1: THREE.RGB, c2: THREE.RGB, c3: THREE.RGB, c4: THREE.RGB, c5: THREE.RGB) {
        const g = []

        for (let i = 0; i < 64; i++) {
            const f = i / 64

            g[i] = this._interpolate(c1, c2, f)
        }
        for (let i = 64; i < 128; i++) {
            const f = (i - 64) / 64;

            g[i] = this._interpolate(c2, c3, f)
        }
        for (let i = 128; i < 192; i++) {
            const f = (i - 128) / 64

            g[i] = this._interpolate(c3, c4, f)
        }
        for (let i = 192; i < 256; i++) {
            const f = (i - 192) / 64

            g[i] = this._interpolate(c4, c5, f)
        }

        return g
    }

    _distance(x: number, y: number) {
        return Math.sqrt(x * x + y * y)
    }

    _randomColor() {
        const r = Math.floor(Math.random() * 255)
        const g = Math.floor(Math.random() * 255)
        const b = Math.floor(Math.random() * 255)

        return { r, g, b }
    }

    _interpolate(c1: THREE.RGB, c2: THREE.RGB, f: number) {
        return {
            r: Math.floor(c1.r + (c2.r - c1.r) * f),
            g: Math.floor(c1.g + (c2.g - c1.g) * f),
            b: Math.floor(c1.b + (c2.b - c1.b) * f)
        }
    }
}