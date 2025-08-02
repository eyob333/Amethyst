import * as THREE from 'three'
import App from "../App"
import Environmet from './Environment'
import Crystal from './Cryistal'
import Cube from './Cube'

export default class World{

    constructor(){
        this.app = new App()
        this.scene = this.app.scene
        this.resorces = this.app.resources

        // //test mesh 
        // const testMesh = new THREE.Mesh( 
        //     new THREE.BoxGeometry(),
        //     new THREE.MeshStandardMaterial({color: '#ffffff',})
        // )
        // testMesh.castShadow  = true

        // this.scene.add( testMesh )
        
        this.resorces.on( 'ready', ()=>{ 
            this.enviromet = new Environmet()
            this.crystal = new Crystal()
            this.Cube = new Cube();
        })

    }

    update(){
    }
}