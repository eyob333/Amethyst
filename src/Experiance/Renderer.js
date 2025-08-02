import * as  THREE from 'three'
import App from "./App";

export default class Renderer{
    
    constructor(){
        this.app = new App()
        this.canvas = this.app.canvas
        this.scene = this.app.scene
        this.sizes = this.app.sizes        
        this.camera = this.app.camera

        this.setInstace()
    }

    setInstace(){
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })

        // this.instance.toneMapping = THREE.CineonToneMapping
        // this.instance.toneMappingExposure = 1.75
        this.instance.setClearColor(0x712987ff)
        this.instance.setClearAlpha(.2)
        this.instance.setSize( this.sizes.width,  this.sizes.height )
        this.instance.setPixelRatio( this.sizes.pixelRatio )

    }

    resize(){
        this.instance.setSize( this.sizes.width,  this.sizes.height )
        this.instance.setPixelRatio( this.sizes.pixelRatio )
    }

    update(){
        this.instance.render( this.scene, this.camera.instance)
    }

}