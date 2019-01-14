//Create new scene
let onInterface = new Phaser.Scene('onInterface');

onInterface.init = function(){

    this.captionStyle = {
        fill: '#7fdbff',
        fontFamily: 'verdana',
        lineSpacing: 4,
        fontSize: 50
    };

    this.captionTextFormat = (
        '%1  :  ' +
        '%2\n'
    );
};

//load assets
onInterface.preload = function(){
    this.load.image('zonalIcon','assets/sprites/zSpIc.png');
    this.load.image('projecIcon','assets/sprites/pSpIc.png');
    this.load.image('shieldIcon','assets/sprites/eSpIc.png');
    this.load.image('disableFilter','assets/sprites/disSpIc.png');
    this.load.image('cooldownFilter','assets/sprites/cdSpIc1alternativo.png');
    this.load.image('player1','assets/sprites/player1.png');
    this.load.image('bgIn','assets/sprites/transBg.png');
};

//called once after the preload ends
onInterface.create = function(){
    let bg = this.add.sprite(0,0, 'bgIn');
    let gameW = this.sys.game.config.width;
	let gameH = this.sys.game.config.height;
    bg.setPosition(gameW/2,gameH/2);
    bg.setDepth(0);
    this.j = this.add.container(gameW/2,gameH/1.1);//Contenedor JUGADOR //8.5   
    this.shootContainer = this.add.container(-110,0);  //Contenedor Proyectil
    this.j.add(this.shootContainer);
    this.shieldContainer = this.add.container(0,0);//ContenedorEscudo
    this.j.add(this.shieldContainer);
    this.zonalContainer = this.add.container(110,0);//Contenedor Zonal
    this.j.add(this.zonalContainer);
    
    //ICONOS//
    this.proyecTweens;
    this.shieldTweens;
    this.zonalTweens;
        
    function initGenericButton(alpha, scale, image, container, that, blendMode){
    	let buttonGeneric = that.add.sprite(0,0,image);
    	buttonGeneric.setScale(scale);
    	buttonGeneric.setAlpha(alpha);
    	if(blendMode)buttonGeneric.setBlendMode('MULTIPLY');
    	return buttonGeneric;
    }
    
    function initIcon(image, container, that, tweens,duration){
    	container.add(initGenericButton(0.75,0.5,image,container,that, false));
    	container.add(initGenericButton(0.5,0.5,'disableFilter',container,that, false));
    	let CD = initGenericButton(0.75,0,'cooldownFilter',container,that, true);
    	container.add(CD);
    	tweens = that.tweens.add({
            targets: CD,
            scaleX: { value: 0.5, duration: duration, yoyo: false, },
            scaleY: { value: 0.5, duration: duration, yoyo: false, }
        });
    }
    initIcon('projecIcon',this.shootContainer, this,this.proyecTweens,5000);//Icono Proyectil
    initIcon('shieldIcon',this.shieldContainer,this,this.shieldTweens,1000);//Icono Escudo
    initIcon('zonalIcon', this.zonalContainer, this,this.zonalTweens, 1000);//Icono Zonal
};

onInterface.update = function(){
    /*if(this.presentation >= 0){
        console.log("Hola papu");
        if(this.presentation <=30){
            this.player1.setAlpha(Math.min(this.presentation/30,1));
        }
        this.presentation--;
    } 
    if(onGameScene.player.isDead){
        ////GAMEOVER
    }

    onGameScene.caption.setText(Phaser.Utils.String.Format(this.captionTextFormat, [
        onGameScene.p1.score,
        onGameScene.p2.score
    ])); */
    this.shootContainer.getAt(2).setScale(Math.min((onGameScene.player.allCd[1]/60)/2,0.5),Math.min((onGameScene.player.allCd[1]/60)/2,0.5));
    this.shieldContainer.getAt(2).setScale(Math.min((onGameScene.player.allCd[2]/480)/2,0.5),Math.min((onGameScene.player.allCd[2]/480)/2,0.5));
    this.zonalContainer.getAt(2).setScale(Math.min((onGameScene.player.allCd[0]/120)/2,0.5),Math.min((onGameScene.player.allCd[0]/120)/2,0.5));
};

