let userScene = new Phaser.Scene('enterUser');
userScene.init = function(){}

userScene.preload = function(){
    this.load.image('userNW','assets/sprites/enterUsernameWindow.png'); this.load.image('okDis','assets/sprites/OkDisable.png');
    this.load.image('okOn','assets/sprites/OkOver.png');
    this.load.image('okOff','assets/sprites/OkRelax.png');
    this.load.image('bg','assets/sprites/background3.png');
}

userScene.create = function(){
    //BACKGROUND//
    let bg = this.add.sprite(0,0, 'bg');
    bg.setPosition(gameW/2,gameH/2);
    bg.setDepth(0);
    
    //ENTER USERNAME//W
    let userNW = this.add.sprite(gameW/2,gameH/2, 'userNW');
    
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
            userScene.scene.switch(lobbyScene);});
            //OVER//
        okOnB.on('pointerover', function (pointer, gameObject) {
            this.setAlpha(1);
            okOffB.setAlpha(0);});
            //OUT//
        okOnB.on('pointerout', function (pointer, gameObject) {
            this.setAlpha(0);
            okOffB.setAlpha(1);});
    
    textEntry = this.add.text(gameW/2-325,gameH/2-12, '', { font: '32px Courier', fill: '#ffff00' });
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