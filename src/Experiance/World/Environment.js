import * as THREE from 'three'
import App from "../App";


export default class Environmet{

    constructor(){
        this.app = new App()
        this.scene = this.app.scene
        this.resources = this.app.resources
        this.debug = this.app.debug

        this.setSunLight()
        this.setAmbientLight()
        // this.setEnvMap()

        if( this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Enviromet')
                .close();

            this.debugFolder.add( this.sunLight, 'intensity' ).name('SunLightIntensity').min(0).max(10).step( 0.001)
            this.debugFolder.add( this.sunLight.position, 'x' ).name('SunLightPositionX').min(-10).max(10).step( 0.001)
            this.debugFolder.add( this.sunLight.position, 'y' ).name('SunLightPositionY').min(-10).max(10).step( 0.001)
            this.debugFolder.add( this.sunLight.position, 'z' ).name('SunLightPositionZ').min(-10).max(10).step( 0.001)

            this.debugFolder.add(this.ambient, 'intensity').name("AmbientLightIntesity").min(0).max(4).step(.001)

        }

    }

    setSunLight(){
        this.sunLight = new THREE.DirectionalLight('#ffffff', 3.993)
        this.sunLight.position.set( -0.999, 2.047, -1.761)
        this.scene.add( this.sunLight )
    }

    setAmbientLight(){
        this.ambient = new THREE.AmbientLight('#ffffff', 0.525)
        this.scene.add(this.ambient)
    }
    
    setEnvMap(){
        this.environmentMap = this.resources.item.enviroment
        this.environmentMap.mapping = THREE.EquirectangularReflectionMapping
        this.scene.background = this.environmentMap
        this.scene.environment = this.environmentMap
    }

}