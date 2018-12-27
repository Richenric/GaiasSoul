class Disparo extends Phaser.Physics.Arcade.Sprite{
    constructor (scene, x, y, texture, frame, tag){
        super(scene, x, y, texture);
        scene.add.existing(this).setScale(0.25,0.25);
        scene.physics.add.existing(this);
        this.setCircle(50);

        this.tag = tag;
        this.spellType = 0;

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

class Escudo extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x, y, texture,frame, tag){
        super(scene, x, y, texture);
        scene.add.existing(this).setOrigin(0.5);
        scene.physics.add.existing(this);

        this.particles = scene.add.particles('sparks');
        
        this.emmi = this.particles.createEmitter({
            frame: frame,
            lifespan: { min: 200, max: 500 },
            x:0, y:0,
            speed: 200,
            scale: { start: 0.1, end: 0.5 },
            //alpha: { start: 0, end: 1, ease: "Quad.easeIn" },
            angle: { start: 0, end: 360, steps: 20 }, //Steps permite que se haga de manera ordenada y en circulo
            frequency: 32,
            blendMode: 'ADD',
            quantity: 10,
            //on: false,
            //follow: this
        });
        
        this.setCircle(100,-50,-50);
        this.alpha = 0;

        this.tag = tag;
        this.spellType = 2;
        this.lifeTime = 120;
        this.iMayDie = false;
    };
    update(x, y){
            this.lifeTime--;
            this.setPosition(x,y);
            this.particles.setPosition(x,y);
        if(this.lifeTime <=0){//si llega a 0 se hace desaparecer el zonal
            this.emmi.on = false;
            this.iMayDie = true;//y se permite la creacion de otro zonal
        }
    };
}

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
        this.spellType = 1;
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

class Muerte extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture);
        scene.add.existing(this).setOrigin(0.5);
        
        this.emmi = scene.add.particles('sparks').createEmitter({
            frame: frame,
            lifespan: { min: 100, max: 600 },
            x:x, y:y,
            speed: 400,
            //angle: { start: 0, end: 360, steps: 40 },
            scale: { start: 0.3, end: 0 },
            frequency: 12,
            blendMode: 'ADD',
            quantity: 16
        });
        
        this.alpha = 0;

        this.lifeTime = 5;
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

class PseudoPlayer extends Phaser.Physics.Arcade.Sprite{

    constructor (scene, x, y, texture){ //create player sprite (depth 1) if you don't set the body as active it won't collide with the world bounds
        super(scene, x, y, texture);//create player sprite (depth 1)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCircle(50);
        
        this.tex = texture;
        this.tag;
        this.elemento;
        
        this.isDefense = false;
        this.isDead = false;

        this.spells = scene.add.group();
        this.effects = scene.add.group();

        this.depth = 1;
        this.alpha = 0;
        this.setScale(0.5,0.5);
        this.setBlendMode('ADD'),
        this.setCollideWorldBounds(true);

    	disableBody(true, true);
    }
    muero(){
        var effectoMuerte = new Muerte(this.scene, this.x, this.y, this.text, this.frpost);
        this.effects.add(effectoMuerte);
    }
    activate(elemento, tag){
    	this.enable = true;
    	this.active = true;

        this.tag = tag;
        this.elemento = elemento;
        
        this.isDefense = false;
        this.isDead = false;
        
        this.emmi = scene.add.particles('sparks').createEmitter({
            frame: elemento,                                                                             
            lifespan: 750,
            speed: { min: 10, max: 25 },
            scale: { start: 0.5, end: 0, ease: 'Quad.easeOut' },
            //alpha: { start: 1, end: 0, ease: 'Circ.easeIn'},
            quantity: 2,
            blendMode: 'ADD',
            quantity: 2,
            follow: this
        });
    }
    deactivate(){
    	disableBody(true, true);
    	this.emmi.destroy();
    	this.tag = undefined;
        this.elemento = undefined;
    	
    	this.spells.children.iterate(function (child) {
    	    child.destroy();
    	});

    	this.spells.clear(true);
    	
    	this.effects.children.iterate(function (child) {
    	    child.destroy();
    	});

    	this.effects.clear(true);
    }
    update(posX, posY, isDefense, isDead, spells){
    	this.setPosition(posX, posY);
    	this.isDefense = isDefense;
    	this.isDead = isDead;
    	
    	for(var i = 0; i<spells.lenght; i++){
    		if(this.spells.children[i] != undefined){
    			this.spells.children[i].x = spells[i].x;
    			this.spells.children[i].y = spells[i].y;
    		}
    		else {
    			if(spells[i].tipo = 0){
    				var disparo = new Disparo(this.scene, spells[i].x, spells[i].y, 'enemy', this.elemento, this.tag)
    				this.spells.add(disparo);
    			}else if(spells[i].tipo = 1){
    				var escudo = new Escudo(this.scene, spells[i].x, spells[i].y, 'enemy', this.elemento, this.tag);
    	            this.spells.add(escudo);
    			}else if(spells[i].tipo = 2){
    				var zonal = new Zonal(this.scene, spells[i].x, spells[i].y, 'enemy', this.elemento, this.tag);
    				this.spells.add(zonal);
    			}
    		}
    	}
    	if(this.spells.children.lenght > spells.lenght){
    		for(var i = spells.lenght; i<this.spells.lenght; i++){
    			this.spells.children[i].destroy();
    		}
    	}
    }
}
    
class Player extends Phaser.Physics.Arcade.Sprite{

    constructor (scene, x, y, texture, frame, tag, usesMouse, cp, life){ //create player sprite (depth 1) if you don't set the body as active it won't collide with the world bounds
        super(scene, x, y, texture);//create player sprite (depth 1)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCircle(50);

        this.tag = tag;
        this.isDefense = false;
        this.usesMouse = usesMouse;

        this.score = 0;
        this.life = life;
        this.isDead = false;

        this.spells = scene.add.group();
        this.effects = scene.add.group();

        this.emmi = scene.add.particles('sparks').createEmitter({
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

        this.allCd = [120,60,0];
        this.frpost = frame;
        this.text = texture;

        this.depth = 1;
        this.alpha = 0;
        this.setScale(0.5,0.5);
        this.setBlendMode('ADD'),
        this.controlers = cp;
        this.setCollideWorldBounds(true);
    }
    muero(){
        var effectoMuerte = new Muerte(this.scene, this.x, this.y, this.text, this.frpost);
        this.effects.add(effectoMuerte);
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
                this.spells.add(disparo);
                this.allCd[1] = 0;
            }
        }
        //ESCUDO
        if (this.controlers[4].isDown && this.allCd[2] >=480){ //ESCUDO
            var escudo = new Escudo(this.scene, this.x, this.y, 'enemy', this.frpost, this.tag);
            this.spells.add(escudo);
            this.isDefense = true;
            this.allCd[2] = 0;
        }
        //ZONAL
        if (this.controlers[5].isDown && this.allCd[0] >=120){ //ZONAL
            var zonal = new Zonal(this.scene, this.x, this.y, 'enemy', this.frpost, this.tag);
            this.spells.add(zonal);
            this.allCd[0] = 0;
        }

        //ACTUALIZACION GRUPOS
        this.spells.children.each(function (spe) {
            if(spe.iMayDie){
                this.spells.remove(spe,offGameScene,true);
                if(spe.spellType = 2)this.isDefense = false;}
            else{ spe.update(this.x, this.y); }
        },this);

        this.effects.children.each(function (eff) {
            if(eff.iMayDie){
                this.effects.remove(eff,offGameScene,true);}
            else{ eff.update(); }
        },this);
    }
}