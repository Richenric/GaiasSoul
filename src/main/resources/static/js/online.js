var onGameScene = new Phaser.Scene('online');
WSconnection = new WebSocket('ws://'+ location.host +'/online');

onGameScene.init = function(){
    this.hasEnded = false;
    myPlayer.tag = myUser.tag;
    myPlayer.elemento = myUser.elemento;
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
    
    //  Set the camera and physics bounds to be a greater size//
    let sceneW = 1920 * 6;
    let sceneH = 1080 * 6;
    this.cameras.main.setBounds(0, 0, sceneW, sceneH);
    this.physics.world.setBounds(0, 0, sceneW, sceneH);
    
    //Lanzamos la escena de interfaz sobre la de juego
    //this.scene.launch(onInterface);
    
    //Ampliación del Background
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
    //Create controls//Pasan a ser parte de la clase del player
       //PLAYER 1: B->escudo V->zonal Espacio->Disparo
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); 
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V); 
    keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    keySpace = this.input.keyboard.addKey(32);
    cp = [keyW,keyA,keyS,keyD,keyB,keyV,keySpace];
    ////El player 2 pa las vacas A CHINA!!
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
    //this.keyEnter = this.input.keyboard.addKey(13);
    //Inicializacion de jugadores
    this.pseudoPlayers = [];
    
    this.player = new Player(this, gameW/2-400, gameH/2, 'yellow', 'yellow',myPlayer.tag, true, cp);
    this.physics.world.enable(this.player);
    //PARA RELLENAR CON LOS JUGADORES QUE LLEGUEN DE ALGÚN LUGAR
	for (var i = 0; i < 19; i++) {
        this.pseudoPlayers[i] = new PseudoPlayer(this, 0,0,'player');
        this.pseudoPlayers[i].deactivate();
        this.physics.world.enable(this.pseudoPlayers[i]);
        this.physics.add.overlap(this.player, this.pseudoPlayers[i].spells, this.checkCollision, null, this);
    }
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
    
    this.cameras.main.startFollow(this.player, true, 1, 1);
    var obj = {
    		typePeticion: 0,
    		x: myPlayer.x,
    		y: myPlayer.y,
    		tag: myUser.nickname,
    		elemento: myPlayer.elemento
	}
	WSconnection.send(JSON.stringify(obj));
	console.log(JSON.stringify(obj));
}

onGameScene.checkCollision=function(object1, object2){
    if(myPlayer.elemento != object2.elemento && !object1.isDefense && object2.spellType != 2){
        this.player.muero(); 
        var obj = {
        	typePeticion:3,
        	tag:object2.tag
        }
        WSconnection.send(JSON.stringify(obj));
        	
        this.player.emmi.on = false;
        this.player.isDead = true;
        
        if(object2.spellType == 0){
        	object2.emmi.on = false;
            object2.destroy();
        }
    }
}
//this is called up to 60 times per second
onGameScene.update = function(){
    if(!this.player.isDead){
        this.player.update();
        myPlayer.x = this.player.x;
        myPlayer.y = this.player.y;
    }else{
        this.player.effects.children.each(function (eff) {
            eff.emmi.on = false;
            onGameScene.player.effects.remove(eff,onGameScene,true);
        },this);
	    this.player.emmi.on = false;
	    this.player.destroy();
	    hasEnded = true;
    }
    var obj = {
    		typePeticion: 1,
    		x: myPlayer.x,
    		y: myPlayer.y,
    		isDead: myPlayer.isDead,
    		isDefense: myPlayer.isDefense
	}
    WSconnection.send(JSON.stringify(obj));
};

/*WSconnection.onopen = function () { // primera conexion del jugador
	var obj = {
		typePeticion: 0,
		x: myPlayer.x,
		y: myPlayer.y,
		tag: myPlayer.tag,
		elemento: myPlayer.elemento
	}
	WSconnection.send(JSON.stringify(obj));
	console.log(JSON.stringify(obj));
}*/
WSconnection.onerror = function(e) {
	console.log("WS error: " + e);
}
WSconnection.onmessage = function(msg) {
	console.log("WS message: " + msg.data);
	var obj = JSON.parse(msg.data);
	//console.log(obj);
		 
		 if(obj.player0 !=undefined && obj.pActual.tag != myUser.nickname){
			if(onGameScene.pseudoPlayers[0].isActive){
				onGameScene.pseudoPlayers[0].update(obj.player0.x,obj.player0.y,obj.player0.isDefense,obj.player0.isDead/*, msg.data[i].spells*/)
				if(onGameScene.pseudoPlayers[0].isDead){
					onGameScene.pseudoPlayers[0].muero();
					onGameScene.pseudoPlayers[0].deactivate();
				}
			}else{
				var frame = 'red';
				/*switch(msg.data[i].elemento) {
				  case 0:
				    frame = 'red'
				    break;
				  case 1:
				    // code block
				    break;
				    //ETC
				}  */
				onGameScene.pseudoPlayers[0].activate(obj.player0.elemento, obj.player0.tag, frame);
			}
		} 
	} 
};