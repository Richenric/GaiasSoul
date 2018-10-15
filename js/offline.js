//create new scene
var offGameScene = new Phaser.Scene('Offline');

console.log('Me he ejecutado yyaaay');

class Player extends Phaser.Physics.Arcade.Sprite{

    constructor (scene, x, y, texture, frame, cp){ //create player sprite (depth 1) if you don't set the body as active it won't collide with the world bounds
        super(scene, x, y, texture);//create player sprite (depth 1)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCircle(50);

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


        if (this.controlers[1].isDown){
            this.velocityX += -300;
            this.setVelocityX(this.velocityX); 
        }else if (this.controlers[3].isDown){
            this.velocityX +=  300;
            this.setVelocityX(this.velocityX);
        }
        if (this.controlers[0].isDown){
            this.velocityY += -300;
            this.setVelocityY(this.velocityY);
        }else if (this.controlers[2].isDown){
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
    }
}

offGameScene.init = function(){
};

//load assets
offGameScene.preload = function(){
	//load images
	this.load.image('background','assets/sprites/background.png');
	this.load.image('player','assets/sprites/player.png');
	this.load.image('enemy', 'assets/sprites/enemy.png')
    this.load.image('flares', 'assets/particles/red.png');
    this.load.atlas('sparks', 'assets/particles/flaresSheet.png', 'assets/particles/flares.json');
	this.load.audio('theme','assets/audio/Holfix-PixelParade.mp3');
};

//called once after the preload ends
offGameScene.create = function(){
	//create bg sprite (depth 0)
	let bg = this.add.sprite(0,0, 'background');

	let gameW = this.sys.game.config.width;
	let gameH = this.sys.game.config.height;
	bg.setPosition(gameW/2,gameH/2);
    bg.setDepth(0);
	console.log(bg);
	console.log(this);

    //Create controls
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    cursors = this.input.keyboard.createCursorKeys();
    console.log(cursors.up);

    var cp1 =  [cursors.up,cursors.left,cursors.down,cursors.right];
    var cp2 = [keyW,keyA,keyS,keyD];

    this.p1 = new Player(this, gameW/2+400, gameH/2, 'player', 'red', cp1);    
    console.log(this.p1.depth);
    console.log(bg.depth);
    this.p2 = new Player(this, gameW/2-400, gameH/2, 'player', 'yellow', cp2);
    

	this.physics.world.enable([ this.p1, this.p2 ]);

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
};

//this is called up to 60 times per second
offGameScene.update = function(){

	this.p1.update();
    this.p2.update();

    this.physics.world.collide(this.p1, this.p2);
};