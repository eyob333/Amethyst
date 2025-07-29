import App from "../App"
import * as THREE from 'three'
import customShaderMaterial from 'three-custom-shader-material/vanilla'

export default class Crystal{
    constructor(){
        this.app = new App()
        this.scene = this.app.scene
        this.resorces = this.app.resources.item
        this.crystal = this.resorces.cryistal.scene
        this.debug = this.app.debug
        console.log(this.app)

        this.setMaterial()
        this.setInstance()
        if(this.debug.active){
            this.setDebug()
        }
    }
    setInstance(){
        this.crystal.scale.set(.01, .01, .01)
        console.log('foo cryistal', this.crystal)
        this.crystal.traverse( child =>{
            if(child.isMesh){
                child.material = this.material
            }
        })
        this.scene.add(this.crystal)
    }
    setUniform(){
        this.uniforms = {}
    }

    setMaterial(){
        this.material = new customShaderMaterial({
            baseMaterial: THREE.MeshPhysicalMaterial,
            metalness: 0,
            roughness: .5,
            color: 0xffffff,
            transmission: 0,
            ior: 1.5,
            thickness: 1.5,
            transparent: true,
            wireframe: false
        })
    }

    setDebug(){
        this.cryistalMaterial = this.debug.ui.addFolder("Cryistal")
        this.cryistalMaterial.add( this.material, 'metalness').min(0).max(1).step(0.001).name('metalness')
        this.cryistalMaterial.add( this.material, 'roughness').min(0).max(1).step(0.001).name('roughness')
        this.cryistalMaterial.add( this.material, 'transmission').min(0).max(1).step(0.001).name('transmission')
        this.cryistalMaterial.add( this.material, 'ior').min(0).max(1).step(0.001).name('ior')
        this.cryistalMaterial.add( this.material, 'thickness').min(0).max(10).step(0.001).name('thickness')
    }
}
