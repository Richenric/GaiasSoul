var onGameScene = new Phaser.Scene('online');
WSconnection = new WebSocket('ws://'+ location.host +'/online');

onGameScene.init = function(){
    this.hasEnded = false;
    myPlayer.tag = myUser.tag;
    myPlayer.elemento = myUser.elemento;
    let pointMe;
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
    this.load.image('pointMe','assets/sprites/volLoud.png');
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
    this.scene.launch(onInterface);
    
    //create bg (depth 0)
    var bgPos = 670;
    var limW = sceneW/337;
    var limH = sceneH/337;
    
    for(i=0; i<limW; i++){
        for(j=0; j<limH; j++){
            let bg = this.add.sprite(i*bgPos,j*bgPos,'background');
            bg.setDepth(0);}}
    
    this.sacredFire = this.add.sprite(sceneW/2, sceneH/17.25, 'sanctuaryFire');
    this.sacredFire.setScale(1.5);
    this.sacredEarth = this.add.sprite(sceneW/1.034, sceneH/3, 'sanctuaryEarth');
    this.sacredEarth.setScale(1.5);
    this.sacredEarth.setRotation(1.58);
    this.sacredMetal = this.add.sprite(sceneW/1.5, sceneH/1.062, 'sanctuaryMetal');
    this.sacredMetal.setScale(1.5);
    this.sacredWater = this.add.sprite(sceneW/3, sceneH/1.062, 'sanctuaryWater');
    this.sacredWater.setScale(1.5);
    this.sacredWood = this.add.sprite(sceneW/31, sceneH/3, 'sanctuaryWood');
    this.sacredWood.setScale(1.5);
    this.sacredWood.setRotation(1.58);
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
    var frame,x,y;
    switch(myUser.elemento) {
	  	case 0: frame = 'redDeadRedemption';
	  		x = this.sacredFire.x;
	  		y = this.sacredFire.y;
	    	break;
	  	case 1: frame = 'grey';
	  		x = this.sacredMetal.x;
	  		y = this.sacredMetal.y;
	  		break;
	  	case 2: frame = 'green';
			x = this.sacredWood.x;
  			y = this.sacredWood.y;
	  		break;
	  	case 3: frame = 'brown';
	  		x = this.sacredEarth.x;
			y = this.sacredEarth.y;
	  		break;
	  	case 4: frame = 'blue';
	  		x = this.sacredWater.x;
			y = this.sacredWater.y;
	  		break;
	  	case 5: frame = 'red';
	  		x = gameW/2-400;
	  		y = gameH/2;
	}
    this.player = new Player(this, x, y, 'yellow', frame, myPlayer.tag, true, cp);
                this.pointMe = this.add.sprite(myPlayer.x,myPlayer.y-60,'pointMe');
                this.pointMe.setRotation(1.5708);//volLoud
                this.pointMe.setDepth(1);
                
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
        
        this.pointMe.x = myPlayer.x;
        this.pointMe.y = myPlayer.y-60;
        
    }else{
        this.player.effects.children.each(function (eff) {
            eff.emmi.on = false;
            onGameScene.player.effects.remove(eff,onGameScene,true);
        },this);
        this.player.muero();
	    //this.player.destroy();
	    switch(myUser.elemento) {
		  	case 0:
		  		this.player.x = this.sacredFire.x;
		  		this.player.y = this.sacredFire.y;
		    	break;
		  	case 1:
		  		this.player.x = this.sacredMetal.x;
		  		this.player.y = this.sacredMetal.y;
		  		break;
		  	case 2:
		  		this.player.x = this.sacredWood.x;
		  		this.player.y = this.sacredWood.y;
		  		break;
		  	case 3:
		  		this.player.x = this.sacredEarth.x;
		  		this.player.y = this.sacredEarth.y;
		  		break;
		  	case 4:
		  		this.player.x = this.sacredWater.x;
		  		this.player.y = this.sacredWater.y;
		  		break;
		  	case 5:
		  		this.player.x = gameW/2-400;
		  		this.player.y = gameH/2;
		}
	    //hasEnded = true;
    }
    var obj = {
    		typePeticion: 1,
    		x: myPlayer.x,
    		y: myPlayer.y,
    		isDead: myPlayer.isDead,
    		isDefense: myPlayer.isDefense,
    		habilidades: this.player.createSerializedArray()
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
function actualizacionPseudoPlayer(playernum,num){
	if(playernum !=undefined && playernum.tag != myUser.nickname){
		if(onGameScene.pseudoPlayers[num].isActive){
			onGameScene.pseudoPlayers[num].update(playernum.x,playernum.y,playernum.isDefense,playernum.isDead, playernum.spells)
			if(onGameScene.pseudoPlayers[num].isDead){
				onGameScene.pseudoPlayers[num].muero();
				onGameScene.pseudoPlayers[num].deactivate();
			}
		}else{
			var frame;
			switch(playernum.elemento) {
			  	case 0: frame = 'redDeadRedemption'; break;
			  	case 1: frame = 'grey' ;             break;
			  	case 2: frame = 'green';         	 break;
			  	case 3: frame = 'brown';      		 break;
			  	case 4: frame = 'blue' ;			 break;
			  	case 5: frame = 'red';				 break;
			}
			onGameScene.pseudoPlayers[num].activate(playernum.elemento, playernum.tag, frame);
		}
	}
}

WSconnection.onmessage = function(msg) {
	//console.log("WS message: " + msg.data);
	var obj = JSON.parse(msg.data);
	if(obj.player0 !=undefined){
		actualizacionPseudoPlayer(obj.player0,0);
	}if(obj.player1 !=undefined){
		actualizacionPseudoPlayer(obj.player1,1);
	} if(obj.player2 !=undefined){
		actualizacionPseudoPlayer(obj.player2,2);
	}if(obj.player3 !=undefined){
		actualizacionPseudoPlayer(obj.player3,3);
	}if(obj.player4 !=undefined){
		actualizacionPseudoPlayer(obj.player4,4);
	}if(obj.player5 !=undefined){
		actualizacionPseudoPlayer(obj.player5,5);
	}if(obj.player6 !=undefined){
		actualizacionPseudoPlayer(obj.player6,6);
	}if(obj.player7 !=undefined){
		actualizacionPseudoPlayer(obj.player7,7);
	}if(obj.player8 !=undefined){
		actualizacionPseudoPlayer(obj.player8,8);
	}if(obj.player9 !=undefined){
		actualizacionPseudoPlayer(obj.player9,9);
	}if(obj.player10 !=undefined){
		actualizacionPseudoPlayer(obj.player10,10);
	}if(obj.player11 !=undefined){
		actualizacionPseudoPlayer(obj.player11,11);
	}if(obj.player12 !=undefined){
		actualizacionPseudoPlayer(obj.player12,12);
	}if(obj.player13 !=undefined){
		actualizacionPseudoPlayer(obj.player13,13);
	}if(obj.player14 !=undefined){
		actualizacionPseudoPlayer(obj.player14,14);
	}if(obj.player15 !=undefined){
		actualizacionPseudoPlayer(obj.player15,15);
	}if(obj.player16 !=undefined){
		actualizacionPseudoPlayer(obj.player16,16);
	}if(obj.player17 !=undefined){
		actualizacionPseudoPlayer(obj.player17,17);
	}if(obj.player18 !=undefined){
		actualizacionPseudoPlayer(obj.player18,18);
	}if(obj.player19 !=undefined){
		actualizacionPseudoPlayer(obj.player19,19);
	} 
};