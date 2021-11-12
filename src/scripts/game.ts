import { Container, Sprite } from "pixi.js";
import Player from './player'
import Enemy from './enemy'

import * as Manager from "./Manager";
import { Menu } from './menu'
import Particle from "./particle";
import Parallax from "./parallax";

export class Game extends Container implements Manager.IScene {
    private player: Player;
    private enemy: Enemy;
    private bullets = [];
    private parallax: Parallax;

    private gameTime: number = 0;

    constructor(){
        super();

        this.player = new Player(Sprite.from("images/spaceships.png").texture);
        this.enemy = new Enemy(Sprite.from("images/spaceships.png").texture);
        this.parallax = new Parallax(Sprite.from("images/star_09.png").texture, 800, 600);
        
    }
    public update(delta:number): void {
       //this.player.move();
       this.parallax.updateParallax();
       this.gameTime += delta;
        if (this.gameTime > 120) {
            this.enemy = new Enemy(Sprite.from("images/spaceships.png").texture);
            this.gameTime = 0;
        }

       this.enemy.move(delta);

        if(this.intersect(this.player, this.enemy)){
            this.removeChild(this.player);
            const menu = new Menu();
            Manager.Manager.changeScene(menu);
        }
        for (const bullet of this.bullets) {   
            if(this.intersect(bullet, this.enemy)) {
                for (let i = 0; i < 30; i++) {
                    const particle = new Particle();
                    particle.explosion(this.enemy.x, this.enemy.y);
                }
                this.removeChild(bullet);
                this.removeChild(this.enemy);
                
            }
        }
        //Manager.app.ticker.add(this.update);
        
    }
    // Check collision
    private intersect(unit:Sprite, enemy:Sprite):boolean {
        let u = unit.getBounds();
        let e = enemy.getBounds();
        return  u.x + u.width > e.x &&
                u.x < e.x + e.width &&
                u.y + u.height > e.y &&
                u.y < e.y + e.height;
    }
}