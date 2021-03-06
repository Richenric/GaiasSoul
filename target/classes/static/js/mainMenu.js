﻿let mainMenuScene = new Phaser.Scene('mainMenu');//Create new scene

mainMenuScene.init = function(){
	//this.nicknamesTaken = [];
	//myUser.puntuacion = prompt("Please enter your score", "0");
	//console.log("Your score: " + myUser.puntuacion);
	/*while(myUser.nickname == null){
		myUser.nickname = prompt("Please enter your name", "Username");
		//createUser(myUser,function(UserWithId){myUser = UserWithId});
		console.log(myUser.nickname); 
	} */
	/*takenNicknames(function (names) {this.nicknamesTaken = names;});
    if (myUser.nickname != null) {
    	//createUser(user, function(UserWithId){console.log("Mi usuario: " + JSON.stringify(UserWithId))});
    	console.log(myUser.nickname);
    }  */
};
//load assets
mainMenuScene.preload = function(){
    //Se cargan las imagenes para posteriormente crear los sprites
    this.load.image('bg','assets/sprites/background3.png');
    this.load.image('bPlay','assets/sprites/playButton.png');
    this.load.image('bOffline','assets/sprites/offlineButton.png');
    this.load.image('bOnline','assets/sprites/onlineButton.png');
    this.load.image('bCtrls','assets/sprites/ctrlButton.png');
    this.load.image('vUp','assets/sprites/volLoud.png');
    this.load.image('vMid','assets/sprites/volMid.png');
    this.load.image('vDw','assets/sprites/volMute.png');
    this.load.image('vUpAct','assets/sprites/volLoudAct.png');
    this.load.image('vMidAct','assets/sprites/volMidAct.png');
    this.load.image('vDwAct','assets/sprites/volMuteAct.png');
    this.load.image('bOptions','assets/sprites/optionsButton.png');
    this.load.image('optM','assets/sprites/soundsMenu.png');
    this.load.image('bBack','assets/sprites/backButton.png');
    this.load.image('gtitle','assets/sprites/gtitle.png');
    this.load.image('howToMenu','assets/sprites/howToMenu.png');
    this.load.image('howToMenu2','assets/sprites/howToMenu2.png');
    this.load.image('botonDer','assets/sprites/botonRightA.png');
    this.load.audio('theme','assets/audio/Racing-Menu.mp3');
    this.load.image('score10' ,'assets/sprites/score10.png' );
    this.load.image('score20' ,'assets/sprites/score20.png' );
    this.load.image('score50' ,'assets/sprites/score50.png' );
    this.load.image('score100','assets/sprites/score100.png');
};

