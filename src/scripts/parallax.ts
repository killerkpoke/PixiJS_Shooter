import { TilingSprite, Texture } from "pixi.js";

export default class Parallax extends TilingSprite {
    private bgXPos = 0;
    private bgSpeed = 1;
    private tiling: TilingSprite;
    constructor(texture:Texture, windowWidth: number, windowHeight: number) {
        super(texture);
        
        this.tiling = new TilingSprite(texture, windowWidth, windowHeight);
        this.tiling.position.set(0, 0);
    }
    public updateParallax(){
        this.bgXPos = (this.bgXPos - this.bgSpeed);
        this.tilePosition.x = this.bgXPos;
    }
    
}