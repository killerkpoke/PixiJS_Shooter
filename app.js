let windowWidth = 800;
let windowHeight = 600
// Canvas
const app = new PIXI.Application({width:windowWidth, height:windowHeight});
document.body.appendChild(app.view);

let player;
let bgBack;
let bgXPos = 0;
let bgSpeed = 1;

app.loader.baseUrl = "images";
app.loader
    .add("nebula", "Nebula Aqua-Pink.png")
    .add("ship", "spaceships.png")
    .add("enemyShip", "spaceships.png")
    .add("explosion", "particle.png")
app.loader.onComplete.add(initLevel);
//app.loader.load();

// LOGO
//#region 
CreateLogo = (text, fontsize, x, y) => {
    const label = new PIXI.Text(
        text,
        {
            fontSize: fontsize,
            fill: 0x007171,
        }
    );
    label.anchor.set(0.5);
    label.x = x;
    label.y = y;
    app.stage.addChild(label);
    return label;
}
let logo = CreateLogo("Milky Way", 69, windowWidth/2, 100);
//#endregion

// UI Elements - 4 buttons
//#region 
CreateButton = (text, fontsize, x, y, onPointerDown) => {
    const label = new PIXI.Text(
        text,
        {
            fontSize: fontsize,
            fill: 0xffffff,
        }
    );
    label.anchor.set(0.5);
    label.x = x;
    label.y = y;
    
    const width = label.width + fontsize;
    const height = label.height + fontsize;
    const labelBody = new PIXI.Graphics();
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
    labelBody.on("pointerdown", onPointerDown);

    app.stage.addChild(labelBody);
    app.stage.addChild(label);
    return {
        body:labelBody,
        label:label
    };
}
let button1 = CreateButton("GAME1", 24, windowWidth/2, windowHeight / 2.5, () => this.startGame());
let button2 = CreateButton("GAME2", 24, windowWidth/2, windowHeight / 2.5 + 67.5, () => this.startGame());
let button3 = CreateButton("GAME3", 24, windowWidth/2, windowHeight / 1.6, () => this.startGame());
let button4 = CreateButton("EXIT", 34, windowWidth/2, windowHeight / 1.5 + 85, () => this.goToLink());

function goToLink() {
    window.open("https://itch.io");
}

function startGame() {
    app.loader.load();
}
//#endregion

function createBG(texture) {
    let tiling = new PIXI.TilingSprite(texture, windowWidth, windowHeight);
    tiling.position.set(0, 0);
    app.stage.addChild(tiling);
    return tiling;
}
function initLevel(){
    bgBack = createBG(app.loader.resources["nebula"].texture);

    // Mouse movement for player
    //#region 
    player = createPlayer();
    app.stage.interactive = true;
    app.stage.on("pointermove", movePlayer);

    function movePlayer(e){
        let pos = e.data.global;
        player.x = pos.x;
        player.y = pos.y;
    }
    //#endregion

    // Collision
    //#region 
    function intersect(unit, enemy) {
        let u = unit.getBounds();
        let e = enemy.getBounds();
        return  u.x + u.width > e.x &&
                u.x < e.x + e.width &&
                u.y + u.height > e.y &&
                u.y < e.y + e.height;
    
    }
    //#endregion
        
    // Player
    //#region 
    function createPlayer(){
        const playerTexture = app.loader.resources["ship"].texture;
        const rect1 = new PIXI.Rectangle(0, 0, 32, 32);
        playerTexture.frame = rect1;
        let player = new PIXI.Sprite(playerTexture);
        player.anchor.set(0.5);
        player.scale.set(1.5, 1.5);
        player.angle = 90;
        player.x = app.view.width / 2;
        player.y = app.view.height / 2;

        app.stage.addChild(player);
        return player;
    }
    //#endregion

    // Enemy
    //#region 
    let enemys = [];
    function RandomRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    function createEnemy() {
        const enemyTexture = app.loader.resources["enemyShip"].texture;
        const rect2 = new PIXI.Rectangle(0, 64, 32, 32);
        enemyTexture.frame = rect2;
        let enemy = new PIXI.Sprite(enemyTexture);
        let enemyMovementSpeed = RandomRange(2, 5);
        enemy.anchor.set(0.5);
        enemy.scale.set(1.5, 1.5);
        enemy.angle = -90;
        enemy.x = app.view.width - 100;
        enemy.y = Math.floor(RandomRange(100, 500));
        enemy.speed = enemyMovementSpeed;

        app.stage.addChild(enemy);
        return enemy;
    }
    //#endregion

    // Projectile
    //#region 
    let projectiles = [];
    let projectileSpeed = 10;

    function fire(){
        let projectile = createProjectile();
        projectiles.push(projectile);
    }
    function createProjectile(){
        let p = new PIXI.Sprite.from("images/bullet.png");
        p.anchor.set(0.5);
        p.scale.set(0.3, 0.3);
        p.x = player.x;
        p.y = player.y;
        p.speed = projectileSpeed;
        app.stage.addChild(p);
        return p;
    }
    // Fire projectile
    app.stage.on("pointerdown", fire);

    function updateProjectile(delta){
        for (const proj of projectiles) {
            proj.position.x += proj.speed * delta;
        }
    }
    //#endregion
        
    // Game loop
    //#region 
    function gameLoop(delta) {
        updateProjectile(delta);
        spawnEnemy(delta);
        updateEnemyMovement(delta);
        updateParallax();
        checkCollision();
    }

    let gameTime = 0;
    function spawnEnemy(delta) {
        gameTime += delta;
        if (gameTime > 120) {
            let en = createEnemy();
            enemys.push(en);
            gameTime = 0;
        }
    }
    function updateEnemyMovement(delta) {
        for (const enemy of enemys) {
            enemy.position.x -= enemy.speed * delta;
        }
    }
    function updateParallax(){
        bgXPos = (bgXPos - bgSpeed);
        bgBack.tilePosition.x = bgXPos;
    }
    function checkCollision() {
        for (let enemy of enemys) {
            // Check enemy hit by projectile
            for (let proj of projectiles) {
                if (intersect(proj, enemy)) {
                    console.log('Enemy died');
                    //EmitParticle(enemy.x, enemy.y);
                    enemy.visible = false;
                    app.stage.removeChild(enemy);
                }
            }
            // Check enemy hit by player
            if (intersect(player, enemy)) {
                console.log('Level reset');
                //EmitParticle(player.x, player.y);
                //app.stage.removeChild(enemy);
                //app.stage.removeChild(player);     
            }
        }
    }
    //#endregion
    
    // Create particle when player die, or the enemy explode
    //#region
    /*function  CreateParticles(x, y) {
        let particleContainer = new PIXI.ParticleContainer();
        for (let i = 0; i < 10; ++i)
        {
            let sprite = PIXI.Sprite(app.loader.resources["explosion"].texture);
            //sprite.anchor.set(0.5);
            sprite.x = x;
            sprite.y = y;
            particleContainer.addChild(sprite);
        }
    }
    function EmitParticle(x, y){
        let particleList = CreateParticles(x, y);
        for (let particle of particleList){

            particle.x += RandomRange(5, 10);
            particle.y += 0;

            app.stage.addChild(particle);
        }
    }*/
    //#endregion

    app.ticker.add(gameLoop);
}
