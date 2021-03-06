//create new scene
var offGameScene = new Phaser.Scene('Offline');

offGameScene.init = function(){
    this.hasEnded = false;

    this.caption;

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
offGameScene.preload = function(){
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
};

//called once after the preload ends
offGameScene.create = function(){
    var that = this;
    //Lanzamos la escena de interfaz sobre la de juego
    this.scene.launch(offInterface);
    
    //create bg (depth 0)
    var bgPos = 670;
    var limW = gameW/337;
    var limH = gameH/337;
    
    for(i=0; i<limW; i++){
        for(j=0; j<limH; j++){
            let bg = this.add.sprite(i*bgPos,j*bgPos,'background');
            bg.setDepth(0);}}

    this.input.setDefaultCursor('url(assets/cursors/invisible.cur), pointer');

    //Create controls
       //PLAYER 1: B->escudo V->zonal Espacio->Disparo
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); 
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V); 
    keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    keySpace = this.input.keyboard.addKey(32);
    cp2 = [keyW,keyA,keyS,keyD,keyB,keyV,keySpace];
    
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
            offInterface.scene.pause();
            offGameScene.scene.pause();
            offGameScene.scene.launch(pauseMenuScene);
        });
        //REINICIO JUEGO
    this.keyEnter = this.input.keyboard.addKey(13);
    
    //Inicializacion de jugadores
    this.p1 = new Player(this, gameW/2-400, gameH/2, 'yellow', 'yellow', 'Jugador1', false, cp2, winningScore);
    this.p2 = new Player(this, gameW/2+400, gameH/2, 'red', 'red', 'Jugador2', false, cp1, winningScore);    

    this.physics.world.enable([ this.p1, this.p2 ]);

    this.caption = this.add.text(gameW/2-80, gameH-75, '', this.captionStyle);

    var collider1 = this.physics.add.overlap(this.p1, this.p2.spells, this.checkCollision, null, this);

    var collider2 = this.physics.add.overlap(this.p2, this.p1.spells, this.checkCollision, null, this);

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
}

offGameScene.checkCollision=function(object1, object2){
        if(object1.tag != object2.tag && object1.tag == 'Jugador1' && !object1.isDefense && object2.spellType == 0){
            this.p1.muero();
            if(this.p1.life > 1){
                this.p1.setPosition((Math.random() * ((gameW-115)-115) + 115), (Math.random() * ((gameH-115)-115) + 115));
                this.p1.life--;
            }else{
                this.p1.emmi.on = false;
                this.p1.isDead = true;
            }
            this.p2.score += 1;
            object2.emmi.on = false;
            object2.destroy();
        }else if(object1.tag != object2.tag && object1.tag == 'Jugador2' && !object1.isDefense && object2.spellType == 0){
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
        }else if(object1.tag != object2.tag && object1.tag == 'Jugador1' && !object1.isDefense && object2.spellType == 1){
            this.p1.muero();
            if(this.p1.life > 1){
                this.p1.setPosition((Math.random() * ((gameW-115)-115) + 115), (Math.random() * ((gameH-115)-115) + 115));
                this.p1.life--;
            }else{
                this.p1.emmi.on = false;
                this.p1.isDead = true;
            }
            this.p2.score += 1;
        }else if(object1.tag != object2.tag && object1.tag == 'Jugador2' && !object1.isDefense && object2.spellType == 1){
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
offGameScene.update = function(){
    if(!this.p1.isDead){
        this.p1.update();
    }else{
        this.p1.effects.children.each(function (eff) {
                eff.emmi.on = false;
                offGameScene.p1.effects.remove(eff,offGameScene,true);
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
                offGameScene.p2.effects.remove(eff,offGameScene,true);
        },this);
        this.p2.emmi.on = false;
        this.p2.destroy();
        this.hasEnded = true;
    }
    
    this.caption.setText(Phaser.Utils.String.Format(this.captionTextFormat, [
        this.p1.score,
        this.p2.score
    ]));

    if(this.hasEnded){
        if(this.keyEnter.isDown){
            music.stop('theme2');
            this.scene.restart();
        };
    }

    this.physics.world.collide(this.p1, this.p2);
};