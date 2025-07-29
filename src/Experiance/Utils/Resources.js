import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/Addons.js';
import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter{

    constructor(sources){
        super()
        this.sources = sources
        
        //set up
        this.item = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders(){
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.dracoLoader = new DRACOLoader()
        this.loaders.dracoLoader.setDecoderPath('/draco/')
        // this.loaders.gltfLoader.setDRACOLoader( this.loaders.dracoLoader )
        this.loaders.rgbeLoader = new RGBELoader()
    }

    startLoading(){
        // const source = this.sources[0];
        // this.loaders.gltfLoader.load(
        //     source.path,
        //         (file) => {
        //             console.log("some thing")
        //             this.sourceLoaded( source, file)
        //     })

        this.sources.forEach( source => {
            if( source.type === 'gltfModel'){
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded( source, file)
                    }
                )
            } 
            else if(source.type === 'rgbeTexture'){
                this.loaders.rgbeLoader.load(
                    source.path,
                    (file) =>{
                        this.sourceLoaded(source, file)
                    }
                )

            }
        });
    }

    sourceLoaded(source, file){
        this.item[source.name] = file
        this.loaded++ 
        if (this.loaded === this.toLoad ){
            console.log( 'ready' )
            this.trigger('ready')
        }
    }
}