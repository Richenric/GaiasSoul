//create new scene
let gameScene = new Phaser.Scene('Game');

var velocity1X = 0;
var velocity1Y = 0;

var velocity2X = 0;
var velocity2Y = 0;

gameScene.init = function(){
	this.cursors;

	this.velocity1X = 0;
	this.velocity1Y = 0;

	this.velocity2X = 0;
	this.velocity2Y = 0;

	this.toobig = false;
	this.accel = 10;
};

//load assets
gameScene.preload = function(){
	//load images
	this.load.image('background','assets/background.png');
	this.load.image('player','assets/player.png');
	this.load.image('enemy', 'assets/enemy.png')
};

//called once after the preload ends
gameScene.create = function(){
	//create bg sprite (depth 0)
	//this.add.sprite(675,321, 'background');
	let bg = this.add.sprite(0,0, 'background');

	//change the origin to up-left corner
	//bg.setOrigin(0,0);
	let gameW = this.sys.game.config.width;
	let gameH = this.sys.game.config.height;
	bg.setPosition(gameW/2,gameH/2);
	console.log(bg);
	console.log(this);

	//Create controls
	cursors = this.input.keyboard.createCursorKeys();
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

	//create player sprite (depth 1)
	//if you don't set the body as active it won't collide with the world bounds
	this.player1 = this.physics.add.sprite(gameW/2,gameH/2, 'player')
	this.player1.depth = 1;
	this.player1.setScale(1,1);
	//player.scaleX = ...;
	//player.x = ...;
	this.player1.setCollideWorldBounds(true);

	this.player2 = this.physics.add.sprite(gameW/2,gameH/2, 'player')
	this.player2.depth = 1;
	this.player2.setCollideWorldBounds(true);

	//create enemy sprite (depth 0)
	this.enemy0 = this.physics.add.sprite(gameW/3, gameH/3, 'enemy')
	this.enemy0.setCollideWorldBounds(true);

	//create a second enemy sprite (depth 0)
	this.enemy1 = this.physics.add.sprite(gameW/1.5, gameH/1.5, 'enemy')
	this.enemy1.displayWidth = 200;
	this.enemy1.flipX = true;
	//enemy1.setAngle(-60);
	//enemy1.angle += 45; //Degrees
	//enemy1.setRotation(Math.PI / 4);
	//this.enemy1.rotation = Math.PI / 4; //Radians
	this.enemy1.setCollideWorldBounds(true);

	this.physics.world.enable([ this.player1, this.player2, this.enemy0, this.enemy1 ]);
};

//this is called up to 60 times per second
gameScene.update = function(){
	this.enemy1.angle += 1;
	this.enemy1.x += this.accel * Math.cos(this.enemy1.angle/180*Math.PI);
	this.enemy1.y += this.accel * Math.sin(this.enemy1.angle/180*Math.PI);

	if (this.toobig == false){
		this.enemy0.displayWidth += 1;
		this.enemy0.displayHeight += 1;
	}else if (this.toobig == true){
		this.enemy0.displayWidth -= 1;
		this.enemy0.displayHeight -= 1;
	}

	if (this.enemy0.displayWidth >= 200){
		this.toobig = true;
	}else if (this.enemy0.displayWidth <= 100){
		this.toobig = false;
	}

	velocity1X = Math.min(velocity1X, 300);
    velocity1X = Math.max(velocity1X, -300);
    velocity1Y = Math.min(velocity1Y, 300);
    velocity1Y = Math.max(velocity1Y, -300);
    this.player1.setVelocityX(velocity1X);
    this.player1.setVelocityY(velocity1Y);

    velocity2X = Math.min(velocity2X, 300);
    velocity2X = Math.max(velocity2X, -300);
    velocity2Y = Math.min(velocity2Y, 300);
    velocity2Y = Math.max(velocity2Y, -300);
    this.player2.setVelocityX(velocity2X);
    this.player2.setVelocityY(velocity2Y);

    if (cursors.left.isDown)
    {
        velocity1X += -300;
        this.player1.setVelocityX(velocity1X);
    }
    else if (cursors.right.isDown)
    {
        velocity1X += 300;
        this.player1.setVelocityX(velocity1X);
    }

    if (cursors.up.isDown)
    {
        velocity1Y += -300;
        this.player1.setVelocityY(velocity1Y);
    }
    else if (cursors.down.isDown)
    {
        velocity1Y += 300;
        this.player1.setVelocityY(velocity1Y);
    }
    
        if (velocity1X>0){
            velocity1X += -7.5;
        }else if (velocity1X<0){
            velocity1X += 7.5;
        }

        if (velocity1Y>0){
            velocity1Y += -7.5;
        }else if (velocity1Y<0){
            velocity1Y += 7.5;
        }

    if (keyA.isDown)
    {
        velocity2X += -300;
        this.player2.setVelocityX(velocity2X);
    }
    else if (keyD.isDown)
    {
        velocity2X += 300;
        this.player2.setVelocityX(velocity2X);
    }

    if (keyW.isDown)
    {
        velocity2Y += -300;
        this.player2.setVelocityY(velocity2Y);
    }
    else if (keyS.isDown)
    {
        velocity2Y += 300;
        this.player2.setVelocityY(velocity2Y);
    }
    
        if (velocity2X>0){
            velocity2X += -7.5;
        }else if (velocity2X<0){
            velocity2X += 7.5;
        }

        if (velocity2Y>0){
            velocity2Y += -7.5;
        }else if (velocity2Y<0){
            velocity2Y += 7.5;
        }

    this.physics.world.collide(this.player1, this.player2);
    this.physics.world.collide(this.player1, this.enemy0);
    this.physics.world.collide(this.player1, this.enemy1);
    this.physics.world.collide(this.player2, this.enemy0);
    this.physics.world.collide(this.player2, this.enemy1);
};

//set the configuration of the game
let config = {
	type: Phaser.AUTO, // Phaser will use WebGL and if not he will use canvas API
	width: window.innerWidth -15,
	height: window.innerHeight -15,
	parent: 'phaser-example',
	title: "Gaia's Souls",
	url: "http://192.168.1.195:8080/GaiasSoul",
	version: "0.0.3",
	physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
	scene: gameScene,
	fps: 60
};
console.log(window.innerWidth -15);
console.log(window.innerHeight -15);

//create a new game and past the configuration
let game = new Phaser.Game(config);