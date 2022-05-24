import * as THREE from 'three'


export default class Mouse {
    public delta: number
    public mouse: THREE.Vector3
    public speed: number

    private lastX: number = 0
    private lastY: number = 0

    constructor() {
        this.delta = 0
        this.mouse = new THREE.Vector3()
        this.speed = 0
        this.setupEvents()
    }

    setupEvents() {
        window.addEventListener('scroll', this.onScroll.bind(this), false)
        window.addEventListener('mousemove', this.onMouseMove.bind(this), false)
        window.addEventListener('touchmove', this.onTouchMove.bind(this), false)
        window.addEventListener('mousedown', this.onMouseDown.bind(this), false)
        window.addEventListener('mouseup', this.onMouseUp.bind(this), false)
    }

    onScroll() {
        const docScrollTop = window.pageYOffset
        const docHeight = document.body.scrollHeight - window.innerHeight
        const scrollPercent = docScrollTop / docHeight

        this.delta = scrollPercent
    }

    onMouseMove(e: MouseEvent) {
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
        this.mouse.z = 0

        this.speed =
            Math.sqrt((e.pageX - this.lastX) ** 2 +
                (e.pageY - this.lastY) ** 2) * 0.1
        this.lastX = e.pageX
        this.lastY = e.pageY

        e.preventDefault()
    }

    onMouseDown(e: MouseEvent) {
        document.body.style.cursor = 'grabbing'
    }

    onMouseUp(e: MouseEvent) {
        document.body.style.cursor = 'grab'
    }

    onTouchMove(e: TouchEvent) {
        const touch = e.targetTouches[0]

        this.mouse.x = (touch.pageX / window.innerWidth) * 2 - 1
        this.mouse.y = -(touch.pageY / window.innerHeight) * 2 + 1
        this.mouse.z = 0

        this.speed =
            Math.sqrt((touch.pageX - this.lastX) ** 2 +
                (touch.pageY - this.lastY) ** 2) * 0.5
        this.lastX = touch.pageX
        this.lastY = touch.pageY

        e.preventDefault()
    }
}