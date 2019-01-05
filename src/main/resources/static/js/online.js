//De momento siguen estando los métodos:
//    activate(elemento, tag);
//    deactivate();
//    update(posx,posy,isDefense,isDead,habilidades(array));

//create new scene
var onGameScene = new Phaser.Scene('online');

onGameScene.init = function(){
    this.hasEnded = false;

    this.caption;
    
    //let players = new Array(playersNum);
    this.players = new Array(20);
    //////////////ME-OMITIR////////////////////////////////////////////////////////Se ha trasladado a 'onInterface.js'
    /*this.captionStyle = {
        fill: '#7fdbff',
        fontFamily: 'verdana',
        lineSpacing: 4,
        fontSize: 50
    };

    this.captionTextFormat = (
        '%1  :  ' +
        '%2\n'
    );*/
    //////////////END-ME////////////////////////////////////////////////////////
};

//load assets
onGameScene.preload = function(){
    //load images
    this.load.image('background','assets/sprites/background3.png');
    this.load.image('player','assets/sprites/player.png');
    this.load.image('red','assets/particles/AVerSiMeMuero2.0.png');
    this.load.image('yellow','assets/particles/yellow.png');
    this.load.image('enemy', 'assets/sprites/enemy.png');
    this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
    this.load.atlas('sparks', 'assets/particles/flaresSheet.png', 'assets/particles/flares.json');
    this.load.audio('theme2','assets/audio/8-Bit-Mayhem.mp3');
    this.load.image('escape','assets/sprites/exitButton.png');
    //////////////ME-SANCT////////////////////////////////////////////////////////Se trasladará a la clase sanctuary(...);
    this.load.image('sanctuaryFire','assets/sprites/sanctuaryFire.png');
    this.load.image('sanctuaryEarth','assets/sprites/sanctuaryEarth.png');
    this.load.image('sanctuaryMetal','assets/sprites/sanctuaryMetal.png');
    this.load.image('sanctuaryWater','assets/sprites/sanctuaryWater.png');
    this.load.image('sanctuaryWood','assets/sprites/sanctuaryWood.png');
    //////////////END-ME////////////////////////////////////////////////////////
    
};

//called once after the preload ends
onGameScene.create = function(){
    var that = this;
    
    //////////////ME-CAM////////////////////////////////////////////////////////
    //  Set the camera and physics bounds to be a greater size//
    let sceneW = 1920 * 6;
    let sceneH = 1080 * 6;
    this.cameras.main.setBounds(0, 0, sceneW, sceneH);
    this.physics.world.setBounds(0, 0, sceneW, sceneH);
    //////////////END-ME////////////////////////////////////////////////////////
    
    //Lanzamos la escena de interfaz sobre la de juego
    this.scene.launch(onInterface);
    
    //////////////ME-NEWBG////////////////////////////////////////////////////////Ampliación del Background
    let bg11 = this.add.image(0,0, 'background').setOrigin(0);
    bg11.setDepth(0);
    let bg21 = this.add.image(4096, 0, 'background').setOrigin(0).setFlipX(true);
    bg21.setDepth(0);
    let bg12 = this.add.image(0, 4096, 'background').setOrigin(0).setFlipY(true);
    bg12.setDepth(0);
    let bg22 = this.add.image(4096, 4096, 'background').setOrigin(0).setFlipX(true).setFlipY(true);
    bg22.setDepth(0);
    let bg13 = this.add.image(8192, 0, 'background').setOrigin(0).setFlipX(true);
    bg13.setDepth(0);
    let bg23 = this.add.image(8192, 4096, 'background').setOrigin(0).setFlipX(true).setFlipY(true);
    bg23.setDepth(0);
    //////////////END-ME////////////////////////////////////////////////////////
    
    //////////////ME-SANCT////////////////////////////////////////////////////////
    //ESTANDAR EN X ... y se fue a la puta con el seguno resize del escenario....
    /*let sacredFire = this.add.sprite(sceneW/2, sceneH/13.25, 'sanctuaryFire');
    let sacredEarth = this.add.sprite(sceneW/3, sceneH/13.25, 'sanctuaryEarth');
    let sacredMetal = this.add.sprite(sceneW/6, sceneH/13.25, 'sanctuaryMetal');
    let sacredWater = this.add.sprite(sceneW/1.5, sceneH/13.25, 'sanctuaryWater');
    let sacredWood = this.add.sprite(sceneW/1.20, sceneH/13.25, 'sanctuaryWood');*/
    //ESTANDAR EN Y ... y se fue a la puta con el seguno resize del escenario....
    /*let sacredFire = this.add.sprite(sceneW/6, sceneH/2, 'sanctuaryFire');
    let sacredEarth = this.add.sprite(sceneW/6, sceneH/3, 'sanctuaryEarth');
    let sacredMetal = this.add.sprite(sceneW/6, sceneH/6, 'sanctuaryMetal');
    let sacredWater = this.add.sprite(sceneW/6, sceneH/1.5, 'sanctuaryWater');
    let sacredWood = this.add.sprite(sceneW/6, sceneH/1.20, 'sanctuaryWood');*/
    
    let sacredFire = this.add.sprite(sceneW/2, sceneH/17.25, 'sanctuaryFire');
    sacredFire.setScale(1.5);
    let sacredEarth = this.add.sprite(sceneW/1.034, sceneH/3, 'sanctuaryEarth');
    sacredEarth.setScale(1.5);
    sacredEarth.setRotation(1.58);
    let sacredMetal = this.add.sprite(sceneW/1.5, sceneH/1.062, 'sanctuaryMetal');
    sacredMetal.setScale(1.5);
    let sacredWater = this.add.sprite(sceneW/3, sceneH/1.062, 'sanctuaryWater');
    sacredWater.setScale(1.5);
    let sacredWood = this.add.sprite(sceneW/31, sceneH/3, 'sanctuaryWood');
    sacredWood.setScale(1.5);
    sacredWood.setRotation(1.58);
    //////////////END-ME////////////////////////////////////////////////////////

    //this.input.setDefaultCursor('url(assets/cursors/invisible.cur), pointer');//DESCOMENTAR

    //Create controls//Pasan a ser parte de la clase del jugador ... nombre por definir??
       //PLAYER 1: B->escudo V->zonal Espacio->Disparo
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); 
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V); 
    keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    keySpace = this.input.keyboard.addKey(32);
    cp2 = [keyW,keyA,keyS,keyD,keyB,keyV,keySpace];
    ////El player 2 pa las vacas!!
       //PLAYER 2: Slas->escudo .->zonal Control->disparo
    curs = this.input.keyboard.createCursorKeys(); //Cursores
    keySlash = this.input.keyboard.addKey(189);
    keyPoint = this.input.keyboard.addKey(190);
    keyComma = this.input.keyboard.addKey(188);
    cp1 = [curs.up,curs.left,curs.down,curs.right,keyPoint,keyComma,keySlash];
        
        //MENU PAUSA//
    let escToPause = this.add.sprite(gameW/50,gameH/25, 'escape').setInteractive();
            escToPause.setAlpha(1);
        escToPause.on('pointerdown', function (pointer) {
            this.setAlpha(1);
            onInterface.scene.pause();
            onGameScene.scene.pause();
            onGameScene.scene.launch(pauseMenuScene);
        });
    
        //REINICIO JUEGO
    //////////////ME-OMITIR////////////////////////////////////////////////////////
    /*
    this.keyEnter = this.input.keyboard.addKey(13);
    */
    //////////////END-ME////////////////////////////////////////////////////////
    
