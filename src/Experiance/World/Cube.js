import * as THREE from 'three';
import App from '../App';
import amethVertext from '../Shaders/Ameth/vertex.glsl'
import amethFragment from '../Shaders/Ameth/fragment.glsl'


export default class Cube{
    constructor(){
        this.app = new App();
        this.scene = this.app.scene;
        this.resources = this.app.resources;

        this.debug = this.app.debug

        this.setInstance();


        if (this.debug.active){
            this.setDebug();
        }

        
    }

    setInstance(){
        this.instance = this.resources.item.Cube.scene
        this.instance.scale.set(.5, .5, .5)
        this.instance.position.set(-.3, 0, -.3)

        this.material = new THREE.ShaderMaterial({
            vertexShader: amethVertext,
            fragmentShader: amethFragment,
            uniforms: {
                uTime: new THREE.Uniform(0),
                uSpeed: new THREE.Uniform(1),
            }
        });


        this.instance.traverse( child =>{
            if(child.isMesh){
                child.material = this.material
            }
        })
        this.scene.add(this.instance);
    }
    setDebug(){
        let debug = this.debug.ui.addFolder('cube');
        debug.add(this.material.uniforms.uSpeed, 'value').min(0).max(3).step(.00001).name('uSpeed');
    }

    update(){
        this.material.uniforms.uTime.value = this.app.time.elapsed;
    }

}