import * as THREE from 'three'
import Debug from './Utils/Debug.js'
import Stats from 'stats.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Mouse from './Utils/Mouse.js'


export default class Experience {
    constructor(_canvas) {
        // Global access
        window.experience = this

        // Options
        this.canvas = _canvas
        this.isDarkMode = (window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
        this.fov = 50
        this.backgroundColor = this.isDarkMode ? '#000000' : '#FFFFFF'

        // Debug
        this.debug = new Debug()
        if (this.debug.active) {
            this.stats = new Stats()
            this.stats.showPanel(0)
            document.body.appendChild(this.stats.dom)
        }

        // Setup
        this.sizes = new Sizes()
        this.dist = this.sizes.height / 2 / Math.tan((this.fov / 2) * (Math.PI / 180))
        this.time = new Time(this)
        this.mouse = new Mouse()
        this.scene = new THREE.Scene()
        this.camera = new Camera(this)
        this.renderer = new Renderer(this)
        this.world = new World(this)

        // Resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update()
        })
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }
}