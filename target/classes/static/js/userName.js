let userScene = new Phaser.Scene('enterUser');

userScene.init = function(){
	this.nicknamesTaken = [];
	that = this;
}

userScene.preload = function(){
    this.load.image('userNW','assets/sprites/enterUsernameWindow.png'); 
    this.load.image('introName','assets/sprites/InroUserName.png'); 
    this.load.image('okDis','assets/sprites/OkDisable.png');
    this.load.image('okOn','assets/sprites/OkOver.png');
    this.load.image('okOff','assets/sprites/OkRelax.png');
    this.load.image('bg','assets/sprites/background3.png');
    this.load.image('bBack','assets/sprites/backButton.png');
    this.load.image('bBackOver','assets/sprites/backButtonOVER.png');
}

userScene.create = function(){
    //BACKGROUND//
    let bg = this.add.sprite(0,0, 'bg');
    bg.setPosition(gameW/2,gameH/2);
    bg.setDepth(0);
    
    //ENTER USERNAME//W
    let userNW = this.add.sprite(gameW/2,gameH/2, 'userNW');
 
    //ENTER TEX HERE//
    let introName = this.add.sprite(gameW/2-175,gameH/2, 'introName');
 
    //BACK//
        //BACK OUT//
    let bBack = this.add.sprite(gameW/2+635,gameH/2+245, 'bBack').setInteractive();
        bBack.setAlpha(1);
        bBack.setScale(0.75);
            //OVER//Back Out
        bBack.on('pointerover', function (pointer) { 
            this.setAlpha(0);
            bBackOver.setAlpha(1);});
            //OUT//Back Out
        bBack.on('pointerout', function (pointer) { 
            this.setAlpha(1);
            bBackOver.setAlpha(0);});
        //BACK OVER//
    let bBackOver = this.add.sprite(gameW/2+635,gameH/2+245, 'bBackOver').setInteractive();
        bBackOver.setAlpha(0);
        bBackOver.setScale(0.75);
            //CLICK//Back Over
        bBackOver.on('pointerdown', function (pointer) {
            userScene.scene.switch(mainMenuScene);});
            //OVER//Back Over
        bBackOver.on('pointerover', function (pointer, gameObject) {
            this.setAlpha(1);
            bBack.setAlpha(0);});
            //OUT//Back Over
        bBackOver.on('pointerout', function (pointer, gameObject) {
            this.setAlpha(0);
            bBack.setAlpha(1);});

    //OK//B
        //DISABLE// --> EVITAR K SE ACCEDA AL LOBBY SIN INTRODUCIR UN NOMBRE
    let okDB = this.add.sprite(gameW/2+200,gameH/2, 'okDis');
        okDB.setAlpha(1);
        //OK OFF
    let okOffB = this.add.sprite(gameW/2+200,gameH/2, 'okOff').setInteractive();
        okOffB.setAlpha(1);
            //OVER//
        okOffB.on('pointerover', function (pointer) { 
            this.setAlpha(0);
            okOnB.setAlpha(1);});
            //OUT//
        okOffB.on('pointerout', function (pointer) { 
            this.setAlpha(1);
            okOnB.setAlpha(0);});
        
        //OK ON
    let okOnB = this.add.sprite(gameW/2+200,gameH/2, 'okOn').setInteractive();
        okOnB.setAlpha(0);
            //CLICK//
        okOnB.on('pointerdown', function (pointer) {
        	myUser.nickname = textEntry.text;
        	takenNicknames(function (names) {this.nicknamesTaken = names;});
        	loadUsers(function (users) {
        		that.numeroDeGente = users.length;
        		if(that.numeroDeGente < 20 && !this.nicknamesTaken.includes(myUser.nickname) && myUser.nickname != null && myUser.nickname != ''){
        			
        			createUser(myUser, function(userWithId){myUser = userWithId; myUser.id = userWithId.id;});
        			//console.log(myUser);
        			
        			userScene.scene.switch(lobbyScene);
            	}
        		
        		else {
        			if(that.numeroDeGente >= 20){
        				console.log("El server está lleno!");
        			}else if(this.nicknamesTaken.includes(myUser.nickname)){
        				console.log("QUE POCO ORIGINAL ERES!");
        				//myUser.nickname = prompt("HIJO DE MI VIDA pon otro nombre... porfa", "Username");
        			}else if(myUser.nickname == null || myUser.nickname == ''){
        				console.log("Muy null te veo");
        				//myUser.nickname = prompt("Mas null tu nombre no podia ser... pon otro anda... ", "Username");
        			}
            	}
            });
            //userScene.scene.switch(lobbyScene);
        });
            //OVER//
        okOnB.on('pointerover', function (pointer, gameObject) {
            this.setAlpha(1);
            okOffB.setAlpha(0);});
            //OUT//
        okOnB.on('pointerout', function (pointer, gameObject) {
            this.setAlpha(0);
            okOffB.setAlpha(1);});
    //HERE IS THE TEXT//
    textEntry = this.add.text(gameW/2-365,gameH/2-12, '', { font: '32px verdana', fill: '#555555' });
        this.input.keyboard.on('keydown', function (event) {
            if (event.keyCode === 8 && textEntry.text.length > 0){
                textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
            }
            else if (textEntry.text.length <= 11 && (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90))){
                textEntry.text += event.key;
            }
                    
        });
    
    
}

userScene.update = function(){}