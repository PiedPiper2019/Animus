import React, { Component } from 'react'

import AR from '../libs/aruco'
import '../libs/polyfill'

class ARScene extends Component {

    video: any
    canvas: any
    context: any
    imageData: any
    detector: any

    componentDidMount() {
        this.onLoad()
    }

    onLoad = () => {
        this.video = document.getElementById("video")
        this.canvas = document.getElementById("canvas")
        this.context = this.canvas.getContext("2d")

        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            this.video.srcObject = stream
            this.video.onloadedmetadata = this.video.play
        })

        this.detector = new AR.Detector()

        requestAnimationFrame(this.tick)
    }
            
    tick = () => {
        requestAnimationFrame(this.tick)
        
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA){
            this.snapshot()

            var markers = this.detector.detect(this.imageData)
            this.drawCorners(markers)
            this.drawId(markers)
        }
    }

    snapshot = () => {
        this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height)
        this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
    }
                
    drawCorners = (markers: any[]) => {
        let corners, corner, i, j;
        
        this.context.lineWidth = 3;

        for (i = 0; i !== markers.length; ++ i) {
            corners = markers[i].corners;
            
            this.context.strokeStyle = "red";
            this.context.beginPath();
            
            for (j = 0; j !== corners.length; ++ j){
                corner = corners[j];
                this.context.moveTo(corner.x, corner.y);
                corner = corners[(j + 1) % corners.length];
                this.context.lineTo(corner.x, corner.y);
            }

            this.context.stroke();
            this.context.closePath();
            
            this.context.strokeStyle = "green";
            this.context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
        }
    }

    drawId = (markers: any[]) => {
        var corners, corner, x, y, i, j;
        
        this.context.strokeStyle = "blue";
        this.context.lineWidth = 1;
        
        for (i = 0; i !== markers.length; ++ i){
            corners = markers[i].corners;
            
            x = Infinity;
            y = Infinity;
            
            for (j = 0; j !== corners.length; ++ j){
                corner = corners[j];
                
                x = Math.min(x, corner.x);
                y = Math.min(y, corner.y);
            }

            this.context.strokeText(markers[i].id, x, y)
        }
    }

    render() {
        return (
            <div className="flex">
                <video id="video" autoPlay style={{ display: 'none' }} />
                <canvas id="canvas" style={{width: 400, height: 400}} />
            </div>
        )
    }
}

export default ARScene