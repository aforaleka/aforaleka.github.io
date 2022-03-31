import * as THREE from 'three'

export default class Mouse {
    constructor(canvas) {
        this.canvas = canvas;
        this.initialize();
    }

    initialize() {
        this.delta = 0;
        this.mouse = new THREE.Vector3();
        this.setupEvents();

        this.lastX = 0;
        this.lastY = 0;
        this.speed = 0;
    }

    setupEvents() {
        window.addEventListener('scroll', this.onScroll.bind(this), false);
        window.addEventListener('mousemove', this.onMousemove.bind(this), false);
        window.addEventListener('touchmove', this.onTouchmove.bind(this), false);
    }

    onScroll(e) {
        const docScrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = docScrollTop / docHeight;

        this.delta = scrollPercent;
    }

    onMousemove(e) {
        e.preventDefault();
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        this.mouse.z = 0;

        this.speed =
            Math.sqrt((e.pageX - this.lastX) ** 2 +
                (e.pageY - this.lastY) ** 2) * 0.1;
        this.lastX = e.pageX;
        this.lastY = e.pageY;
    }

    onTouchmove(e) {
        e.preventDefault();
        const touch = e.targetTouches[0];

        this.mouse.x = (touch.pageX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(touch.pageY / window.innerHeight) * 2 + 1;
        this.mouse.z = 0;

        this.speed =
            Math.sqrt((touch.pageX - this.lastX) ** 2 +
                (touch.pageY - this.lastY) ** 2) * 0.5;
        this.lastX = touch.pageX;
        this.lastY = touch.pageY;
    }
}