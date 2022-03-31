// Lava Lamp Plasma from Slawomir Chodnicki's tutorial
// https://towardsdatascience.com/fun-with-html-canvas-lets-make-lava-lamp-plasma-e4b0d89fe778


export default class Plasma {
    constructor(ctx, s) {
        this.ctx = ctx;
        this.size = s;
        this.mapSize = this.size * 2;

        this.initialize();
    }

    initialize() {
        this.prevDirection = 1;
        this.dx1 = 0;
        this.dy1 = 0;
        this.dx2 = 0;
        this.dy2 = 0;
        this.heightMap1 = [];
        this.heightMap2 = [];
        this.palette = [];
        this.palettes = [this.makeRandomPalette(), this.makeRandomPalette()];
        this.image = this.ctx.createImageData(this.size, this.size);

        this.getImageData();
        this.getHeightMap();
    }

    getImageData() {
        for (let i = 0; i < this.image.data.length; i += 4) {
            this.image.data[i + 0] = 0;
            this.image.data[i + 1] = 0;
            this.image.data[i + 2] = 0;
            this.image.data[i + 3] = 255;
        }
    }

    distance(x, y) {
        return Math.sqrt(x * x + y * y);
    }

    randomColor() {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        return { r, g, b }
    }

    updatePalette(time) {
        const inter = (Math.cos(time) + 1) / 2;
        const direction = Math.sin(time) >= 0 ? -1 : 1;

        if (this.prevDirection != direction) {
            this.prevDirection = direction;
            if (direction == -1) {
                this.palettes[0] = this.makeRandomPalette();
            } else {
                this.palettes[1] = this.makeRandomPalette();
            }
        }

        for (let i = 0; i < 256; i++) {
            this.palette[i] = this.interpolate(this.palettes[0][i], this.palettes[1][i], inter);
        }
    }

    makeRandomPalette() {
        const c1 = this.randomColor();
        const c2 = this.randomColor();
        const c3 = this.randomColor();
        const c4 = this.randomColor();
        const c5 = this.randomColor();

        return this.makeFiveColorGradient(c1, c2, c3, c4, c5);
    }

    interpolate(c1, c2, f) {
        return {
            r: Math.floor(c1.r + (c2.r - c1.r) * f),
            g: Math.floor(c1.g + (c2.g - c1.g) * f),
            b: Math.floor(c1.b + (c2.b - c1.b) * f)
        };
    }

    makeFiveColorGradient(c1, c2, c3, c4, c5) {
        const g = [];

        for (let i = 0; i < 64; i++) {
            const f = i / 64;

            g[i] = this.interpolate(c1, c2, f);
        }
        for (let i = 64; i < 128; i++) {
            const f = (i - 64) / 64;

            g[i] = this.interpolate(c2, c3, f);
        }
        for (let i = 128; i < 192; i++) {
            const f = (i - 128) / 64;

            g[i] = this.interpolate(c3, c4, f);
        }
        for (let i = 192; i < 256; i++) {
            const f = (i - 192) / 64;

            g[i] = this.interpolate(c4, c5, f);
        }

        return g;
    }

    getHeightMap() {
        for (let x = 0; x < this.mapSize; x++) {
            for (let y = 0; y < this.mapSize; y++) {
                const i = x * this.mapSize + y;
                const cx = x - this.mapSize / 2;
                const cy = y - this.mapSize / 2;
                const d = this.distance(cx, cy);
                const s = (Math.PI * 2) / (this.mapSize / 2);
                const r = Math.sin(d * s);
                const n = (r + 1) / 2;

                this.heightMap1[i] = Math.floor(n * 128);
            }
        }

        for (let x = 0; x < this.mapSize; x++) {
            for (let y = 0; y < this.mapSize; y++) {
                const i = x * this.mapSize + y;
                const cx = x - this.mapSize / 2;
                const cy = y - this.mapSize / 2;
                const d1 = this.distance(cx, cy) * 0.1;
                const d2 = this.distance(cx, cy) * 0.02;
                const s = Math.sin(d1);
                const c = Math.cos(d2);
                const h = s + c;
                const n = (h + 2) / 4;

                this.heightMap2[i] = Math.floor(n * 127);
            }
        }
    }

    moveHeightMap(time) {
        this.dx1 = Math.floor(
            (((Math.cos(time * 0.5) + 1) / 2) * this.mapSize) / 2
        );
        this.dy1 = Math.floor(
            (((Math.sin(time * 0.2) + 1) / 2) * this.mapSize) / 2
        );
        this.dx2 = Math.floor(
            (((Math.cos(time * 0.3) + 1) / 2) * this.mapSize) / 2
        );
        this.dy2 = Math.floor(
            (((Math.sin(time * 0.4) + 1) / 2) * this.mapSize) / 2
        );
    }

    updateImageData() {
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                const i = (x + this.dy1) * this.mapSize + (y + this.dx1);
                const k = (x + this.dy2) * this.mapSize + (y + this.dx2);
                const j = x * this.size * 4 + y * 4;
                const h = this.heightMap1[i] + this.heightMap2[k];
                const c = this.palette[h];

                this.image.data[j] = c.r;
                this.image.data[j + 1] = c.g;
                this.image.data[j + 2] = c.b;
            }
        }
    }

    drawImageData() {
        this.ctx.putImageData(this.image, 0, 0);
    }

    update(time) {
        this.ctx.clearRect(0, 0, this.size, this.size);
        this.moveHeightMap(time);
        this.updatePalette(time * 2);
        this.updateImageData();
        this.drawImageData();
    }
}