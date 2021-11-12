import { Menu } from './menu'
import { Manager } from './manager'

Manager.initialize(800, 600, 0x6495ed);

const menu = new Menu();

Manager.changeScene(menu);
