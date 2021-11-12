import { Sprite, Texture } from "pixi.js";

export default class Bullet extends Sprite {
    public speed:number;
    constructor(texture:Texture, playerX: number,playerY: number) {
        super(texture);
        
        this.anchor.set(0.5);
        this.x = playerX + 20;
        this.y = playerY;
        this.speed = 20;
    }
    move(delta:number) {
        this.x += this.speed * delta;
    }
}