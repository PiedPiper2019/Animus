import React, { Component } from 'react'

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import AR from '../libs/aruco'
import '../libs/polyfill'
import POS from '../libs/pose'

class ARScene extends Component {

    video: any
    canvas: any
    context2d?: CanvasRenderingContext2D
    imageData: any
    detector: any

    markers: any[] = []

    componentDidMount() {
        this.onLoad()
    }

    createRenderer = () => {
        const renderer = new THREE.WebGLRenderer()
        renderer.setClearColor(0xffffff, 1)
        renderer.setSize(this.canvas.width, this.canvas.height);
        (document.getElementById("ar-container") as HTMLElement).appendChild(renderer.domElement)
        return renderer
    }

    createScene3d = () => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, this.canvas.width / this.canvas.height, 1, 1000);
        scene.add(camera);
        return [scene, camera]
    }

    createSceneFlat = () => {
        const scene = new THREE.Scene()
        const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5)
        scene.add(camera)
        return [scene, camera]
    }

    createTexture = () => {
        const   texture = new THREE.Texture(this.video),
                object = new THREE.Object3D(),
                geometry = new THREE.PlaneGeometry(1.0, 1.0, 0.0),
                material = new THREE.MeshBasicMaterial({ map: texture, depthTest: false, depthWrite: false }),
                mesh = new THREE.Mesh(geometry, material)

        object.position.z = -1
        object.add(mesh)
        return object
    }

    createObject = () => {
        const   object = new THREE.Object3D(),
                geometry = new THREE.SphereGeometry(0.5, 15, 15, Math.PI),
                material = new THREE.MeshBasicMaterial(),
                mesh = new THREE.Mesh(geometry, material)
      
        object.add(mesh);
        return object;
    }

    onLoad = () => {
        this.video = document.getElementById("ar-video")
        this.canvas = document.getElementById("ar-canvas")
        this.context2d = this.canvas.getContext("2d")

        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(stream => {
            this.video.srcObject = stream
        })

        this.detector = new AR.Detector()

        requestAnimationFrame(this.tick)
    }
            
    tick = () => {
        requestAnimationFrame(this.tick)
        
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA){
            this.snapshot()

            this.markers = this.detector.detect(this.imageData)
            this.update();
        }
    }

    snapshot = () => {
        if (!this.context2d) return
        this.context2d.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height)
        this.imageData = this.context2d.getImageData(0, 0, this.canvas.width, this.canvas.height)
    }

    drawCorners = () => {
        if (!this.context2d) return

        var corners, corner, i, j;
      
        this.context2d.lineWidth = 3;
  
        for (i = 0; i !== this.markers.length; ++ i) {
            corners = this.markers[i].corners;
            
            this.context2d.strokeStyle = "red";
            this.context2d.beginPath();
            
            const middle = { x: 0, y: 0 }
            for (j = 0; j !== corners.length; ++ j){
                corner = corners[j];
                this.context2d.moveTo(corner.x, corner.y);
                corner = corners[(j + 1) % corners.length];
                this.context2d.lineTo(corner.x, corner.y);
                middle.x += corner.x
                middle.y += corner.y
            }
            middle.x /= corners.length
            middle.y /= corners.length
    
            this.context2d.stroke()
            this.context2d.closePath()
            
            const area = (
                (corners[0].x*corners[1].y+corners[1].x*corners[2].y+corners[2].x*corners[3].y+corners[3].x*corners[0].y) -
                (corners[1].x*corners[0].y+corners[2].x*corners[1].y+corners[3].x*corners[2].y+corners[0].x*corners[3].y)) / 2

            const offset = { x: 0, y: 0 }
            offset.x = middle.x - corners[0].x
            offset.y = middle.y - corners[0].y
            this.context2d.translate(middle.x, middle.y)
            const angle = Math.atan2(offset.y, offset.x)
            const dx = Math.cos(angle)
            const dy = Math.sin(angle)

            const text = `id #${this.markers[i].id}`

            this.context2d.translate(-10, -Math.sqrt(area) * 7)
            this.context2d.font = "30px Avenir Next"
            this.context2d.strokeStyle = "black"
            this.context2d.strokeText(text, 0, 0)
            this.context2d.fillStyle = "white"
            this.context2d.fillText(text, 0, 0)
            this.context2d.resetTransform()
        }
    }

    update = () => {
        this.drawCorners()
    }

    render() {
        return (
            <div className="relative flex full-screen">
                <canvas className="absolute full-screen" id="ar-canvas" width={1080/4} height={1920/4} />
                <video className="full-screen" id="ar-video" autoPlay style={{ display: 'none' }} />
            </div>
        )
    }
}

export default ARScene