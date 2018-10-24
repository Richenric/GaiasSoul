//create new scene
var offGameScene = new Phaser.Scene('Offline');

class Disparo extends Phaser.Physics.Arcade.Sprite{
    constructor (scene, x, y, texture, frame, tag){
        super(scene, x, y, texture);
        scene.add.existing(this).setScale(0.25,0.25);
        scene.physics.add.existing(this);
        this.setCircle(50);

        this.tag = tag;
        //console.log(this.tag);

        this.emmi = scene.add.particles('sparks').createEmitter({
            frame: frame,
            lifespan: 750,
            speed: { min: 10, max: 25 },
            scale: { start: 0.25, end: 0, ease: 'Quad.easeOut' },
            //alpha: { start: 1, end: 0, ease: 'Circ.easeIn'},
            quantity: 2,
            blendMode: 'ADD',
            quantity: 2,
            follow: this
        });

        this.depth = 1;
        this.alpha = 0;
        this.setScale(0.25,0.25);
        this.setBlendMode('ADD');
        this.lifeTime = 100;
        this.iMayDie = false;
    };
    update(){
            this.lifeTime--;
        if(this.lifeTime <=0){
            this.emmi.on = false;
            this.iMayDie = true;
        }
    };
};

class Zonal extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x, y, texture,frame, tag){
        super(scene, x, y, texture);
        scene.add.existing(this).setOrigin(0.5);
        scene.physics.add.existing(this);
        
        this.emmi = scene.add.particles('sparks').createEmitter({
            frame: frame,
            lifespan: { min: 600, max: 800 },
            x:x, y:y,
            speed: 200,
            scale: { start: 0.2, end: 0.1 },
            angle: { start: 0, end: 360, steps: 64 }, //Steps permite que se haga de manera ordenada y en circulo
            frequency: 32,
            blendMode: 'ADD',
            quantity: 64,
            //on: false,
            //follow: this
        });
        
        this.setCircle(100,-50,-50);
        this.alpha = 0;

        this.tag = tag;
        this.lifeTime = 30;
        this.iMayDie = false;
    };
    update(){
            this.lifeTime--;
        if(this.lifeTime <=0){//si llega a 0 se hace desaparecer el zonal
            this.emmi.on = false;
            this.iMayDie = true;//y se permite la creacion de otro zonal
        }
    };
}

class Player extends Phaser.Physics.Arcade.Sprite{

