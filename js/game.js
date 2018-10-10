//Mierdas mias, ignoradlas pls
/*let mainMenuScene = new Phaser.Scene('MainMenu');
let onGameScene = new Phaser.Scene('OnGame');*/

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
    scene: [offGameScene],
    fps: 60
};
console.log(window.innerWidth -15);
console.log(window.innerHeight -15);

//create a new game and past the configuration
let game = new Phaser.Game(config);

var velocity1X = 0;
var velocity1Y = 0;

var velocity2X = 0;
var velocity2Y = 0;

