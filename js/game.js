//Mierdas mias, ignoradlas pls
/*let mainMenuScene = new Phaser.Scene('MainMenu');
let onGameScene = new Phaser.Scene('OnGame');*/
//game.js contiene el código que crea el juego, crea la configuración global a todo el juego, coordina que escenas se van a usar y declara las variables globales

//Creación de la config del juego
let config = {
    type: Phaser.AUTO, // Con AUTO, phaser intentará usar WEBGL antes que CANVAS
    width: window.innerWidth -15, //Configuramos el ancho del canvas para que se ajuste al ancho de pantalla mostrada
    height: window.innerHeight -15, //Configuramos el alto del canvas para que se ajuste al ancho de pantalla mostrada
    title: "Gaia's Souls", //Titulo en el menú de phaser al inspeccionar
    url: "http://192.168.1.195:8080/GaiasSoul", //Url en el menú de phaser al inspeccionar
    version: "0.1.3", //Version en el menú de phaser al inspeccionar
    physics: { //Configuramos las físicas que se van a usar en el juego
        default: 'arcade', //Usamos físicas ARCADE
        arcade: {
            //debug: true //Usamos el modo DEBUG mientras desarrollamos para ver cajas de colision y vectores de movimiento, luego se pone a false
        }
    },
    disableContextMenu: true,
    scene: [mainMenuScene, offGameScene, offInterface, pauseMenuScene], //Declaramos que escenas se van a usar y en que orden
    fps: 60
};

//Testeos
console.log(window.innerWidth -15); //Testeo del tamaño de ventana
console.log(window.innerHeight -15); //Testeo del tamaño de ventana

//Creación de un nuevo juego y asignación de config
let game = new Phaser.Game(config);

//Declaración de variables globales
var volumen = 1;
var winningScore = 10;
var gameW = window.innerWidth -15;
var gameH = window.innerHeight -15;

