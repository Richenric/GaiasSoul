//Create new scene
let mainMenuScene = new Phaser.Scene('mainMenu');


mainMenuScene.init = function(){
    mainMenuScene.create();
    this.toobig = false;
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
        //OFFLINE//
    let bOff = this.add.sprite(gameW/2.5,gameH/2.5, 'bOffline').setInteractive();
        bOff.setAlpha(0);
        bOff.on('pointerdown', function (pointer) { mainMenuScene.scene.switch(offGameScene); });
            //bOff.on('pointerdown', function (pointer) { this.setTint(0xff0000); });

        //ONLINE//
    let bOn = this.add.sprite(gameW/1.69,gameH/1.67, 'bOnline').setInteractive();
        bOn.setAlpha(0);
        //bOff.on('pointerdown', function (pointer) { mainMenuScene.scene.switch(onGameScene); });
            //bOn.on('pointerdown', function (pointer) { this.setTint(0xff0000); });
    
        //BACK//        --> Dentro de la escena mainMenuScene, revierte de 'Online'+'Offline' a 'Play'
        //              --> Tmbn estará presente en la escena 'optScene' para regresar a la escea 'mainMenuScene'
    let bBack = this.add.sprite(gameW/1.09,gameH/1.2, 'bBack').setInteractive();
        bBack.setAlpha(0);
        bBack.on('pointerdown', function (pointer) { 
            this.setAlpha(0);
            bOff.setAlpha(0);
            bOn.setAlpha(0);
            bPlay.setAlpha(1);
            bOpt.setAlpha(1);
            /*bExit.setAlpha(1);*/});
    
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
    let bOpt = this.add.sprite(gameW/4,gameH/3, 'bOptions').setInteractive();
        bOpt.setAlpha(1);
        //bOff.on('pointerdown', function (pointer) { mainMenuScene.scene.switch(optMenuScene); });
            //bOpt.on('pointerdown', function (pointer) { this.setTint(0xff0000); });

        /*//EXIT//
    let bExit = this.add.sprite(gameW/12,gameH/1.2, 'bExit').setInteractive();
        bExit.setAlpha(1);
        bExit.on('pointerdown', function (pointer) { this.sys.game.destroy(true);}); //REVISAR Y POSIBLEMENTE CAMBIAR
            //bExit.on('pointerdown', function (pointer) { this.setTint(0xff0000); });*/

}

//this is called up to 60 times per second
mainMenuScene.update = function(){
    /*Phaser.Actions.RotateAroundDistance(bOff.getChildren(), { x: 400, y: 300 }, 0.02, 200);*/
}