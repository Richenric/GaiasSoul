//create new scene
let gameScene = new Phaser.Scene('Game');

//load assets
gameScene.preload = function(){
	//load images
	this.load.image('labelOfObject','locationOfImage');
};

//set the configuration of the game
let config = {
	type: Phaser.AUTO, // Phaser will use WebGL and if not he will use canvas API
	width: window.innerWidth -15,
	height: window.innerHeight -15,
	scene: gameScene
};

//create a new game and past the configuration
let game = new Phaser.Game(config);