//Inicializacion de jugadores
    //////////////ME-INITPLAYERS////////////////////////////////////////////////////////
    //let players = new Array(playersNum);
    //let players = new Array(20);
        this.players[0] = this.p1 = new Player(this, gameW/2-400, gameH/2, 'yellow', 'yellow', cp2, 'Jugador1', winningScore);
        this.players[1] = this.p2 = new Player(this, gameW/2+400, gameH/2, 'red', 'red', cp1, 'Jugador2', winningScore);    
    /*PARA RELLENAR CON LOS JUGADORES QUE LELLEGUEN DE ALGÚN LUGAR
    for (var i = 0; i < this.players.length; i++) {
        this.players[i] = new Player;
    }
    */
    //////////////END-ME////////////////////////////////////////////////////////
        
    //////////////ME-OMITIR////////////////////////////////////////////////////////Sustituido por lo de arriba
    /*
    this.p1 = new Player(this, gameW/2-400, gameH/2, 'yellow', 'yellow', cp2, 'Jugador1', winningScore);
    this.p2 = new Player(this, gameW/2+400, gameH/2, 'red', 'red', cp1, 'Jugador2', winningScore);
    */
    //////////////END-ME////////////////////////////////////////////////////////

    this.attacks = this.add.group();

    this.physics.world.enable([ this.p1, this.p2 ]);

    //////////////ME-OMITIR////////////////////////////////////////////////////////Se ha trasladado a 'onInterface.js'
    /*
    this.caption = this.add.text(gameW/2-80, gameH-75, '', this.captionStyle);
    */
    //////////////END-ME////////////////////////////////////////////////////////

    //////////////ME-INITCOLLIDERS////////////////////////////////////////////////////////
    //this.colliders = scene.add.group();
    //let colliders = new Array(playersNum);
    let colliders = new Array(2);
        colliders[0] = this.physics.add.overlap(this.p1, this.attacks, this.checkCollision, null, this);
        colliders[1] = this.physics.add.overlap(this.p2, this.attacks, this.checkCollision, null, this);
    /*PARA RELLENAR CON LOS JUGADORES QUE LELLEGUEN DE ALGÚN LUGAR
    for (var i = 0; i < colliders.length; i++) {
        colliders[i] = new ??;
    }
    */
    //////////////END-ME//////////////////////////////////////////
    //////////////ME-OMITIR////////////////////////////////////////////////////////Sustituido por lo de arriba
    /*
    var collider1 = this.physics.add.overlap(this.p1, this.p2.spells, this.checkCollision, null, this);
    var collider2 = this.physics.add.overlap(this.p2, this.p1.spells, this.checkCollision, null, this);
    */
    //////////////END-ME////////////////////////////////////////////////////////
    
    //MUSIC
    music = this.sound.add('theme2');
    //0.37
    var loopMarker = {
        name: 'loop',
        start: 0.00,
        duration: 87.00,
        config: {
            loop: true
        }
    };
    music.addMarker(loopMarker);
    music.play('loop', { delay: 0 });
    music.setVolume(volumen);
    
