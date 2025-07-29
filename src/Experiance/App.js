import * as THREE from 'three'
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Sources from './Assets/Sources'
import Resources from './Utils/Resources'
import Camera from './Camera'
import Renderer from './Renderer'
import Debug from './Utils/Debug'
import World from './World/World'
import Stats from 'stats-js'

const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

let instance = null;

export default class App{
    constructor(canvas){
        if (instance){
            return instance
        }
        instance = this

        window.experiance = this
        this.debug = new Debug
        
        this.canvas = canvas
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(Sources)
        this.camera = new Camera(this)
        this.renderer = new Renderer()
        this.world = new World()
       

        // resize
        this.sizes.on( 'resize', ()=> {
            this.resize()
        })

        this.time.on( 'tick', () => {
            this.update()
        })
    }

    resize(){
        this.camera.resize()
        this.renderer.resize()
    }

    update(){
        stats.begin()
        this.camera.update()
        this.renderer.update()        
        this.world.update()
        stats.end()
    }

     destroy(){
        this.sizes.off('resize')
        this.time.off('tick')

        // traverse scene
        this.scene.traverse( child => {
            if ( child instanceof THREE.Mesh ){
                child.geometry.dispose()
                for( const key in child.material){
                    const value = child.material[key]
                    if (value && typeof value.dispose === 'function'){
                        value.dispose()
                    }
                };
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        if ( this.debug.active){
            this.debug.ui.destroy()
        }
    }

}