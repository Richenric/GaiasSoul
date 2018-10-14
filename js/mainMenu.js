//Create new scene
let mainMenuScene = new Phaser.Scene('mainMenu');


mainMenuScene.init = function(){
    mainMenuScene.create();
var mSTw;
var opTw;
var bkTw;
    
}

//load assets
mainMenuScene.preload = function(){
    //Crear la imagen de fondo del menu
    this.load.image('bg','assets/sprites/mainMenuBg.png');
    this.load.image('bPlay','assets/sprites/playButton.png');
    this.load.image('bOffline','assets/sprites/offlineButton.png');
    this.load.image('bOnline','assets/sprites/onlineButton.png');
    this.load.image('bOptions','assets/sprites/optionsButton.png');
    this.load.image('bBack','assets/sprites/backButton.png');
    /*this.load.image('bExit','assets/sprites/exitButton.png');*/
    this.load.image('pRuebas','assets/sprites/exitButton.png');
}

//called once after the preload ends
mainMenuScene.create = function(){
    //BACKGROUND//
    let bg = this.add.sprite(0,0, 'bg');
    
    let gameW = this.sys.game.config.width;
	let gameH = this.sys.game.config.height;
    bg.setPosition(gameW/2,gameH/2);
    
            //let pRuebas = this.add.sprite(gameW/2,gameH/2, 'pRuebas');
    //BOTONES//
        //~CONTENEDOR~//mode selector
    let modSel = this.add.container(gameW/2,gameH/2);
    let idOpt = this.add.container(gameW/4,gameH/3);
    let idBck = this.add.container(gameW/1.09,gameH/1.2);
        //OFFLINE//
    let bOff = this.add.sprite(-125,-125, 'bOffline').setInteractive();
        bOff.setAlpha(0);
        bOff.on('pointerdown', function (pointer) { mainMenuScene.scene.switch(offGameScene); });
    modSel.add(bOff);
            //bOff.on('pointerdown', function (pointer) { this.setTint(0xff0000); });
        //ONLINE//
    let bOn = this.add.sprite(125,125, 'bOnline').setInteractive();
        bOn.setAlpha(0);
    modSel.add(bOn);
        //bOff.on('pointerdown', function (pointer) { mainMenuScene.scene.switch(onGameScene); });
            //bOn.on('pointerdown', function (pointer) { this.setTint(0xff0000); });
    
        //BACK//        --> Dentro de la escena mainMenuScene, revierte de 'Online'+'Offline' a 'Play'
        //              --> Tmbn estará presente en la escena 'optScene' para regresar a la escea 'mainMenuScene'
    let bBack = this.add.sprite(0,0, 'bBack').setInteractive();
        bBack.setAlpha(0);
        bBack.on('pointerdown', function (pointer) { 
            this.setAlpha(0);
            bOff.setAlpha(0);
            bOn.setAlpha(0);
            bPlay.setAlpha(1);
            bOpt.setAlpha(1);
            /*bExit.setAlpha(1);*/});
    bBack.setRotation(6);
    idBck.add(bBack);
    
        //PLAY//    --> Solo cuando se haga click en 'Play' estarán visibles los botones 'offline' y 'online'
    let bPlay = this.add.sprite(gameW/2,gameH/2, 'bPlay').setInteractive();
        bPlay.setAlpha(1);
        bPlay.on('pointerdown', function (pointer) { 
            this.setAlpha(0);
            bOff.setAlpha(1);
            bOn.setAlpha(1);
            bBack.setAlpha(1);
            bOpt.setAlpha(0);
            /*bExit.setAlpha(0);*/});
    
        //OPTIONS//     --> Redirige a otra escena
    let bOpt = this.add.sprite(0,0, 'bOptions').setInteractive();
        bOpt.setAlpha(1);
    bOpt.setRotation(6);
    idOpt.add(bOpt);
        //bOff.on('pointerdown', function (pointer) { mainMenuScene.scene.switch(optMenuScene); });
            //bOpt.on('pointerdown', function (pointer) { this.setTint(0xff0000); });

        /*//EXIT//
    let bExit = this.add.sprite(gameW/12,gameH/1.2, 'bExit').setInteractive();
        bExit.setAlpha(1);
        bExit.on('pointerdown', function (pointer) { this.sys.game.destroy(true);}); //REVISAR Y POSIBLEMENTE CAMBIAR
            //bExit.on('pointerdown', function (pointer) { this.setTint(0xff0000); });*/
    
    
    mSTw = this.tweens.add({
        targets: modSel,
        angle: 360,
        duration: 6000,
        yoyo: false,
        repeat: -1
    });
    //para que los sprites realmente oscilen entre (30,-30), aplicar un giro previamente a los sprites en cuestion.
    //Ejemplo: sprite0.setRotation(6); //6 xk está en radianes
    opTw = this.tweens.add({
        targets: idOpt,
        angle: 30,
        duration: 600,
        yoyo: true,
        repeat: -1
    });
    bkTw = this.tweens.add({
        targets: idBck, 
        angle: 30,
        duration: 600,
        yoyo: true,
        repeat: -1
    });

}

//this is called up to 60 times per second
mainMenuScene.update = function(){
 
    //Se supone que el botón play debería crecer y decrecer... pero no está colaborando mucho ¬¬
    /*if (this.toobig == false){
		this.bPlay.displayWidth += 1;
		this.bPlay.displayHeight += 1;
	}else if (this.toobig == true){
		this.bPlay.displayWidth -= 1;
		this.bPlay.displayHeight -= 1;
	}

	if (this.bPlay.displayWidth >= 200){
		this.toobig = true;
	}else if (this.bPlay.displayWidth <= 100){
		this.toobig = false;
	}    */
    
/*Phaser.Actions.RotateAroundDistance(bOff.getChildren(), { x: 400, y: 300 }, 0.02, 200);*/
}