let lobbyScene = new Phaser.Scene('lobby');

lobbyScene.init = function(){
    function initCaption() {
    	var caption = {object: undefined, text: "", color: ""}
    	return caption;
    }
    
    //STYLES TEXTO//
    this.captions = [20];
    this.textColors = [6];
    
    this.textColors[0] = '#ff0000'; //FIRE
    this.textColors[1] = '#d7dbdd'; //METAL
    this.textColors[2] = '#a8e157'; //WOOD
    this.textColors[3] = '#e1a968'; //EARTH
    this.textColors[4] = '#4974fe'; //WATER
    this.textColors[5] = '#505050'; //DEFAULT
    
    this.textStyle = { //LOADING
            fill: '#505050', fontFamily: 'verdana', lineSpacing: 4, fontSize: 30 };
    this.textStyleNumPlayers = { //LOADING
            fill: '#fae994', fontFamily: 'verdana', lineSpacing: 4, fontSize: 40 };
    
    for(var i=0; i<20; i++){
    	this.captions[i] = initCaption();
    	this.captions[i].text = ((i+1)+'- '+'%1');
    	this.captions[i].color = this.textColors[5];
    }
	this.numplayerText = ('%1' + ' / 20');
	this.scoreText = ('%1');
}

lobbyScene.preload = function(){
    this.load.image('plTbl','assets/sprites/playersWindow.png');
    this.load.image('plCnt','assets/sprites/playersCounter.png');
    this.load.image('lob','assets/sprites/lobby.png');
    this.load.image('bBack','assets/sprites/backButton.png');
    this.load.image('bRdy','assets/sprites/readyButton.png');
    this.load.image('srvDis','assets/sprites/serverDisconected.png');
    this.load.image('bg','assets/sprites/background3.png');
    this.load.image('maxScore','assets/sprites/MaxScore.png');
    //////////////ME-SELECELEM////////////////////////////////////////////////////////
    this.load.image('selectFrame','assets/sprites/Select-ElementFrame.png');
    this.load.image('notFire','assets/sprites/Select-FireNot.png');
    this.load.image('selectFire','assets/sprites/Select-Fire.png');
    this.load.image('fireBg','assets/sprites/Select-FireBg.png');
    this.load.image('notEarth','assets/sprites/Select-EarthNot.png');
    this.load.image('selectEarth','assets/sprites/Select-Earth.png');
    this.load.image('earthBg','assets/sprites/Select-EarthBg.png');
    this.load.image('notMetal','assets/sprites/Select-MetalNot.png');
    this.load.image('selectMetal','assets/sprites/Select-Metal.png');
    this.load.image('metalBg','assets/sprites/Select-MetalBg.png');
    this.load.image('notWater','assets/sprites/Select-WaterNot.png');
    this.load.image('selectWater','assets/sprites/Select-Water.png');
    this.load.image('waterBg','assets/sprites/Select-WaterBg.png');
    this.load.image('notWood','assets/sprites/Select-WoodNot.png');
    this.load.image('selectWood','assets/sprites/Select-Wood.png');
    this.load.image('woodBg','assets/sprites/Select-WoodBg.png');
    this.load.image('selectRing','assets/sprites/Select-ElementRing.png');
    //////////////END-ME////////////////////////////////////////////////////////
}

