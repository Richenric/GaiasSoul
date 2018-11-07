let pauseMenuScene = new Phaser.Scene('pauseMenu');
//var music = offGameScene.musci;
pauseMenuScene.init = function(){
    
};

pauseMenuScene.preload = function(){
    this.load.image('bCPly','assets/sprites/playButton.png');
    this.load.image('vUp','assets/sprites/volLoud.png');
    this.load.image('vMid','assets/sprites/volMid.png');
    this.load.image('vDw','assets/sprites/volMute.png');
    this.load.image('vUpAct','assets/sprites/volLoudAct.png');
    this.load.image('vMidAct','assets/sprites/volMidAct.png');
    this.load.image('vDwAct','assets/sprites/volMuteAct.png');
    this.load.image('bOptions','assets/sprites/optionsButton.png');
    this.load.image('optM','assets/sprites/optionsMenu.png');
    this.load.image('sndM','assets/sprites/soundsMenu.png');
    this.load.image('bBtMM','assets/sprites/backButton.png');
    this.load.image('bBack','assets/sprites/backButton.png');
};

pauseMenuScene.create = function(){
    var that = this;
    this.allVolButtons = [];
    this.volumen;
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
            that.allVolButtons[num].n.setAlpha(0); 
            that.allVolButtons[num].act.setAlpha(1); //Boton de volumen seleccionado
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
    
    let gameW = this.sys.game.config.width;
	let gameH = this.sys.game.config.height;
    
    //~CONTENEDORES~//
    ///*//Volumen//*/         let modSel= this.add.container(gameW/2,gameH/2);     
    /*//Opciones//*/        let idOpt = this.add.container(gameW/2.85,gameH/3);
    /*//Back to Menu//*/    let idBtM = this.add.container(gameW/1.55,gameH/1.5);
    //--> Cambiar color del back a rojo         
    /*//Retroceso//*/       let idBck = this.add.container(gameW/2.85,gameH/3);
    /*//Back to Game//*/    let idBtG = this.add.container(gameW/2,gameH/2);
    //--> Cambiar el rojo del play por verde
    /*//Volumen//*/         let vCtrl = this.add.container(gameW/2,gameH/2);
    vCtrl.setDepth(1);
    //Controles//           let ctrls = this.add.container(gameW/1.33,gameH/3+200);
    
    //BOTONES//
        //BACK TO MAIN MENU//
    let bBtMM = this.add.sprite(0,0, 'bBtMM').setInteractive();//Cambiar por bBtM
        bBtMM.setScale(0.5);   bBtMM.setAlpha(1);
        bBtMM.on('pointerdown', function (pointer) {
            bBtMM.setAlpha(0);   
            bBack.setAlpha(0);   bBtG.setAlpha(0);
            that.allVolButtons.forEach(button => { button.n.setAlpha(0); button.act.setAlpha(0); });
            bOpt.setAlpha(0);   
            mOpt.setAlpha(0);   mSnd.setAlpha(0);
            this.scene.resume('Offline');
            this.scene.resume('offInterface');
            this.scene.stop('Offline');
            this.scene.stop('offInterface');
            this.scene.switch('mainMenu');
            this.scene.stop('pauseMenu');
        }, this);
    bBtMM.setRotation(6.15);
    idBtM.add(bBtMM);   idBtM.setDepth(1);

        //BACK TO GAME//
    let bBtG = this.add.sprite(0,0, 'bCPly').setInteractive();
        bBtG.setAlpha(1);
        bBtG.on('pointerdown', function (pointer) { 
            this.setAlpha(0);
            bBack.setAlpha(0);   bBtMM.setAlpha(0);
            that.allVolButtons.forEach(button => { button.n.setAlpha(0); button.act.setAlpha(0); });
            bOpt.setAlpha(0);   
            mOpt.setAlpha(0);   mSnd.setAlpha(0);
            offGameScene.scene.resume();
            offInterface.scene.resume();
            /*this.scene.resume('offInterface');
            this.scene.resume('Offline');*/
        });
        idBtG.add(bBtG);   idBtG.setDepth(1);
        
    let bBack = this.add.sprite(0,0, 'bBack').setInteractive();
        bBack.setScale(0.5);   bBack.setAlpha(0);
        bBack.on('pointerdown', function (pointer) { 
            this.setAlpha(0);
            bBtG.setAlpha(1);   bBtMM.setAlpha(1);
            that.allVolButtons.forEach(button => { button.n.setAlpha(0); button.act.setAlpha(0); });
            bOpt.setAlpha(1);   
            mOpt.setAlpha(0.75);    mSnd.setAlpha(0);
        });
    bBack.setRotation(6.15);
    idBck.add(bBack);   idBck.setDepth(1);
        //SONIDO//
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
        //OPCIONES//
    let bOpt = this.add.sprite(0,0, 'bOptions').setInteractive();
        bOpt.setScale(0.5);    bOpt.setAlpha(1);
        bOpt.on('pointerdown', function (pointer){
            this.setAlpha(0);   
            bBack.setAlpha(1);  bBtG.setAlpha(0);
            that.allVolButtons.forEach(button => { button.n.setAlpha(1); });
            bBtMM.setAlpha(0);  
            mOpt.setAlpha(0);    mSnd.setAlpha(0.75);
        });
    bOpt.setRotation(6.15);
    idOpt.add(bOpt);    idOpt.setDepth(1);
        //PAUSE MENU//
    let mOpt = this.add.image(gameW/2,gameH/2,'optM');
        mOpt.setAlpha(0.75);   mOpt.setDepth(0);
        //SOUND MENU//
    let mSnd = this.add.image(gameW/2,gameH/2,'sndM');
        mSnd.setAlpha(0);   mSnd.setDepth(0);
    
    //this.mSTw = this.tweens.add(animBConfig(modSel,360,48000,false,-1));
    //Botón Opciones// --> Giro oscilatorio
    this.opTw  = this.tweens.add(animBConfig(idOpt,15,600,true,-1));
    //Botón Back// --> Giro oscilatorio
    this.bkTw  = this.tweens.add(animBConfig(idBck,15,600,true,-1));
    //Volver al menú// --> Giro oscilatorio
    this.bMTw  = this.tweens.add(animBConfig(idBtM,15,600,true,-1));
    //Volver al menú// --> Modifica escala
    this.bGTw  = this.tweens.add({
        targets: idBtG,
        scaleX: { value: 0.75, duration: 1000, yoyo: true, },
        scaleY: { value: 0.75, duration: 1000, yoyo: true, },
        repeat: -1
    });
};

pauseMenuScene.update = function(){
    
};