//Create new scene
let offInterface = new Phaser.Scene('offInterface');

offInterface.init = function(){
    
};

//load assets
offInterface.preload = function(){
    this.load.image('zIc','assets/sprites/zSpIc.png');
    this.load.image('pIc','assets/sprites/pSpIc.png');
    this.load.image('eIc','assets/sprites/eSpIc.png');
    this.load.image('dis','assets/sprites/disSpIc.png');
    this.load.image('colDn1','assets/sprites/cdSpIc1alternativo.png');
    this.load.image('colDn2','assets/sprites/cdSpIc2alternativo.png');
    this.load.image('player1','assets/sprites/player1.png');
    this.load.image('player1wins','assets/sprites/player1wins.png');
    this.load.image('player2','assets/sprites/player2.png');
    this.load.image('player2wins','assets/sprites/player2wins.png');
    this.load.image('bgIn','assets/sprites/transBg.png');
};

//called once after the preload ends
offInterface.create = function(){
    let bg = this.add.sprite(0,0, 'bgIn');
    let gameW = this.sys.game.config.width;
	let gameH = this.sys.game.config.height;
    bg.setPosition(gameW/2,gameH/2);
    bg.setDepth(0);

    this.presentation = 120;
    
    //CONTENEDORES// -- uno por jugador, y dentro uno por icono
        //JUGADOR 1//
    this.j1 = this.add.container(gameW/8.5,gameH/1.1);
            //Proyectil J1// -- SUJETO DE PRUEBAS
        this.shoot1 = this.add.container(-110,0);
        this.j1.add(this.shoot1);
            //Escudo J1//
        this.guard1 = this.add.container(0,0);
        this.j1.add(this.guard1);
            //Zonal J1//
        this.boom1 = this.add.container(110,0);
        this.j1.add(this.boom1);
    
        //JUGADOR 2//
    this.j2 = this.add.container(gameW/1.133,gameH/1.1);
            //Proyectil J2//
        this.shoot2 = this.add.container(110,0);
        this.j2.add(this.shoot2);
            //Escudo J2//
        this.guard2 = this.add.container(0,0);
        this.j2.add(this.guard2);
            //Zonal J2//
        this.boom2 = this.add.container(-110,0);
        this.j2.add(this.boom2);
    
    //ICONOS//
        //Proyectil Jugador 1//
    let pry1 = this.add.sprite(0,0,'pIc');
        pry1.setScale(0.5);
        pry1.setAlpha(0.75);
        this.shoot1.add(pry1);
    let pDis1 = this.add.sprite(0,0,'dis');
        pDis1.setScale(0.5);
        pDis1.setAlpha(0.5);
        this.shoot1.add(pDis1);
    let pColD1 = this.add.sprite(0,0,'colDn1');
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
    let sh1 = this.add.sprite(0,0,'eIc');
        sh1.setScale(0.5);
        sh1.setAlpha(0.75);
        this.guard1.add(sh1);
    let eDis1 = this.add.sprite(0,0,'dis');
        eDis1.setScale(0.5);
        eDis1.setAlpha(0.5);
        this.guard1.add(eDis1);
    let eColD1 = this.add.sprite(0,0,'colDn1');
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
    let zon1 = this.add.sprite(0,0,'zIc');
        zon1.setScale(0.5);
        zon1.setAlpha(0.75);
        this.boom1.add(zon1);
    let zDis1 = this.add.sprite(0,0,'dis');
        zDis1.setAlpha(0.5);
        zDis1.setScale(0.5);
        this.boom1.add(zDis1);
    let zColD1 = this.add.sprite(0,0,'colDn1');
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
    let pry2 = this.add.sprite(0,0,'pIc');
        pry2.setScale(0.5);
        pry2.setAlpha(0.75);
        this.shoot2.add(pry2);
    let pDis2 = this.add.sprite(0,0,'dis');
        pDis2.setAlpha(0.5);
        pDis2.setScale(0.5);
        this.shoot2.add(pDis2);
    let pColD2 = this.add.sprite(0,0,'colDn2');
        pColD2.setAlpha(0.75);
        pColD2.setScale(0);
        pColD2.setBlendMode('MULTIPLY');
        this.shoot2.add(pColD2);
    
    this.p2Tw = this.tweens.add({
        targets: pColD2,
        scaleX: { value: 0.5, duration: 500, yoyo: false, },
        scaleY: { value: 0.5, duration: 500, yoyo: false, },
    });
    
    //Escudo Jugador 2//
    let sh2 = this.add.sprite(0,0,'eIc');
        sh2.setScale(0.5);
        sh2.setAlpha(0.75);
        this.guard2.add(sh2);
    let eDis2 = this.add.sprite(0,0,'dis');
        eDis2.setAlpha(0.5);
        eDis2.setScale(0.5);
        this.guard2.add(eDis2);
    let eColD2 = this.add.sprite(0,0,'colDn2');
        eColD2.setAlpha(0.75);
        eColD2.setScale(0);
        eColD2.setBlendMode('MULTIPLY');
        this.guard2.add(eColD2);
    
    this.e2Tw = this.tweens.add({
        targets: eColD2,
        scaleX: { value: 0.5, duration: 1000, yoyo: false, },
        scaleY: { value: 0.5, duration: 1000, yoyo: false, },
    });
    
        //Zonal Jugador 2//
    let zon2 = this.add.sprite(0,0,'zIc');
        zon2.setScale(0.5);
        zon2.setAlpha(0.75);
        this.boom2.add(zon2);
    let zDis2 = this.add.sprite(0,0,'dis');
        zDis2.setAlpha(0.5);
        zDis2.setScale(0.5);
        this.boom2.add(zDis2);
    let zColD2 = this.add.sprite(0,0,'colDn2');
        zColD2.setAlpha(0.75);
        zColD2.setScale(0);
        zColD2.setBlendMode('MULTIPLY');
        this.boom2.add(zColD2);
    
    this.z2Tw = this.tweens.add({
        targets: zColD2,
        scaleX: { value: 0.5, duration: 1000, yoyo: false, },
        scaleY: { value: 0.5, duration: 1000, yoyo: false, },
    });

    this.player1 = this.add.sprite(gameW/2-400, gameH/2-100, 'player1').setAlpha(1);
    this.player2 = this.add.sprite(gameW/2+400, gameH/2-100, 'player2').setAlpha(1);
    this.player1wins = this.add.sprite(gameW/2, gameH/2-20, 'player1wins').setAlpha(0);
    this.player2wins = this.add.sprite(gameW/2, gameH/2-20, 'player2wins').setAlpha(0);
};