mainMenuScene.create = function(){
    var that = this;
    this.allVolButtons = [];
    this.volumen;
    
    this.numeroDeGente = 0;
    
    function volBinit(posX,posY,imageN,imageAct){
        let normal = that.add.sprite(posX,posY, imageN).setInteractive();
        let accion = that.add.sprite(posX,posY, imageAct);
        let volButton = { n: normal, act: accion };    
        volButton.n.setAlpha(0);    volButton.act.setAlpha(0);
        return volButton;
    }
    function volActionConfig(num,vol){
        that.allVolButtons[num].n.on('pointerdown', function (pointer) {
            volumen = vol; music.setVolume(vol);
            console.log(volumen);
            that.allVolButtons.forEach(bttn => { bttn.n.setAlpha(1); bttn.act.setAlpha(0);}); //Resto de botones
            that.allVolButtons[num].n.setAlpha(0); that.allVolButtons[num].act.setAlpha(1); //Boton de volumen seleccionado
        });
    }
    function animBConfig(targets,angle,duration,yoyo,repeat){
        let anim = {
            targets: targets,
            angle: angle, //En grados hexadecimales
            duration: duration,
            yoyo: yoyo,
            repeat: repeat
        }
        return anim;
    }
    function setScoreAndRun(score){
        winningScore = score;
        music.stop('theme');
        mainMenuScene.scene.switch(offGameScene);
    }
    //BACKGROUND// --> Se crea y coloca el sprite del fondo
    let gameW = this.sys.game.config.width;
	let gameH = this.sys.game.config.height;
    
    //BACKGROUND//
    var bgPos = 670;
    var limW = gameW/337;
    var limH = gameH/337;
    
    for(i=0; i<limW; i++){
        for(j=0; j<limH; j++){
            let bg = this.add.sprite(i*bgPos,j*bgPos,'bg');
            bg.setDepth(0);}}
    
    this.input.setDefaultCursor('url(assets/cursors/CustomCursor.cur), pointer');
    
    //~CONTENEDORES~// --> Para introducir en ellos los botones, permitiendo mayor facilidad a la hora de animarlos.
    let modSel= this.add.container(gameW/2,gameH/2);     //Selección de modo de juego//
    let idOpt = this.add.container(gameW/4,gameH/3+200);     //Botón de opciones//
    let idBck = this.add.container(gameW/1.09,gameH/1.2);//Botón de retroceso//
    let idPly = this.add.container(gameW/2,gameH/2+200);     //Botón de play//
    let vCtrl = this.add.container(gameW/2,gameH/2);     //Botones control volumen//
    vCtrl.setDepth(1);
    let ctrls = this.add.container(gameW/1.33,gameH/3+200);  //Botón de Controles//
    let scorechoiceContainer = this.add.container(gameW/2,gameH/2);
    
    //BOTONES//    
        //OFFLINE//
        //Creación del sprite, y le conferimos interactividad
    let bOff = this.add.sprite(-125,-125,'bOffline').setInteractive();
        bOff.setAlpha(0); //Por defecto al ejecutarse este botón tendrá una opacidad del 0%
        bOff.on('pointerdown', function (pointer) {//Cuando se haga click en el botón se ejecutará la escena correspondiente al modo de juego seleccionado
            this.setAlpha(0);
            bOn.setAlpha(0);
            score10.setAlpha(1);
            score20.setAlpha(1);
            score50.setAlpha(1);
            score100.setAlpha(1); });
    modSel.add(bOff); //Añadimos el sprite al contenedor 'Selección de modo de juego'

        //ONLINE//
    let bOn = this.add.sprite(125,125, 'bOnline').setInteractive();
        bOn.setAlpha(0);
    modSel.add(bOn);
    bOn.on('pointerdown', function (pointer) {
    	/*loadUsers(function (users) {
    		that.numeroDeGente = users.length;
    		if(that.numeroDeGente < 20 && !this.nicknamesTaken.includes(myUser.nickname) && myUser.nickname != null){
    			
    			createUser(myUser, function(userWithId){myUser = userWithId; myUser.id = userWithId.id;});
    			//console.log(myUser);
    			
        		mainMenuScene.scene.switch(lobbyScene);
        	}
    		
    		else {
    			if(that.numeroDeGente >= 20){
    				console.log("El server está lleno!");
    			}else if(this.nicknamesTaken.includes(myUser.nickname)){
    				console.log("QUE POCO ORIGINAL ERES!");
    				myUser.nickname = prompt("HIJO DE MI VIDA pon otro nombre... porfa", "Username");
    			}else if(myUser.nickname == null){
    				console.log("Muy null te veo");
    				myUser.nickname = prompt("Mas null tu nombre no podia ser... pon otro anda... ", "Username");
    			}
        	}
        });*/
    	mainMenuScene.scene.switch(userScene);
    });
    
        //BACK//
    let bBack = this.add.sprite(0,0, 'bBack').setInteractive();
        bBack.setScale(0.75);
        bBack.setAlpha(0);
        bBack.on('pointerdown', function (pointer) { 
                //Al hacer click sobre este botón, la opacidad del botón pasará del 100% al 0%
            this.setAlpha(0);
                //Los demás botones también variarán la opacidad en función de si son o no requeridos en el submenú en cuestión. //Esto es posible realizarlo de este modo porque al no mostrarse un botón (opacidad del 0%, o setAlpha(0)), la interactividad que radica de hacer click sobre él deja de existir hasta que este vuelva a tener una opacidad del 100% (setAlpha(1))
            bOff.setAlpha(0);
            bOn.setAlpha(0);
            bPlay.setAlpha(1);
            bCtrls.setAlpha(1);
            title.setAlpha(1);
            that.allVolButtons.forEach(button => { button.n.setAlpha(0); button.act.setAlpha(0); });
            bOpt.setAlpha(1);
            mOpt.setAlpha(0);
            dameControlesDer.setAlpha(0);
            dameControlesIzq.setAlpha(0);
            howTo1.setAlpha(0);
            howTo2.setAlpha(0);
            score10.setAlpha(0);
            score20.setAlpha(0);
            score50.setAlpha(0);
            score100.setAlpha(0);
        });
    bBack.setRotation(6.15); //Sprite rotado para implementar el movimiento oscilatorio(mas adelante)
    idBck.add(bBack);
    
        //PLAY//    --> Solo cuando se haga click en 'Play' estarán visibles los botones 'offline' y 'online'
    let bPlay = this.add.sprite(0,0, 'bPlay').setInteractive();
        bPlay.setAlpha(1);
        bPlay.on('pointerdown', function (pointer) { 
            this.setAlpha(0);
            bOff.setAlpha(1);
            bOn.setAlpha(1);
            bCtrls.setAlpha(0);
            bBack.setAlpha(1);
            title.setAlpha(0);
            bOpt.setAlpha(0);
        });
        idPly.add(bPlay);
    let title = this.add.sprite(gameW/2,gameH/2-150,'gtitle');
    title.setScale(0.75);
        //CONTROLES//
    let bCtrls = this.add.sprite(0,0, 'bCtrls').setInteractive();
        bCtrls.setScale(0.75);
        bCtrls.setAlpha(1);
        bCtrls.on('pointerdown', function(pointer){
            this.setAlpha(0);
            bPlay.setAlpha(0);
            title.setAlpha(0);
            bBack.setAlpha(1);
            bOpt.setAlpha(0);
            dameControlesDer.setAlpha(1);
            howTo1.setAlpha(1);//De momento, para comprobar que el botón funciona correctamente
        });
    bCtrls.setRotation(6.15);
    ctrls.add(bCtrls);

    let dameControlesDer = this.add.sprite(gameW/2+350, gameH/2+150, 'botonDer').setAlpha(0).setInteractive();
     dameControlesDer.on('pointerdown', function(pointer){
            this.setAlpha(0);
            dameControlesIzq.setAlpha(1);
            howTo1.setAlpha(0);
            howTo2.setAlpha(1);//De momento, para comprobar que el botón funciona correctamente
        });
     let dameControlesIzq = this.add.sprite(gameW/2-350, gameH/2+150, 'botonDer').setAlpha(0).setInteractive();
     dameControlesIzq.flipX = true;
     dameControlesIzq.on('pointerdown', function(pointer){
            this.setAlpha(0);
            dameControlesDer.setAlpha(1);
            howTo1.setAlpha(1);
            howTo2.setAlpha(0);//De momento, para comprobar que el botón funciona correctamente
        });

    ////////SONIDO////////////////////////////////////////////////////////////////    
    music = this.sound.add('theme', loopMarker);
    this.allVolButtons[0] = volBinit(-200,0,'vDw' ,'vDwAct' );
    this.allVolButtons[1] = volBinit(-150,0,'vMid','vMidAct');
    this.allVolButtons[2] = volBinit(-100,0,'vMid','vMidAct');
    this.allVolButtons[3] = volBinit( -50,0,'vMid','vMidAct');
    this.allVolButtons[4] = volBinit(   0,0,'vMid','vMidAct');
    this.allVolButtons[5] = volBinit(  50,0,'vMid','vMidAct');
    this.allVolButtons[6] = volBinit( 100,0,'vMid','vMidAct');
    this.allVolButtons[7] = volBinit( 150,0,'vMid','vMidAct');
    this.allVolButtons[8] = volBinit( 200,0,'vUp' ,'vUpAct' );
    volActionConfig(0,0);
    volActionConfig(1,0.025);
    volActionConfig(2,0.05);
    volActionConfig(3,0.075);
    volActionConfig(4,0.1);
    volActionConfig(5,0.25);
    volActionConfig(6,0.5);
    volActionConfig(7,0.75);
    volActionConfig(8,1);
    this.allVolButtons.forEach(button => { vCtrl.add(button.n); vCtrl.add(button.act); });

    var loopMarker = {
        name: 'loop',
        start: 0.00,
        duration: 15.240476,
        config: {
            mute: false,
            loop: true
        }
    };
    music.addMarker(loopMarker);
    music.play('loop', { delay: 0 });

    ///////OPTIONS// --> Redirige a otra escena///////////////////////////////////////////////
    let bOpt = this.add.sprite(0,0, 'bOptions').setInteractive();
        bOpt.setScale(0.75);
        bOpt.setAlpha(1);
        bOpt.on('pointerdown', function (pointer){
            this.setAlpha(0);
            bPlay.setAlpha(0);
            bCtrls.setAlpha(0);
            that.allVolButtons.forEach(button => { button.n.setAlpha(1); });
            that.allVolButtons[8].act.setAlpha(1); that.allVolButtons[8].n.setAlpha(0);
            title.setAlpha(0);
            bBack.setAlpha(1);
            mOpt.setAlpha(1);
        });
    bOpt.setRotation(6.15);
    idOpt.add(bOpt);
    
    //OPTIONS MENU//
    let mOpt = this.add.image(gameW/2,gameH/2,'optM');
        mOpt.setAlpha(0); mOpt.setDepth(0);

    //HOW TO MANU//
    let howTo1 = this.add.image(gameW/2,gameH/2,'howToMenu');
        howTo1.setAlpha(0); howTo1.setDepth(0);
    let howTo2 = this.add.image(gameW/2,gameH/2,'howToMenu2');
        howTo2.setAlpha(0); howTo2.setDepth(0);

    let score10 = this.add.sprite(gameW/2-300,gameH/2, 'score10').setInteractive();
    let score20 = this.add.sprite(gameW/2-100,gameH/2, 'score20').setInteractive();
    let score50 = this.add.sprite(gameW/2+100,gameH/2, 'score50').setInteractive();
    let score100 =this.add.sprite(gameW/2+300,gameH/2,'score100').setInteractive();
    score10.setScale(0.2);score10.setAlpha(0);
    score20.setScale(0.2);score20.setAlpha(0);
    score50.setScale(0.2);score50.setAlpha(0);
    score100.setScale(0.2);score100.setAlpha(0);
    
    score10.on('pointerdown', function (pointer){
        setScoreAndRun(10);
    });
    score20.on('pointerdown', function (pointer){
        setScoreAndRun(20);
    });
    score50.on('pointerdown', function (pointer){
        setScoreAndRun(50);
    });
    score100.on('pointerdown', function (pointer){
        setScoreAndRun(100);
    });

    //ANIMACIONES DE LOS BOTONES//
        //Selección de Modo de Juego// --> Deslizamiento circular de los elementos del contenedor
    this.mSTw = this.tweens.add(animBConfig(modSel,360,48000,false,-1));
    //para que los sprites realmente oscilen entre (30,-30), aplicar un giro previamente a los sprites en cuestion.
    //Ejemplo: sprite0.setRotation(6.16); //6.15 xk está en radianes
    this.opTw  = this.tweens.add(animBConfig(idOpt,15,600,true,-1));  //Botón Opciones// --> Giro oscilatorio
    this.bkTw  = this.tweens.add(animBConfig(idBck,15,600,true,-1));//Botón Back// --> Giro oscilatorio
    this.ctrlTw= this.tweens.add(animBConfig(ctrls,15,600,true,-1));//Botón Control// --> Giro oscilatorio
    this.plTw  = this.tweens.add({
        targets: idPly,
        scaleX: { value: 0.75, duration: 1000, yoyo: true, },
        scaleY: { value: 0.75, duration: 1000, yoyo: true, },
        repeat: -1
    });
};
mainMenuScene.update = function(){//this is called up to 60 times per second
};