//////////////ME-CAM////////////////////////////////////////////////////////
    this.cameras.main.startFollow(this.p1, true, 1, 1);
//////////////END-ME////////////////////////////////////////////////////////
}

onGameScene.checkCollision=function(object1, object2){
        if(object1.tag != object2.tag && object1.tag == 'Jugador1' && !object1.isDefense && !object2.isZonal){
            this.p1.muero();
            if(this.p1.life > 1){
                this.p1.setPosition((Math.random() * (gameW - 115)), (Math.random() * ((gameH-115)-115) + 115));
                this.p1.life--;
            }else{
                this.p1.emmi.on = false;
                this.p1.isDead = true;
            }
            this.p2.score += 1;
            object2.emmi.on = false;
            object2.destroy();
        }else if(object1.tag != object2.tag && object1.tag == 'Jugador2' && !object1.isDefense && !object2.isZonal){
            this.p2.muero();
            if(this.p2.life > 1){
                this.p2.setPosition((Math.random() * ((gameW-115)-115) + 115), (Math.random() * ((gameH-115)-115) + 115));
                this.p2.life--;
            }else{
                this.p2.emmi.on = false;
                this.p2.isDead = true;
            }
            this.p1.score += 1;
            object2.emmi.on = false;
            object2.destroy();
        }else if(object1.tag != object2.tag && object1.tag == 'Jugador1' && !object1.isDefense && object2.isZonal){
            this.p1.muero();
            if(this.p1.life > 1){
                this.p1.setPosition((Math.random() * ((gameW-115)-115) + 115), (Math.random() * ((gameH-115)-115) + 115));
                this.p1.life--;
            }else{
                this.p1.emmi.on = false;
                this.p1.isDead = true;
            }
            this.p2.score += 1;
        }else if(object1.tag != object2.tag && object1.tag == 'Jugador2' && !object1.isDefense && object2.isZonal){
            this.p2.muero();
            if(this.p2.life > 1){
                this.p2.setPosition((Math.random() * ((gameW-115)-115) + 115), (Math.random() * ((gameH-115)-115) + 115));
                this.p2.life--;
            }else{
                this.p2.emmi.on = false;
                this.p2.isDead = true;
            }
            this.p1.score += 1;
        }
    }

//this is called up to 60 times per second
onGameScene.update = function(){
    //////////////ME-OMITIR////////////////////////////////////////////////////////Sustituir por lo de abajo??
    /*
    if(!this.p1.isDead){
        this.p1.update();
    }else{
        this.p1.effects.children.each(function (eff) {
                eff.emmi.on = false;
                onGameScene.p1.effects.remove(eff,onGameScene,true);
        },this);
        this.p1.emmi.on = false;
        this.p1.destroy();
        this.hasEnded = true;
    }
    if(!this.p2.isDead){
        this.p2.update();
    }else{
        this.p2.effects.children.each(function (eff) {
                eff.emmi.on = false;
                onGameScene.p2.effects.remove(eff,onGameScene,true);
        },this);
        this.p2.emmi.on = false;
        this.p2.destroy();
        this.hasEnded = true;
    }
    */
    //////////////END-ME////////////////////////////////////////////////////////
    //////////////ME-UPDATEPLAYER////////////////////////////////////////////////////////
    for (var i = 0; i < 2/*this.players.length*/; i++) {
        if(!this.players[i].isDead){
            this.players[i].update();
        }else{
            this.players[i].effects.children.each(function (eff) {
                    eff.emmi.on = false;
                    onGameScene.players[i].effects.remove(eff,onGameScene,true);
        },this);
        this.players[i].emmi.on = false;
        this.players[i].destroy();
        hasEnded = true;
        }
    }
    //////////////END-ME////////////////////////////////////////////////////////

    this.attacks.children.each(function (att) {
        if(att.iMayDie){
            onGameScene.attacks.remove(att,onGameScene,true); } //-COMO SE QUITA A UN CHILDREN DE SU PAPI?? -La unica solucion es matar muahahahah!
        else{ att.update(); }
    },this);
    
    //////////////ME-OMITIR////////////////////////////////////////////////////////Se ha trasladado a 'onInterface.js'
    /*    this.caption.setText(Phaser.Utils.String.Format(this.captionTextFormat, [
        this.p1.score,
        this.p2.score
    ]));*/
    //////////////END-ME////////////////////////////////////////////////////////

    if(this.hasEnded){
        if(this.keyEnter.isDown){
            music.stop('theme2');
            this.scene.restart();
        };
    }

    this.physics.world.collide(this.p1, this.p2);
};