offInterface.update = function(){
    if(this.presentation >= 0){
        console.log("Hola papu");
        if(this.presentation <=30){
            this.player1.setAlpha(Math.min(this.presentation/30,1));
            this.player2.setAlpha(Math.min(this.presentation/30,1));
        }
        this.presentation--;
    }

    if(offGameScene.p1.isDead){
        this.player2wins.setAlpha(1);
    }else if(offGameScene.p2.isDead){
        this.player1wins.setAlpha(1);
    }

    this.shoot1.getAt(2).setScale(Math.min((offGameScene.p1.allCd[1]/60)/2,0.5),Math.min((offGameScene.p1.allCd[1]/60)/2,0.5));
    this.guard1.getAt(2).setScale(Math.min((offGameScene.p1.allCd[2]/480)/2,0.5),Math.min((offGameScene.p1.allCd[2]/480)/2,0.5));
    this.boom1.getAt(2).setScale(Math.min((offGameScene.p1.allCd[0]/120)/2,0.5),Math.min((offGameScene.p1.allCd[0]/120)/2,0.5));
    this.shoot2.getAt(2).setScale(Math.min((offGameScene.p2.allCd[1]/60)/2,0.5),Math.min((offGameScene.p2.allCd[1]/60)/2,0.5));
    this.guard2.getAt(2).setScale(Math.min((offGameScene.p2.allCd[2]/480)/2,0.5),Math.min((offGameScene.p2.allCd[2]/480)/2,0.5));
    this.boom2.getAt(2).setScale(Math.min((offGameScene.p2.allCd[0]/120)/2,0.5),Math.min((offGameScene.p2.allCd[0]/120)/2,0.5));
};