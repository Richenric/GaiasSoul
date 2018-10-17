//Create new scene
let mainMenuScene = new Phaser.Scene('mainMenu');


mainMenuScene.init = function(){

    this.mSTw;
    this.opTw;
    this.bkTw;
    this.pLTw;
    
};

//load assets
mainMenuScene.preload = function(){
    //Se cargan las imagenes para posteriormente crear los sprites
    this.load.image('bg','assets/sprites/mainMenuBg.png');
    this.load.image('bPlay','assets/sprites/playButton.png');
    this.load.image('bOffline','assets/sprites/offlineButton.png');
    this.load.image('bOnline','assets/sprites/onlineButton.png');
    this.load.image('bOptions','assets/sprites/optionsButton.png');
    this.load.image('clOptions','assets/sprites/optionsButton.png'); //Cambiar sprite 'optionsClick.png'
    this.load.image('optM','assets/sprites/optionsMenu.png');
    this.load.image('bBack','assets/sprites/backButton.png');
    /*this.load.image('bExit','assets/sprites/exitButton.png');*/
    this.load.image('pRuebas','assets/sprites/exitButton.png');
    this.load.audio('theme','assets/audio/Holfix-PixelParade.mp3');
};

//called once after the preload ends
mainMenuScene.create = function(){
    //BACKGROUND// --> Se crea y coloca el sprite del fondo
    let bg = this.add.sprite(0,0, 'bg');
    
    let gameW = this.sys.game.config.width;
	let gameH = this.sys.game.config.height;
    bg.setPosition(gameW/2,gameH/2);
    
    //let pRuebas = this.add.sprite(gameW/2,gameH/2, 'pRuebas');
    
    //~CONTENEDORES~// --> Para introducir en ellos los botones, permitiendo mayor facilidad a la hora de animarlos.
        //Selección de modo de juego//
    let modSel = this.add.container(gameW/2,gameH/2); 
        //Botón de opciones//
    let idOpt = this.add.container(gameW/4,gameH/3);
        //Botón de retroceso//
    let idBck = this.add.container(gameW/1.09,gameH/1.2);
        //Botón de retroceso//
    let idPly = this.add.container(gameW/2,gameH/2);
    
    //BOTONES//    
        //OFFLINE//
        //Creación del sprite, y le conferimos interactividad
    let bOff = this.add.sprite(-125,-125,'bOffline').setInteractive(); 
        //Por defecto al ejecutarse este botón tendrá una opacidad del 0%
        bOff.setAlpha(0);   
        //Cuando se haga click en el botón se ejecutará la escena correspondiente al modo de juego seleccionado
        bOff.on('pointerdown', function (pointer) { mainMenuScene.scene.switch(offGameScene); });
        //Añadimos el sprite al contenedor 'Selección de modo de juego'
    modSel.add(bOff);
            
        //ONLINE//
    let bOn = this.add.sprite(125,125, 'bOnline').setInteractive();
        bOn.setAlpha(0);
    modSel.add(bOn);
    
        //BACK//
    let bBack = this.add.sprite(0,0, 'bBack').setInteractive();
        bBack.setAlpha(0);
        bBack.on('pointerdown', function (pointer) { 
                //Al hacer click sobre este botón, la opacidad del botón pasará del 100% al 0%
            this.setAlpha(0);
                //Los demás botones también variarán la opacidad en función de si son o no requeridos en el submenú en cuestión. //Esto es posible realizarlo de este modo porque al no mostrarse un botón (opacidad del 0%, o setAlpha(0)), la interactividad que radica de hacer click sobre él deja de existir hasta que este vuelva a tener una opacidad del 100% (setAlpha(1))
            bOff.setAlpha(0);
            bOn.setAlpha(0);
            bPlay.setAlpha(1);
            bOpt.setAlpha(1);
            mOpt.setAlpha(0);
            /*bExit.setAlpha(1);*/});
                //Roto el sprite para prepararlo para implementar de forma más sencilla el movimiento oscilatorio desarrolado más adelante
    bBack.setRotation(6);
    idBck.add(bBack);
    
        //PLAY//    --> Solo cuando se haga click en 'Play' estarán visibles los botones 'offline' y 'online'
    let bPlay = this.add.sprite(0,0, 'bPlay').setInteractive();
        bPlay.setAlpha(1);
        bPlay.on('pointerdown', function (pointer) { 
            this.setAlpha(0);
            bOff.setAlpha(1);
            bOn.setAlpha(1);
            bBack.setAlpha(1);
            bOpt.setAlpha(0);
            mOpt.setAlpha(0);
            /*bExit.setAlpha(0);*/});
        idPly.add(bPlay);
    
        //OPTIONS//     --> Redirige a otra escena
    let bOpt = this.add.sprite(0,0, 'bOptions').setInteractive();
        bOpt.setAlpha(1);
        bOpt.on('pointerdown', function (pointer){
            this.setAlpha(0);   //o no??
            bPlay.setAlpha(0);
            bBack.setAlpha(1);
            mOpt.setAlpha(1);
        });
    bOpt.setRotation(6);
    idOpt.add(bOpt);
    
    //OPTIONS MENU//
    let mOpt = this.add.image(gameW/2,gameH/2,'optM');
        mOpt.setAlpha(0);
    
    //ANIMACIONES DE LOS BOTONES//
        //Selección de Modo de Juego// --> Desclazamiento circular de los elementos del contenedor
    this.mSTw = this.tweens.add({
        targets: modSel,
        angle: 360,
        duration: 6000,
        yoyo: false,
        repeat: -1
    });
    //para que los sprites realmente oscilen entre (30,-30), aplicar un giro previamente a los sprites en cuestion.
    //Ejemplo: sprite0.setRotation(6); //6 xk está en radianes
        //Botón Opciones// --> Giro oscilatorio
    this.opTw = this.tweens.add({
        targets: idOpt,
        angle: 30,
        duration: 600,
        yoyo: true,
        repeat: -1
    });
        //Botón Back// --> Giro oscilatorio
    this.bkTw = this.tweens.add({
        targets: idBck, 
        angle: 30,
        duration: 600,
        yoyo: true,
        repeat: -1
    });
    
    this.plTw = this.tweens.add({
        targets: idPly,
        scaleX: { value: 0.75, duration: 1000, yoyo: true, },
        scaleY: { value: 0.75, duration: 1000, yoyo: true, },
        repeat: -1
    });
  
    //SONIDO//

    var music = this.sound.add('theme');
    
    var loopMarker = {
        name: 'loop',
        start: 12.00,
        duration: 120.00,
        config: {
            loop: true
        }
    };

    music.addMarker(loopMarker);

    music.play('loop', {
        delay: 1
    }); 
};

//this is called up to 60 times per second
mainMenuScene.update = function(){
 
 
};