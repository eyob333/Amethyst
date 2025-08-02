import * as THREE from 'three';
import App from '../App';
import amethVertext from '../Shaders/Ameth/vertex.glsl'
import amethFragment from '../Shaders/Ameth/fragment.glsl'


export default class Cube{
    constructor(){
        this.app = new App();
        this.scene = this.app.scene;
        this.resources = this.app.resources;

        this.setInstance();

        
    }

    setInstance(){
        this.instance = this.resources.item.Cube.scene
        this.instance.scale.set(.5, .5, .5)
        this.instance.position.set(-.3, 0, -.3)

        this.material = new THREE.ShaderMaterial({
            vertexShader: amethVertext,
            fragmentShader: amethFragment
        });


        this.instance.traverse( child =>{
            if(child.isMesh){
                child.material = this.material
            }
        })
        this.scene.add(this.instance);
    }
    setDebug(){
    }


}