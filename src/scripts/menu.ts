import { Container, Text, Graphics, TextStyle } from "pixi.js";
import { Game } from "./game";
import { IScene, Manager } from "./Manager";

export class Menu extends Container implements IScene {
    
    constructor(){
        super();
        const windowWidth = 800;
        const windowHeight = 600;
        const logo = this.CreateLogo("Milky Way", 69, 800/2, 100);
        const button1 = this.CreateButton("GAME1", 24, windowWidth/2, windowHeight / 2.5, Manager.changeScene(new Game()));
        const button2 = this.CreateButton("GAME2", 24, windowWidth/2, windowHeight / 2.5 + 67.5, Manager.changeScene(new Game()));
        const button3 = this.CreateButton("GAME3", 24, windowWidth/2, windowHeight / 1.6, Manager.changeScene(new Game()));
        const button4 = this.CreateButton("EXIT", 34, windowWidth/2, windowHeight / 1.5 + 85, this.goToLink());

        this.addChild(logo);
        this.addChild(button1, button2, button3, button4);
    }
    public update(delta:number): void {
        console.log(delta);
    }
    private CreateLogo(text:string, fontsize:number, x:number, y:number):Text {
        const label = new Text(
            text,
            new TextStyle({
                fontSize: fontsize,
                fill: 0x007171,
            })
        );
        label.anchor.set(0.5);
        label.x = x;
        label.y = y;
        return label;
    }

    private CreateButton(text:string, fontsize:number, x:number, y:number, func:void):Container {
        let b = new Container();

        // Text
        const label = new Text(
            text,
            new TextStyle({
                fontSize: fontsize,
                fill: 0xffffff,
            })
        );
        label.anchor.set(0.5);
        label.x = x;
        label.y = y;
        
        // Button
        const width = label.width + fontsize;
        const height = label.height + fontsize;
        const labelBody = new Graphics();
        labelBody
            .lineStyle(2, 0x00f8ff)
            .beginFill(0x007676)
            .drawRoundedRect(
                x - width / 2,
                y - height / 2,
                width, height, 15
            )
            .endFill()
        labelBody.interactive = true;
        labelBody.buttonMode = true;
        labelBody.on("added", () => func, this);
        
        b.addChild(label, labelBody);
        return b;
    }
    private goToLink(): void {
        window.open("https://itch.io");
    }
}