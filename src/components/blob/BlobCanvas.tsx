import * as THREE from "three";

export default class BlobCanvas {
  public texture;

  private _ctx: CanvasRenderingContext2D;
  private readonly size: number = 256;
  private readonly mapSize: number = 256;

  private heightMap1: number[] = [];
  private heightMap2: number[] = [];
  private image: ImageData;

  constructor() {
    const canvas = document.createElement("canvas");
    canvas.width = this.size;
    canvas.height = this.size;

    this._ctx = canvas.getContext("2d")!;
    this.texture = new THREE.CanvasTexture(canvas);

    this.image = this._ctx.createImageData(this.size, this.size);

    this.image.data.fill(255);
    this._setHeightMap();
  }

  draw = () => {
    this._ctx.putImageData(this.image, 0, 0);
  };

  _setHeightMap() {
    for (let x = 0; x < this.mapSize; x++) {
      for (let y = 0; y < this.mapSize; y++) {
        const i = x * this.mapSize + y;
        const cx = x - this.mapSize / 2;
        const cy = y - this.mapSize / 2;
        const d = this._distance(cx, cy);
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
        const d1 = this._distance(cx, cy) * 0.1;
        const d2 = this._distance(cx, cy) * 0.02;
        const s = Math.sin(d1);
        const c = Math.cos(d2);
        const h = s + c;
        const n = (h + 2) / 4;

        this.heightMap2[i] = Math.floor(n * 127);
      }
    }
  }

  _distance(x: number, y: number) {
    return Math.sqrt(x * x + y * y);
  }
}
