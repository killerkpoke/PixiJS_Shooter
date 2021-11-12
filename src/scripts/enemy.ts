import { Sprite, Texture } from "pixi.js";

export default class Enemy extends Sprite {
    public speed:number;
    constructor(texture:Texture, speed = 1) {
        super(texture);

        this.anchor.set(0.5);
        this.scale.set(1.5, 1.5);
        this.angle = -90;
        this.x = 800;
        this.y = 600/2;
        this.speed = speed;
        
    }
    move(t: number) {
        if (this.x < -100)
            this.speed = -this.speed;
        this.x -= this.speed * t;
    }
}