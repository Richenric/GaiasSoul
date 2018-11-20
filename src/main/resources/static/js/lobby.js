let lobbyScene = new Phaser.Scene('lobby');
lobbyScene.init = function(){
    
    //STYLES TEXTO//
    this.caption0; /*this.caption1;*/
    this.fireStyle = { 
        fill: '#ff0000', fontFamily: 'verdana', lineSpacing: 4, fontSize: 50 };
    this.metalStyle = { 
        fill: '#d7dbdd', fontFamily: 'verdana', lineSpacing: 4, fontSize: 50 };
    this.woodStyle = { 
        fill: '#935116', fontFamily: 'verdana', lineSpacing: 4, fontSize: 50 };
    this.earthStyle = { 
        fill: '#2e4053', fontFamily: 'verdana', lineSpacing: 4, fontSize: 50 };
    this.waterStyle = { 
        fill: '#85c1e9', fontFamily: 'verdana', lineSpacing: 4, fontSize: 50 };
    this.loadingStyle = { 
        fill: '#000000', fontFamily: 'verdana', lineSpacing: 4, fontSize: 50 };
    
    this.captionText = (
        '01-'+'%1'
    );
}

lobbyScene.preload = function(){
    this.load.image('plTbl','assets/sprites/playersWindow.png');
    this.load.image('plCnt','assets/sprites/playersCounter.png');
    this.load.image('lob','assets/sprites/lobby.png');
    this.load.image('bBack','assets/sprites/backButton.png');
    this.load.image('bRdy','assets/sprites/readyButton.png');
    this.load.image('srvDis','assets/sprites/serverDisconected.png');
    this.load.image('bg','assets/sprites/background3.png');
}

lobbyScene.create = function(){
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
            lobbyScene.scene.switch(mainMenuScene);
        });
    bBack.setRotation(6.15);
    idBck.add(bBack);
    
    /*let m1 = this.add.container(0,0);
    let m2 = this.add.container(200,0);

    //i+' - '+playerNick
    var text1 = this.add.text(100, 100, '01-RICHENRIC5 ');     text1.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m1.add(text1);
    var text2 = this.add.text(100, 125, '02- ');     text2.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m1.add(text2);
    var text3 = this.add.text(100, 150, '03- ');     text3.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m1.add(text3);
    var text4 = this.add.text(100, 175, '04- ');     text4.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m1.add(text4);
    var text5 = this.add.text(100, 200, '05- ');     text5.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m1.add(text5);
    var text6 = this.add.text(100, 225, '06- ');     text6.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m1.add(text6);
    var text7 = this.add.text(100, 250, '07- ');     text7.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m1.add(text7);
    var text8 = this.add.text(100, 275, '08- ');     text8.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m1.add(text8);
    var text9 = this.add.text(100, 300, '09- ');     text9.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m1.add(text9);
    var text10 = this.add.text(100, 325, '10- ');    text10.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);     m1.add(text10);

    var text11 = this.add.text(100, 100, '11-RICHENRIC7');    text11.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m2.add(text11);
    var text12 = this.add.text(100, 125, '12- ');    text12.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m2.add(text12);
    var text13 = this.add.text(100, 150, '13- ');    text13.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m2.add(text13);
    var text14 = this.add.text(100, 175, '14- ');    text14.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m2.add(text14);
    var text15 = this.add.text(100, 200, '15- ');    text15.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m2.add(text15);
    var text16 = this.add.text(100, 225, '16- ');    text16.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m2.add(text16);
    var text17 = this.add.text(100, 250, '17- ');    text17.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m2.add(text17);
    var text18 = this.add.text(100, 275, '18- ');    text18.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m2.add(text18);
    var text19 = this.add.text(100, 300, '19- ');    text19.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m2.add(text19);
    var text20 = this.add.text(100, 325, '20- ');    text20.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);      m2.add(text20);*/
    
    
    
    //TABLA JUGADORES//W
    let plTbl = this.add.sprite(gameW/2,gameH/2+150, 'plTbl');

    //SERVIDOR DESCONECTADO//W
        //Condicionar en función de si 'server.isConected(false)'
    let srvDis = this.add.sprite(gameW/2,gameH/2, 'srvDis');
    srvDis.setAlpha(0.25);
    
    //ESTILO DE TEXTO SEGÚN ELEMENTO//
    //this.caption = this.captionStyle();
    if(item.elemento==0) {//Fuego
        this.caption = this.add.text(gameW/2-80, gameH-75, '', this.fireStyle)
    }else if(item.elemento==1) {//Metal
        this.caption = this.add.text(gameW/2-80, gameH-75, '', this.metalStyle)
    }else if(item.elemento==2) {//Madera
        this.caption = this.add.text(gameW/2-80, gameH-75, '', this.woodStyle)
    }else if (item.elemento==3){//Tierra
        this.caption = this.add.text(gameW/2-80, gameH-75, '', this.earthStyle)
    }else if (item.elemento==4){//Agua
        this.caption = this.add.text(gameW/2-80, gameH-75, '', this.waterStyle)
    }else{//Cargando
        this.caption = this.add.text(gameW/2-80, gameH-75, '', this.loadingStyle)
    }
    
    //ARRAY DE ITEMS//
    this.auxItems = new Array(20);
}
/*lobbyScene.captionStyle=function(){
    if(item.elemento==0) {//Fuego
        this.caption = this.add.text(gameW/2-80, gameH-75, '', this.fireStyle)
    }else if(item.elemento==1) {//Metal
        this.caption = this.add.text(gameW/2-80, gameH-75, '', this.metalStyle)
    }else if(item.elemento==2) {//Madera
        this.caption = this.add.text(gameW/2-80, gameH-75, '', this.woodStyle)
    }else if (item.elemento==3){//Tierra
        this.caption = this.add.text(gameW/2-80, gameH-75, '', this.earthStyle)
    }else if (item.elemento==4){//Agua
        this.caption = this.add.text(gameW/2-80, gameH-75, '', this.waterStyle)
    }else{//Cargando
        this.caption = this.add.text(gameW/2-80, gameH-75, '', this.loadingStyle)
    }
}*/

        
lobbyScene.update = function(){
    /*if(!server.isConected)
        srvDis.setAlpha(0.75);
        bRdy.setAlpha(0);
        
    else
        srvDis.setAlpha(0);
        bRdy.setAlpha(1);
    */
    
    //this.caption = this.captionStyle();
    loadItems(function (items) {
        //When items are loaded from server
        for(var i = 0; i<items.length; i++){
            this.auxItems[i]=items[i];
        }
    });
    
    
    if(auxItems[0].nickname != null){
       this.caption0.setText(Phaser.Utils.String.Format(this.captionText, [
        this.auxItems[0].nickname
        ]));    
    /*if(auxItems[1].nickname != null){
       this.caption1.setText(Phaser.Utils.String.Format(this.captionText, [
        this.auxItems[1].nickname
        ]));*/
    }else{
        this.caption.setText(Phaser.Utils.String.Format(this.captionText, [
        '' ]));    
    }
    
};