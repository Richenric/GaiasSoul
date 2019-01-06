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
    this.load.image('projectileIcon','assets/sprites/pSpIc.png');
    this.load.image('shieldIcon','assets/sprites/eSpIc.png');
    this.load.image('disableFilter','assets/sprites/disSpIc.png');
    this.load.image('cooldownFilterP1','assets/sprites/cdSpIc1alternativo.png');
    this.load.image('player1','assets/sprites/player1.png');
    this.load.image('player1wins','assets/sprites/player1wins.png');
    this.load.image('bgIn','assets/sprites/transBg.png');
};

//called once after the preload ends
onInterface.create = function(){
    let bg = this.add.sprite(0,0, 'bgIn');
    let gameW = this.sys.game.config.width;
	let gameH = this.sys.game.config.height;
    bg.setPosition(gameW/2,gameH/2);
    bg.setDepth(0);

    this.presentation = 120;
    
    //CONTENEDORES// -- uno por jugador, y dentro uno por icono
        //JUGADOR 1//
    this.j1 = this.add.container(gameW/8.5,gameH/1.1);
    //this.j1 = this.add.container(gameW/2,gameH/1.1);    //Al haber solo un jugador dejamos los iconos
                                                        //  de habilidad en el centro de la pantalla??
                                                        //Modificar el marcador para que forme parte del onInterface.js, y no del online.js, como pasaba en el modo offline.
            //Proyectil J1// -- SUJETO DE PRUEBAS
        this.shoot1 = this.add.container(-110,0);
        this.j1.add(this.shoot1);
            //Escudo J1//
        this.guard1 = this.add.container(0,0);
        this.j1.add(this.guard1);
            //Zonal J1//
        this.boom1 = this.add.container(110,0);
        this.j1.add(this.boom1);
    
    //ICONOS//
        //Proyectil Jugador 1//
    let pry1 = this.add.sprite(0,0,'projectileIcon');
        pry1.setScale(0.5);
        pry1.setAlpha(0.75);
        this.shoot1.add(pry1);
    let pDis1 = this.add.sprite(0,0,'disableFilter');
        pDis1.setScale(0.5);
        pDis1.setAlpha(0.5);
        this.shoot1.add(pDis1);
    let pColD1 = this.add.sprite(0,0,'cooldownFilterP1');
        pColD1.setAlpha(0.75);
        pColD1.setScale(0);
        pColD1.setBlendMode('MULTIPLY');
        this.shoot1.add(pColD1);
    
    this.p1Tw = this.tweens.add({
        targets: pColD1,
        scaleX: { value: 0.5, duration: 5000, yoyo: false, },
        scaleY: { value: 0.5, duration: 5000, yoyo: false, },
    });
    
    //Escudo Jugador 1//
    let sh1 = this.add.sprite(0,0,'shieldIcon');
        sh1.setScale(0.5);
        sh1.setAlpha(0.75);
        this.guard1.add(sh1);
    let eDis1 = this.add.sprite(0,0,'disableFilter');
        eDis1.setScale(0.5);
        eDis1.setAlpha(0.5);
        this.guard1.add(eDis1);
    let eColD1 = this.add.sprite(0,0,'cooldownFilterP1');
        eColD1.setAlpha(0.75);
        eColD1.setScale(0);
        eColD1.setBlendMode('MULTIPLY');
        this.guard1.add(eColD1);
    
    this.e1Tw = this.tweens.add({
        targets: eColD1,
        scaleX: { value: 0.5, duration: 1000, yoyo: false, },
        scaleY: { value: 0.5, duration: 1000, yoyo: false, },
    });
    
        //Zonal Jugador 1//
    let zon1 = this.add.sprite(0,0,'zonalIcon');
        zon1.setScale(0.5);
        zon1.setAlpha(0.75);
        this.boom1.add(zon1);
    let zDis1 = this.add.sprite(0,0,'disableFilter');
        zDis1.setAlpha(0.5);
        zDis1.setScale(0.5);
        this.boom1.add(zDis1);
    let zColD1 = this.add.sprite(0,0,'cooldownFilterP1');
        zColD1.setAlpha(0.75);
        zColD1.setScale(0);
        zColD1.setBlendMode('MULTIPLY');
        this.boom1.add(zColD1);
    
    this.z1Tw = this.tweens.add({
        targets: zColD1,
        scaleX: { value: 0.5, duration: 1000, yoyo: false, },
        scaleY: { value: 0.5, duration: 1000, yoyo: false, },
    });
    
            //Proyectil Jugador 2//
    
    this.player1 = this.add.sprite(gameW/2-400, gameH/2-100, 'player1').setAlpha(1);
    this.player1wins = this.add.sprite(gameW/2, gameH/2-20, 'player1wins').setAlpha(0);
    this.player2wins = this.add.sprite(gameW/2, gameH/2-20, 'player2wins').setAlpha(0);////GAMEOVER
    onGameScene.caption = this.add.text(gameW/2-80, gameH-75, '', this.captionStyle);
};

onInterface.update = function(){
    if(this.presentation >= 0){
        console.log("Hola papu");
        if(this.presentation <=30){
            this.player1.setAlpha(Math.min(this.presentation/30,1));
        }
        this.presentation--;
    }

    if(onGameScene.p1.isDead){
        this.player2wins.setAlpha(1);////GAMEOVER
    }else if(onGameScene.p2.isDead){
        this.player1wins.setAlpha(1);
    }

    onGameScene.caption.setText(Phaser.Utils.String.Format(this.captionTextFormat, [
        onGameScene.p1.score,
        onGameScene.p2.score
    ]));
    this.shoot1.getAt(2).setScale(Math.min((onGameScene.p1.allCd[1]/60)/2,0.5),Math.min((onGameScene.p1.allCd[1]/60)/2,0.5));
    this.guard1.getAt(2).setScale(Math.min((onGameScene.p1.allCd[2]/480)/2,0.5),Math.min((onGameScene.p1.allCd[2]/480)/2,0.5));
    this.boom1.getAt(2).setScale(Math.min((onGameScene.p1.allCd[0]/120)/2,0.5),Math.min((onGameScene.p1.allCd[0]/120)/2,0.5));
};
