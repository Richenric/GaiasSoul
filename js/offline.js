//create new scene
var offGameScene = new Phaser.Scene('Offline');

console.log('Me he ejecutado yyaaay');

function Player (){
    var that = this;
    this.p = null;
    this.velocityX = 0; //Variable que contiene la velocidad pero no la aplica
    this.velocityY = 0;
    this.controlers = [];
    this.create = function(gW,gH,cp){ //create player sprite (depth 1) if you don't set the body as active it won't collide with the world bounds
        that.p = offGameScene.physics.add.sprite(gW,gH, 'player');//create player sprite (depth 1)
        that.p.depth = 1;
        that.p.setScale(1,1);
        that.p.controlers = cp;
        that.p.setCollideWorldBounds(true);    
    }

    this.update = function(){
        that.velocityX = Math.min(that.velocityX, 300);
        that.velocityX = Math.max(that.velocityX,-300);
        that.velocityY = Math.min(that.velocityY, 300);
        that.velocityY = Math.max(that.velocityY,-300);
        that.p.setVelocity(that.velocityX,that.velocityY);


        if (that.controlers[1].isDown){
            that.velocityX += -300;
            that.p.setVelocityX(that.velocityX); 
        }else if (that.controlers[3].isDown){
            that.velocityX +=  300;
            that.p.setVelocityX(that.velocityX);
        }
        if (that.controlers[0].isDown){
            that.velocityY += -300;
            that.p.setVelocityY(that.velocityY);
        }else if (that.controlers[2].isDown){
            that.velocityY +=  300;
            that.p.setVelocityY(that.velocityY);
        }
        if (that.velocityX>0)
            that.velocityX += -7.5;
        else if (that.velocityX<0)
            that.velocityX +=  7.5;
    
        if (that.velocityY>0)
            that.velocityY += -7.5;
        else if (that.velocityY<0)
            that.velocityY +=  7.5;
    }
}

offGameScene.init = function(){
    this.cursors;
    console.log(this.cursors);

    this.p1 = new Player();
    this.p2 = new Player();
};

//load assets
offGameScene.preload = function(){
	//load images
	this.load.image('background','assets/sprites/background.png');
	this.load.image('player','assets/sprites/player.png');
	this.load.image('enemy', 'assets/sprites/enemy.png')
	this.load.audio('theme','assets/audio/Holfix-PixelParade.mp3');
};

//called once after the preload ends
offGameScene.create = function(){
	//create bg sprite (depth 0)
	//this.add.sprite(675,321, 'background');
	let bg = this.add.sprite(0,0, 'background');

	//change the origin to up-left corner
	//bg.setOrigin(0,0);
	let gameW = this.sys.game.config.width;
	let gameH = this.sys.game.config.height;
	bg.setPosition(gameW/2,gameH/2);
	console.log(bg);
	console.log(this);

    //Create controls
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    cursors = this.input.keyboard.createCursorKeys();

    var cp1 =  [cursors.up,cursors.left,cursors.down,cursors.right];
    var cp2 = [keyA,keyW,keyS,keyD];

    this.p1.create(gameW/2,gameH/2,cp1);
    this.p2.create(gameW/3,gameH/3,cp2);

    this.p3.
   

	this.physics.world.enable([ this.p1, this.p2 ]);

	/*var particles = this.add.particles('flares');

    particles.createEmitter({
        frame: 'red',
        lifespan: 750,
        speed: { min: 10, max: 25 },
        scale: { start: 1, end: 0, ease: 'Quad.easeOut' },
        //alpha: { start: 1, end: 0, ease: 'Circ.easeIn'},
        quantity: 2,
        blendMode: 'ADD',
        quantity: 2,
        follow: sprite
    });*/

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