    constructor (scene, x, y, texture, frame, cp, tag){ //create player sprite (depth 1) if you don't set the body as active it won't collide with the world bounds
        super(scene, x, y, texture);//create player sprite (depth 1)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCircle(50);

        this.tag = tag;

        this.score = 0;

        scene.particles = scene.add.particles('sparks');
        scene.particles.createEmitter({
            frame: frame,                                                                             
            lifespan: 750,
            speed: { min: 10, max: 25 },
            scale: { start: 0.5, end: 0, ease: 'Quad.easeOut' },
            //alpha: { start: 1, end: 0, ease: 'Circ.easeIn'},
            quantity: 2,
            blendMode: 'ADD',
            quantity: 2,
            follow: this
        });

        this.velocityX = 0; //Variable que contiene la velocidad pero no la aplica
        this.velocityY = 0;
        this.controlers = [];

        this.myAttacks = [0,0,0];
        this.zonalCreado = false;
        this.allCd = [120,60,0];
        this.frpost = frame;

        this.depth = 1;
        this.alpha = 1;
        this.setScale(0.5,0.5);
        this.setBlendMode('ADD'),
        this.controlers = cp;
        this.setCollideWorldBounds(true);
    }
    update(){
        this.velocityX = Math.min(this.velocityX, 300);
        this.velocityX = Math.max(this.velocityX,-300);
        this.velocityY = Math.min(this.velocityY, 300);
        this.velocityY = Math.max(this.velocityY,-300);
        this.setVelocity(this.velocityX,this.velocityY);

        if (this.controlers[1].isDown){//LEFT
            this.velocityX += -300;
            this.setVelocityX(this.velocityX); 
        }else if (this.controlers[3].isDown){//RIGHT
            this.velocityX +=  300;
            this.setVelocityX(this.velocityX);
        }
        if (this.controlers[0].isDown){//UP
            this.velocityY += -300;
            this.setVelocityY(this.velocityY);
        }else if (this.controlers[2].isDown){//DOWN
            this.velocityY +=  300;
            this.setVelocityY(this.velocityY);
        }
        if (this.velocityX>0)
            this.velocityX += -7.5;
        else if (this.velocityX<0)
            this.velocityX +=  7.5;
    
        if (this.velocityY>0)
            this.velocityY += -7.5;
        else if (this.velocityY<0)
            this.velocityY +=  7.5;

        //DISPARO
        for(var i=0;i<4;i++) this.allCd[i] += 1;
        if (this.controlers[6].isDown && this.allCd[1] >= 60){
            //this.input.mouse.requestPointerLock();
            if(this.velocityX !== 0 || this.velocityY !== 0){
                var disparo = new Disparo(this.scene, this.x, this.y, 'enemy', this.frpost, this.tag);
                
                if (this.velocityX > 0) {
                    disparo.setVelocityX(Math.min(Math.max((this.velocityX*3), 10), 900));
                }else if (this.velocityX < 0){
                    disparo.setVelocityX(Math.max(Math.min((this.velocityX*3), -10), -900));
                }
                //disparo.setVelocityX(Math.max((offGameScene.p1.velocityX*3),50));

                if (this.velocityY > 0) {
                    disparo.setVelocityY(Math.min(Math.max((this.velocityY*3), 10), 900));
                }else if (this.velocityY < 0){
                    disparo.setVelocityY(Math.max(Math.min((this.velocityY*3), -10), -900));
                }
                //disparo.setVelocityY(Math.max((offGameScene.p1.velocityY*3),50));
                this.scene.attacks.add(disparo);
                this.allCd[1] = 0;
            }
        }
        //ZONAL
        if (this.controlers[5].isDown && this.allCd[0] >=120){ //ZONAL
            var zonal = new Zonal(this.scene, this.x, this.y, 'enemy', this.frpost, this.tag);
            this.scene.attacks.add(zonal);
            this.allCd[0] = 0;
        }
    }
}

offGameScene.init = function(){
    //this.attacks = [];

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
    this.load.image('red','assets/particles/red.png');
    this.load.image('enemy', 'assets/sprites/enemy.png');
    this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
    this.load.atlas('sparks', 'assets/particles/flaresSheet.png', 'assets/particles/flares.json');
    this.load.audio('theme','assets/audio/Holfix-PixelParade.mp3');
};

//called once after the preload ends
offGameScene.create = function(){
    var that = this;
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
    cp1 = [curs.up,curs.left,curs.down,curs.right,curs,keyPoint,keyShR];
    
    //Inicializacion de jugadores
    this.p1 = new Player(this, gameW/2-400, gameH/2, 'player', 'yellow', cp2, 'Jugador1');
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
        console.log("inside");
        if(object1.tag != object2.tag && object1.tag == 'Jugador1'){
            this.p1.setPosition(gameW/2-400, gameH/2);
            this.p2.score += 1;
            object2.emmi.on = false;
            object2.destroy();
        }else if(object1.tag != object2.tag && object1.tag == 'Jugador2'){
            this.p2.setPosition(gameW/2+400, gameH/2);
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
            console.log("HOLA MUY BUENAS PASO POR AQUI ");
            offGameScene.attacks.remove(att,offGameScene,true); } //-COMO SE QUITA A UN CHILDREN DE SU PAPI?? -La unica solucion es matar muahahahah!
        else{ att.update(); }
    },this);
    
    this.caption.setText(Phaser.Utils.String.Format(this.captionTextFormat, [
        this.p1.score,
        this.p2.score
    ]));

    this.physics.world.collide(this.p1, this.p2);
};