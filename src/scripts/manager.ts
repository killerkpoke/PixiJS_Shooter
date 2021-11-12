import { Application, DisplayObject } from "pixi.js";

export class Manager {
    private constructor() {

    }

    private static app: Application;
    private static currentScene: IScene;

    private static _width: number;
    private static _height: number;

    public static get width(): number {
        return Manager._width;
    }
    public static get height(): number {
        return Manager._height;
    }
    public static initialize(width: number, height: number, background: number): void {

        Manager._width = width;
        Manager._height = height;

        Manager.app = new Application({
            view: document.getElementById("#game") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        });
        Manager.app.stage.interactive = true;
        Manager.app.ticker.add(Manager.update)
    }

    public static changeScene(newScene: IScene): void {
        // Remove and destroy old scene if we had one
        if (Manager.currentScene) {
            Manager.app.stage.removeChild(Manager.currentScene);
            Manager.currentScene.destroy();
        }

        // Add the new one
        Manager.currentScene = newScene;
        Manager.app.stage.addChild(Manager.currentScene);
    }

    public static update(framesPassed:number): void {
        if (Manager.currentScene) {
            Manager.currentScene.update(framesPassed);
        }
    }
}
export interface IScene extends DisplayObject {
    update(framesPassed: number): void;
}