lobbyScene.create = function(){
	var that = this;
    
    //BACKGROUND//
    var bgPos = 670;
    var limW = gameW/337;
    var limH = gameH/337;
    
    for(i=0; i<limW; i++){
        for(j=0; j<limH; j++){
            let bg = this.add.sprite(i*bgPos,j*bgPos,'bg');
            bg.setDepth(0);}}
    
    //CONTENTEDORES//
    let idBck = this.add.container(gameW/1.09,gameH/1.2);//Botón de retroceso//
    //////////////ME-SELECELEM////////////////////////////////////////////////////////
    let idSelectElem = this.add.container(gameW/2-360,gameH/2-125);//Selector elemento//
    console.log(gameW/2 + ", " + gameH/2);
    //////////////END-ME////////////////////////////////////////////////////////
    
    //CONTADOR DE JUGADORES//W
    let plCnt = this.add.sprite(gameW/2-120,gameH/2-125, 'plCnt');
    
    //TÍTULO LOBBY//S
    let lob = this.add.sprite(gameW/2,gameH/2-250, 'lob');
    
    //READY//B
    let bRdy = this.add.sprite(gameW/2+120,gameH/2-125, 'bRdy').setInteractive();
        bRdy.setAlpha(1);
        bRdy.on('pointerdown', function (pointer) { 
            lobbyScene.scene.switch(onGameScene);
        });
    
    //////////////ME-SELECELEM////////////////////////////////////////////////////////
    //fondo del boton negro
    let selectFrame = this.add.sprite(0,0, 'selectFrame');
        selectFrame.setAlpha(1);
    
    //Fondo del boton con el tema del elemento seleccinado
    let fireBg = this.add.sprite(0,0, 'fireBg');
        fireBg.setAlpha(0);
    let earthBg = this.add.sprite(0,0, 'earthBg');
        earthBg.setAlpha(0);
    let metalBg = this.add.sprite(0,0, 'metalBg');
        metalBg.setAlpha(0);
    let waterBg = this.add.sprite(0,0, 'waterBg');
        waterBg.setAlpha(0);
    let woodBg = this.add.sprite(0,0, 'woodBg');
        woodBg.setAlpha(0);
    
    //Selección de FUEGO
    let notFire = this.add.sprite(0,-56, 'notFire').setInteractive();
        notFire.setAlpha(1);
        notFire.on('pointerover', function (pointer) { 
            this.setAlpha(0);
            fireBg.setAlpha(1);
            selectFire.setAlpha(1);});
        notFire.on('pointerout', function (pointer) { 
            this.setAlpha(1);
            fireBg.setAlpha(0);
            selectFire.setAlpha(0);});
    let selectFire = this.add.sprite(0,-56, 'selectFire').setInteractive();
        selectFire.setAlpha(0);
        selectFire.on('pointerover', function (pointer) { 
            this.setAlpha(1);
            fireBg.setAlpha(1);
            notFire.setAlpha(0);});
        selectFire.on('pointerout', function (pointer) { 
            this.setAlpha(0);
            fireBg.setAlpha(0);
            notFire.setAlpha(1);});
        selectFire.on('pointerdown', function (pointer) {
            myUser.elemento = 0;});////////////////////////////////////////////////////////
    
    //Seleccion de TIERRA
    let notEarth = this.add.sprite(52,-17, 'notEarth').setInteractive();
        notEarth.setAlpha(1);
        notEarth.on('pointerover', function (pointer) { 
            this.setAlpha(0);
            earthBg.setAlpha(1);
            selectEarth.setAlpha(1);});
        notEarth.on('pointerout', function (pointer) { 
            this.setAlpha(1);
            earthBg.setAlpha(0);
            selectEarth.setAlpha(0);});
    let selectEarth = this.add.sprite(52,-17, 'selectEarth').setInteractive();
        selectEarth.setAlpha(0);
        selectEarth.on('pointerover', function (pointer) { 
            this.setAlpha(1);
            earthBg.setAlpha(1);
            notEarth.setAlpha(0);});
        selectEarth.on('pointerout', function (pointer) { 
            this.setAlpha(0);
            earthBg.setAlpha(0);
            notEarth.setAlpha(1);});
        selectEarth.on('pointerdown', function (pointer) {
            myUser.elemento = 3;});////////////////////////////////////////////////////////
    
    //Seleccion de METAL
    let notMetal = this.add.sprite(32,44, 'notMetal').setInteractive();
        notMetal.setAlpha(1);
        notMetal.on('pointerover', function (pointer) { 
            this.setAlpha(0);
            metalBg.setAlpha(1);
            selectMetal.setAlpha(1);});
        notMetal.on('pointerout', function (pointer) { 
            this.setAlpha(1);
            metalBg.setAlpha(0);
            selectMetal.setAlpha(0);});
    let selectMetal = this.add.sprite(32,44, 'selectMetal').setInteractive();
        selectMetal.setAlpha(0);
        selectMetal.on('pointerover', function (pointer) { 
            this.setAlpha(1);
            metalBg.setAlpha(1);
            notMetal.setAlpha(0);});
        selectMetal.on('pointerout', function (pointer) { 
            this.setAlpha(0);
            metalBg.setAlpha(0);
            notMetal.setAlpha(1);});
        selectMetal.on('pointerdown', function (pointer) {
            myUser.elemento = 1;});////////////////////////////////////////////////////////
    
    //Seleccion de AGUA
    let notWater = this.add.sprite(-33,44, 'notWater').setInteractive();
        notWater.setAlpha(1);
        notWater.on('pointerover', function (pointer) { 
            this.setAlpha(0);
            waterBg.setAlpha(1);
            selectWater.setAlpha(1);});
        notWater.on('pointerout', function (pointer) { 
            this.setAlpha(1);
            waterBg.setAlpha(0);
            selectWater.setAlpha(0);});
    let selectWater = this.add.sprite(-33,44, 'selectWater').setInteractive();
        selectWater.setAlpha(0);
        selectWater.on('pointerover', function (pointer) { 
            this.setAlpha(1);
            waterBg.setAlpha(1);
            notWater.setAlpha(0);});
        selectWater.on('pointerout', function (pointer) { 
            this.setAlpha(0);
            waterBg.setAlpha(0);
            notWater.setAlpha(1);});
        selectWater.on('pointerdown', function (pointer) {
            myUser.elemento = 4;});////////////////////////////////////////////////////////
    
    //Seleccion de MADERA
    let notWood = this.add.sprite(-52,-17, 'notWood').setInteractive();
        notWood.setAlpha(1);
        notWood.on('pointerover', function (pointer) { 
            this.setAlpha(0);
            woodBg.setAlpha(1);
            selectWood.setAlpha(1);});
        notWood.on('pointerout', function (pointer) { 
            this.setAlpha(1);
            woodBg.setAlpha(0);
            selectWood.setAlpha(0);});
    let selectWood = this.add.sprite(-52,-17, 'selectWood').setInteractive();
        selectWood.setAlpha(0);
        selectWood.on('pointerover', function (pointer) { 
            this.setAlpha(1);
            woodBg.setAlpha(1);
            notWood.setAlpha(0);});
        selectWood.on('pointerout', function (pointer) { 
            this.setAlpha(0);
            woodBg.setAlpha(0);
            notWood.setAlpha(1);});
        selectWood.on('pointerdown', function (pointer) {
            myUser.elemento = 2;});////////////////////////////////////////////////////////
    
    //Anillo que enmarca el boton
    let selectRing = this.add.sprite(0,0, 'selectRing');
        selectRing.setAlpha(1);
    
    //Introducimos todos los elementos en el contenedor
    idSelectElem.add(selectFrame);
        idSelectElem.add(fireBg);   idSelectElem.add(earthBg);  
        idSelectElem.add(metalBg);   idSelectElem.add(waterBg);
        idSelectElem.add(woodBg);
        idSelectElem.add(notFire);      idSelectElem.add(selectFire);
        idSelectElem.add(notEarth);     idSelectElem.add(selectEarth);
        idSelectElem.add(notMetal);     idSelectElem.add(selectMetal);
        idSelectElem.add(notWater);     idSelectElem.add(selectWater);
        idSelectElem.add(notWood);      idSelectElem.add(selectWood);
    idSelectElem.add(selectRing);       idSelectElem.setScale(0.75);
    //////////////END-ME////////////////////////////////////////////////////////
    
    //BACK//B
    let bBack = this.add.sprite(0,0, 'bBack').setInteractive();
        bBack.setScale(0.75);
        bBack.setAlpha(1);
        bBack.on('pointerdown', function (pointer) {
        	deleteUser(myUser.id); 
        	console.clear();
            lobbyScene.scene.switch(mainMenuScene);
        });
    bBack.setRotation(6.15);
    idBck.add(bBack);
    
    //TABLA JUGADORES//W
    let plTbl = this.add.sprite(gameW/2,gameH/2+150, 'plTbl');

    //ESTILO DE TEXTO SEGÚN ELEMENTO//
    //this.caption = this.captionStyle();
    for(var i = 0; i<20; i++){
    	if(i<10){
    		this.captions[i].object = this.add.text(gameW/2-400, gameH/2-30 + (i%10)*35, this.captions[i].text, this.textStyle);
    	} 
    	else{
    		this.captions[i].object = this.add.text(gameW/2+35, gameH/2-30 + (i%10)*35, this.captions[i].text, this.textStyle);
    	}
    }

    let maxScorePanel = this.add.sprite(gameW/2+350,gameH/2-125,'maxScore');
    
    this.numPlayerCaption = this.add.text(gameW/2-175,gameH/2-150, "", this.textStyleNumPlayers);
    this.scoreCaption = this.add.text(gameW/2+350,gameH/2-125, "", this.textStyleNumPlayers);
    
    //SERVIDOR DESCONECTADO//W
    //Condicionar en función de si 'server.isConected(false)'
    this.srvDis = this.add.sprite(gameW/2,gameH/2+140, 'srvDis');
    this.srvDis.setAlpha(0);

    //ARRAY DE USERS//
    this.auxUsers = [];
    this.serverDesactivado = false;
    this.maxScore = 0;
}

        
lobbyScene.update = function(){
    if(!connection){
		this.srvDis.setAlpha(1);
    }else{
		this.srvDis.setAlpha(0);
    }
    
    if(connection){
    	if(loadUsersProcessed){
	    	loadUsers(function (users) {//When users are loaded from server
	        	lobbyScene.auxUsers=users;
	        });
	    	loadUsersProcessed = false;
    	}
    	if(maxScoreProcessed){
    		maxScore(function(score){lobbyScene.maxScore = score;});
    	}
    }
    //////////////SE CAMBIARA////////////////////////////////////////////////////////
    //ACTUALIZAR ELEMENTO
    /*for(var i=0; i<20; i++){
    	if(this.auxUsers[i] != undefined){
	    	if(this.auxUsers[i].id == myUser.id){
	    		if(this.auxUsers[i-1] != undefined){
	    			myUser.elemento = (lobbyScene.auxUsers[i-1].elemento + 1)%5;
	    		}else {
	        		myUser.elemento = 0;
	        	}
	    	}
    	}else {
    		myUser.color = 0;
    	}
    }*/
    ////////////////////////////////////////////////////////
    
    //ACTUALIZAR JUGADORES
    for(var i=0; i<20; i++){
	    if(this.auxUsers[i] != undefined && connection){
	    	var a = this.textColors[this.auxUsers[i].elemento];
	    	this.captions[i].color = a;
	    	this.captions[i].object.setText(Phaser.Utils.String.Format(this.captions[i].text, [
	    		this.auxUsers[i].nickname
	        ]));
	    	this.captions[i].object.setColor(this.captions[i].color)
	    }else{
	        this.captions[i].object.setText(Phaser.Utils.String.Format(this.captions[i].text, [
	        '' ]));    
	        this.captions[i].object.setColor(this.textColors[5]);
	    }
    }
    if(connection){
    	this.numPlayerCaption.setText(Phaser.Utils.String.Format(this.numplayerText, [this.auxUsers.length]));	
    	this.scoreCaption.setText(Phaser.Utils.String.Format(this.scoreText, [this.maxScore]));
    }else{
    	this.numPlayerCaption.setText(Phaser.Utils.String.Format(this.numplayerText, ['-']));
    }
    
    //ACTUALIZARME A MI
    //if(connection){
	    if(updateUserProcessed){
	        updateUser(myUser);
	        updateUserProcessed = false;
	    }
    //}
    
};