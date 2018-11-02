//create new scene
var offGameScene = new Phaser.Scene('Offline');

offGameScene.init = function(){
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
    this.load.audio('theme','assets/audio/Holfix-PixelParade.mp3');
};
//called once after the preload ends
offGameScene.create = function(){
    var that = this;
    //Lanzamos la escena de interfaz sobre la de juego
    this.scene.launch(offInterface);
    
    //create bg sprite (depth 0)
    let bg = this.add.sprite(0,0, 'background');

    bg.setPosition(gameW/2,gameH/2);
    bg.setDepth(0);
    console.log(bg);
    console.log(offGameScene);

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
    keyShR = this.input.keyboard.addKey(16);
    cp1 = [curs.up,curs.left,curs.down,curs.right,keySlash,keyPoint,keyShR];
    
    //Inicializacion de jugadores
    this.p1 = new Player(this, gameW/2-400, gameH/2, 'yellow', 'yellow', cp2, 'Jugador1');
    this.p2 = new Player(this, gameW/2+400, gameH/2, 'red', 'red', cp1, 'Jugador2');    

    this.attacks = this.add.group();

    this.physics.world.enable([ this.p1, this.p2 ]);

    this.caption = this.add.text(gameW/2-80, gameH-75, '', this.captionStyle);

    var collider1 = this.physics.add.overlap(this.p1, this.attacks, this.checkCollision, null, this);

    var collider2 = this.physics.add.overlap(this.p2, this.attacks, this.checkCollision, null, this);

    //MUSIC
    var music = this.sound.add('theme');
    //0.37
    var loopMarker = {
        name: 'loop',
        start: 12.00,
        duration: 120.00,
        config: {
            loop: true
        }
    };

    music.addMarker(loopMarker);

    music.play('loop', {
        delay: 0
    });
}

offGameScene.checkCollision=function(object1, object2){
        if(object1.tag != object2.tag && object1.tag == 'Jugador1' && !object1.isDefense){
            this.p1.muero();
            this.p1.setPosition((Math.random() * ((gameW-115)-115) + 115), (Math.random() * ((gameH-115)-115) + 115));
            console.log(this.p1.x + ", "+this.p1.y);
            this.p2.score += 1;
            object2.emmi.on = false;
            object2.destroy();
        }else if(object1.tag != object2.tag && object1.tag == 'Jugador2' && !object1.isDefense){
            this.p2.muero();
            this.p2.setPosition((Math.random() * ((gameW-115)-115) + 115), (Math.random() * ((gameH-115)-115) + 115));
            this.p1.score += 1;
            object2.emmi.on = false;
            object2.destroy();
        }
    }

//this is called up to 60 times per second
offGameScene.update = function(){
    this.p1.update();
    this.p2.update();

    this.attacks.children.each(function (att) {
        if(att.iMayDie){
            offGameScene.attacks.remove(att,offGameScene,true); } //-COMO SE QUITA A UN CHILDREN DE SU PAPI?? -La unica solucion es matar muahahahah!
        else{ att.update(); }
    },this);
    
    this.caption.setText(Phaser.Utils.String.Format(this.captionTextFormat, [
        this.p1.score,
        this.p2.score
    ]));
    this.physics.world.collide(this.p1, this.p2);
};