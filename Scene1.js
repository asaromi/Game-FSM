class Scene1 extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image("background", "assets/img/bground.png");
        
        // load player : assets/img
        this.load.image("player", "assets/img/man1.png");

        // load su-player : assets/img
        this.load.image("su-player", "assets/img/man2.png");

        // load attack : assets/spritesheets
        this.load.spritesheet("attack", "assets/spritesheets/attack.png",{
            frameWidth: 169,
            frameHeight: 64
        });

        //this.load.image("ship1", "assets/img/ship.png");
        //this.load.image("ship2", "assets/img/ship2.png");
        //this.load.image("ship3", "assets/img/ship3.png");

        this.load.spritesheet("monster", "assets/img/godzilla.png", {
            frameWidth: 298,
            frameHeight: 272
        });

        this.load.spritesheet("ship1", "assets/spritesheets/ship.png",{
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("ship2", "assets/spritesheets/ship2.png",{
            frameWidth: 16,
            frameHeight: 32
        });

        this.load.spritesheet("ship3", "assets/spritesheets/ship3.png",{
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet("explosion","assets/spritesheets/explosion.png",{
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("explosion2","assets/spritesheets/explosion2.png",{
            frameWidth: 298,
            frameHeight: 272
        });

        this.load.spritesheet("opening", "assets/spritesheets/open.png", {
            frameWidth: 300,
            frameHeight: 72
        });

        this.load.spritesheet("lose", "assets/spritesheets/gameOver.png", {
            frameWidth: 341.3,
            frameHeight: 95
        });

        this.load.spritesheet("win", "assets/spritesheets/youWin.png", {
            frameWidth: 315.3,
            frameHeight: 97
        });

        this.load.audio("kmhmh", ["assets/audio/kmehameha.mp3"]);
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.spacebare = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.anims.create({
            key: "ship1_anim",
            frames: this.anims.generateFrameNumbers("ship1"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "ship2_anim",
            frames: this.anims.generateFrameNumbers("ship2"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "ship3_anim",
            frames: this.anims.generateFrameNumbers("ship3"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
        

        this.anims.create({
            key: "destroy",
            frames: this.anims.generateFrameNumbers("explosion2"),
            delay: 200,
            frameRate: 5,
            repeat: 0,
            hideOnComplete: true
        });

        this.anims.create({
            key: "fire",
            frames: this.anims.generateFrameNumbers("attack"),
            frameRate: 5,
            repeat: 0,
            hideOnComplete: true
        });

        this.anims.create({
            key: "youWin",
            frames: this.anims.generateFrameNumbers("win"),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "youLose",
            frames: this.anims.generateFrameNumbers("lose"),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "openingGame",
            frames: this.anims.generateFrameNumbers("opening"),
            frameRate: 10,
            repeat: -1,
        });

        this.gameStart = this.add.sprite(484/2, 272/2, "opening");
        this.gameStart.setOrigin(0.5,0.5);

        this.gameStart.play("openingGame");
    }

    update(){
        // this.backSound = this.sound.add("soundtrack");
        
        if(Phaser.Input.Keyboard.JustDown(this.spacebare)){
            this.scene.start("playGame");
            console.log("Game Start");
            
        }
    }
}