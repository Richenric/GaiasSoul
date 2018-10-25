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
    this.load.image('colDn','assets/sprites/cdSpIc.png');
    this.load.image('bgIn','assets/sprites/transBg.png');
};

//called once after the preload ends
offInterface.create = function(){
    let bg = this.add.sprite(0,0, 'bgIn');
    let gameW = this.sys.game.config.width;
	let gameH = this.sys.game.config.height;
    bg.setPosition(gameW/2,gameH/2);
    bg.setDepth(0);
    
    //CONTENEDORES// -- uno por jugador, y dentro uno por icono
        //JUGADOR 1//
    let j1 = this.add.container(gameW/8.5,gameH/1.1);
            //Proyectil J1// -- SUJETO DE PRUEBAS
        let shoot1 = this.add.container(-110,0);
        j1.add(shoot1);
            //Escudo J1//
        let guard1 = this.add.container(0,0);
        j1.add(guard1);
            //Zonal J1//
        let boom1 = this.add.container(110,0);
        j1.add(boom1);
    
        //JUGADOR 2//
    let j2 = this.add.container(gameW/1.133,gameH/1.1);
            //Proyectil J2//
        let shoot2 = this.add.container(110,0);
        j2.add(shoot2);
            //Escudo J2//
        let guard2 = this.add.container(0,0);
        j2.add(guard2);
            //Zonal J2//
        let boom2 = this.add.container(-110,0);
        j2.add(boom2);
    
    //ICONOS//
        //Proyectil Jugador 1//
    let pry1 = this.add.sprite(0,0,'pIc');
        shoot1.add(pry1);
    let pDis1 = this.add.sprite(0,0,'dis');
        pDis1.setAlpha(0.5);
        shoot1.add(pDis1);
    let pColD1 = this.add.sprite(0,0,'colDn');
        pColD1.setAlpha(0.75);
        pColD1.setScale(0);
        shoot1.add(pColD1);
    
    this.p1Tw = this.tweens.add({
        targets: pColD1,
        scaleX: { value: 1, duration: 2000, yoyo: false, },
        scaleY: { value: 1, duration: 2000, yoyo: false, },
    });
    
    //Escudo Jugador 1//
    let sh1 = this.add.sprite(0,0,'eIc');
        guard1.add(sh1);
    let eDis1 = this.add.sprite(0,0,'dis');
        eDis1.setAlpha(0.5);
        guard1.add(eDis1);
    let eColD1 = this.add.sprite(0,0,'colDn');
        eColD1.setAlpha(0.75);
        eColD1.setScale(0);
        guard1.add(eColD1);
    
    this.e1Tw = this.tweens.add({
        targets: eColD1,
        scaleX: { value: 1, duration: 2000, yoyo: false, },
        scaleY: { value: 1, duration: 2000, yoyo: false, },
    });
    
        //Zonal Jugador 1//
    let zon1 = this.add.sprite(0,0,'zIc');
        boom1.add(zon1);
    let zDis1 = this.add.sprite(0,0,'dis');
        zDis1.setAlpha(0.5);
        boom1.add(zDis1);
    let zColD1 = this.add.sprite(0,0,'colDn');
        zColD1.setAlpha(0.75);
        zColD1.setScale(0);
        boom1.add(zColD1);
    
    this.z1Tw = this.tweens.add({
        targets: zColD1,
        scaleX: { value: 1, duration: 2000, yoyo: false, },
        scaleY: { value: 1, duration: 2000, yoyo: false, },
    });
    
            //Proyectil Jugador 2//
    let pry2 = this.add.sprite(0,0,'pIc');
        shoot2.add(pry2);
    let pDis2 = this.add.sprite(0,0,'dis');
        pDis2.setAlpha(0.5);
        shoot2.add(pDis2);
    let pColD2 = this.add.sprite(0,0,'colDn');
        pColD2.setAlpha(0.75);
        pColD2.setScale(0);
        shoot2.add(pColD2);
    
    this.p2Tw = this.tweens.add({
        targets: pColD2,
        scaleX: { value: 1, duration: 2000, yoyo: false, },
        scaleY: { value: 1, duration: 2000, yoyo: false, },
    });
    
    //Escudo Jugador 2//
    let sh2 = this.add.sprite(0,0,'eIc');
        guard2.add(sh2);
    let eDis2 = this.add.sprite(0,0,'dis');
        eDis2.setAlpha(0.5);
        guard2.add(eDis2);
    let eColD2 = this.add.sprite(0,0,'colDn');
        eColD2.setAlpha(0.75);
        eColD2.setScale(0);
        guard2.add(eColD2);
    
    this.e2Tw = this.tweens.add({
        targets: eColD2,
        scaleX: { value: 1, duration: 2000, yoyo: false, },
        scaleY: { value: 1, duration: 2000, yoyo: false, },
    });
    
        //Zonal Jugador 2//
    let zon2 = this.add.sprite(0,0,'zIc');
        boom2.add(zon2);
    let zDis2 = this.add.sprite(0,0,'dis');
        zDis2.setAlpha(0.5);
        boom2.add(zDis2);
    let zColD2 = this.add.sprite(0,0,'colDn');
        zColD2.setAlpha(0.75);
        zColD2.setScale(0);
        boom2.add(zColD2);
    
    this.z2Tw = this.tweens.add({
        targets: zColD2,
        scaleX: { value: 1, duration: 2000, yoyo: false, },
        scaleY: { value: 1, duration: 2000, yoyo: false, },
    });
};

offInterface.update = function(){
    
};