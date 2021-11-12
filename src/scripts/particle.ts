import * as particleSettings from "../emitter.json"
import * as particles from 'pixi-particles'
import { Container, Texture, ParticleContainer} from 'pixi.js'

export default class Particle extends Container {
    private particleContainer: ParticleContainer
    constructor() {
        super();

        this.particleContainer = new ParticleContainer();
        this.addChild(this.particleContainer);
    }
    public explosion(x:number, y:number):void {
        const emitter = new particles.Emitter(this.particleContainer, Texture.from("star_09.png"), particleSettings);
        emitter.autoUpdate = true;
        emitter.updateSpawnPos(x, y);
        emitter.emit = true;

    }   
}
