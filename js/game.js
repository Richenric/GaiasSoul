//create new scene
let gameScene = new Phaser.Scene('Game');

gameScene.init = function(){
	this.toobig = false;
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

	//create player sprite (depth 1)
	let player = this.add.sprite(gameW/2,gameH/2, 'player');
	player.depth = 1;
	player.setScale(1,1);
	//player.scaleX = ...;
	//player.x = ...;

	//create enemy sprite (depth 0)
	this.enemy0 = this.add.sprite(gameW/3, gameH/3, 'enemy');

	//create a second enemy sprite (depth 0)
	this.enemy1 = this.add.sprite(gameW/1.5, gameH/1.5, 'enemy');
	this.enemy1.displayWidth = 200;
	this.enemy1.flipX = true;
	//enemy1.setAngle(-60);
	//enemy1.angle += 45; //Degrees
	//enemy1.setRotation(Math.PI / 4);
	this.enemy1.rotation = Math.PI / 4; //Radians
};

//this is called up to 60 times per second
gameScene.update = function(){
	this.enemy1.angle += 1;
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
};

//set the configuration of the game
let config = {
	type: Phaser.AUTO, // Phaser will use WebGL and if not he will use canvas API
	width: window.innerWidth -15,
	height: window.innerHeight -15,
	scene: gameScene
};
console.log(window.innerWidth -15);
console.log(window.innerHeight -15);

//create a new game and past the configuration
let game = new Phaser.Game(config);