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
}

lobbyScene.create = function(){
	var that = this;
    //BACKGROUND//
    let bg = this.add.sprite(0,0, 'bg');
    bg.setPosition(gameW/2,gameH/2);
    bg.setDepth(0);
    
    //CONTENTEDORES//
    let idBck = this.add.container(gameW/1.09,gameH/1.2);//Botón de retroceso//
    
    //CONTADOR DE JUGADORES//W
    let plCnt = this.add.sprite(gameW/2-120,gameH/2-125, 'plCnt');
    
    //TÍTULO LOBBY//S
    let lob = this.add.sprite(gameW/2,gameH/2-250, 'lob');
    
    //READY//B
    let bRdy = this.add.sprite(gameW/2+120,gameH/2-125, 'bRdy').setInteractive();
        bRdy.setAlpha(1);
        bRdy.on('pointerdown', function (pointer) { 
            //lobbyScene.scene.switch(onGame);
        });
    
    //BACK//B
    let bBack = this.add.sprite(0,0, 'bBack').setInteractive();
        bBack.setScale(0.75);
        bBack.setAlpha(1);
        bBack.on('pointerdown', function (pointer) {
        	deleteUser(myUser.id); 
        	
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
    	loadUsers(function (users) {//When users are loaded from server
        	lobbyScene.auxUsers=users;
        });
    	maxScore(function(score){lobbyScene.maxScore = score;});
    }
    //ACTUALIZAR ELEMENTO
    for(var i=0; i<20; i++){
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
    }
    
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
        updateUser(myUser);
    //}
    
};