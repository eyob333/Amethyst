import * as THREE from 'three';
import App from '../App';


export default class Cube{
    constructor(){
        this.app = new App();
        this.scene = this.app.scene;
        this.resources = this.app.resources;

        this.setInstance();
    }

    setInstance(){
        this.instance = this.resources.item.Cube.scene
        this.scene.add(this.instance);
    }

    
}