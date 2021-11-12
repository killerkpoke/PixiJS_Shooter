import { Sprite, Texture } from "pixi.js";
//import Bullet from "./bullet";

export default class Player extends Sprite {
    public speed:number;
    public bullets = [];
    constructor(texture:Texture) {
        super(texture);
     
        this.anchor.set(0.5);
        this.scale.set(1.5, 1.5);
        this.angle = 90;
        this.position.x = 0;
        this.position.y = 2 / 2;
        this.speed = 10;

        document.addEventListener("keydown", this.move.bind(this));
    }
    move(e: KeyboardEvent){
        if(e.code == "ArrowUp") this.y -= this.speed;
        if(e.code == "ArrowDown") this.y += this.speed;
    }
    fire(e: KeyboardEvent) {
        if (e.code == "Space"){
            // let bullet = new Bullet(Sprite.from("images/bullet.png").texture, this.x, this.y);
            
            // this.bullets.push(bullet); 
            // Argument of type 'Bullet' is not assignable to parameter of type 'never'??.
        }
    }
}