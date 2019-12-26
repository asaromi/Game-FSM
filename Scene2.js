class Scene2 extends Phaser.Scene {
    constructor(){
        super("playGame");
        var superPlayer = false;
    }

    create() {
        
        this.background = this.add.tileSprite(0,0,484,272,"background");
        this.background.setOrigin(0,0);
        
        this.monster = this.add.image(1000, 0, "monster");
        this.monster.setOrigin(0,0);

        this.ship1 = this.add.sprite(0, 272*4/5, "ship1");
        
        this.ship1.setOrigin(1,0);
        
        this.ship2 = this.add.sprite(0, 272/5, "ship2");
        
        this.ship2.flipY = true;
        this.ship2.setOrigin(1,0);

        this.ship3 = this.add.sprite(256/8, 272/2, "ship3");
        this.ship3.setOrigin(1,0);
        

        //this.man1 = this.add.image(256/4, 272/4, "man1");
        //this.man1.setScale(2);
        this.player = this.physics.add.image(254/4, 272/4, "player");
        
        
        
        this.player.setCollideWorldBounds(true);
        console.log("Superman : "+this.player.x+"; "+this.player.y);

        this.super = this.physics.add.image(-1000, 0, "su-player");
        
        
        
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebare = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        

        // add Power-up items
        

        
        // this.super.play("nos");
        this.ship1.play("ship1_anim");
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");

        
        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();
        this.input.on('gameobjectup', this.destroyShip, this);
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.shiftKey.on('down', this.destroyMonster, this);
        // this.add.text(20, 20, "Playing game", {
        //     font: "25px Arial",
        //     fill: "yellow"
        // });
    }

    
    
    moveShipRight(ship, speed){
        ship.x += speed;
        if(ship.x > 512){
            this.resetShipPos(ship);
        }
    }

    moveShipLeft(ship, speed){
        ship.x -= speed;
        if(ship.x < 0){
            this.resetShipPos(ship);
        }
    }

    resetShipPos(ship){
        var randomY = Phaser.Math.Between(40, 230);
        if(ship.x > 484)
            ship.x = 0;
        else if(ship.x < 0)
            ship.x = 484*2;
        ship.y = randomY;
    }

    moveMonster(speed){
        if(this.monster.x > (484-298)){
            this.monster.x -= speed;
            
        } else {
            console.log("Godzilla : "+this.monster.x+"; "+this.monster.y);
            this.ship1.x = -100;
            this.ship2.x = -100;
            this.ship3.x = -100;
        }
    }

    changePlayer(){
        if(this.super.setCollideWorldBounds != true){
            var posA = this.player.x;
            var posB = this.player.y;
            this.player.setCollideWorldBounds(false);
            this.player.x = -1000;
            this.player.y = 0;

            this.super.x = posA;
            this.super.y = posB;
            this.super.setCollideWorldBounds(true);
            this.superPlayer = true;
        }
    }
    
    destroyShip(pointer, gameObject){
        gameObject.setTexture("explosion");
        gameObject.play("explode");
    }

    destroyMonster(){
        console.log(this.monster.x);
        if(this.superPlayer){
            var posXM = this.monster.x;
            var posYM = this.monster.y;
            var posXS = this.super.x;
            var posYS = this.super.y;

            this.monster.destroy();
            
            this.destroy = this.add.sprite(posXM, posYM, "explosion2");
            this.destroy.setOrigin(0, 0);
            this.destroy.play("destroy").anims.setTimeScale(0.4);
            
            this.super.destroy();

            this.fire = this.add.sprite(posXS, posYS, "attack");
            this.shootFire(this.fire);
        }
    }

    shootFire(fire){
        fire.setOrigin(0, 0.5);
        fire.play("fire").anims.setTimeScale(0.5);
    }

    movePlayerManager(){
        if(this.cursorKeys.up.isDown){
            this.player.setVelocityY(-100);
            
        } else if(this.cursorKeys.down.isDown){
            this.player.setVelocityY(100);
            
        } else if(this.superPlayer){
            if(this.cursorKeys.right.isDown){
                this.super.setVelocityX(100);
                console.log("Superman : "+this.super.x+"; "+this.super.y);
            } else if(this.cursorKeys.left.isDown){
                this.super.setVelocityX(-100);
            }
        }
    }

    update(){
        
        // if(this.monster.x <= 484){
        //     this.ship3.x = 500;
        //     this.ship2.x = 500;
        //     this.ship1.x = 500;
        // } else {
        //     this.resetShipPos(this.ship3);
        //     this.resetShipPos(this.ship2);
        //     this.resetShipPos(this.ship1);
        // }
        this.moveMonster(1);
        if(this.monster.x == 254 && !this.superPlayer){
            console.log("Press Space Bar to Get Super Power. And go to Left to kill Monster");
        } else if(this.monster.x == 254 && (this.monster.x == this.super.x)) {
            console.log("Destroy Monster");
        }

        this.moveShipLeft(this.ship3, 2);
        this.moveShipLeft(this.ship1, 1);
        this.moveShipLeft(this.ship2, 3);
        this.movePlayerManager();
        
        if(Phaser.Input.Keyboard.JustDown(this.spacebare)){
            console.log("Fire!");
            this.changePlayer();
        }

        this.background.tilePositionX += 1;
    }
}