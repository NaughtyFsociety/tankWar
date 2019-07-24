function Bullet(x,y,direct,origin,bullet_color){
    this.x = x;  //子弹的起始坐标;
    this.y = y; 
    this.bullet_length =  3;
    this.bullet_radius = 4;
    this.direct = direct; 
    this.speed = 5; 
    this.iscollision = false;
    this.bullet_color = bullet_color;
    this.origin = origin;
    this.update = function(){
        //检测myheroTank子弹是否撞墙;
        // console.log(this.origin)
        this.iscollision = isBulletCollison(this.x,this.y,this.bullet_radius,this.bullet_length,wall.x,wall.y,wall.width,wall.height);

        //检测myheroTank子弹是否和敌军撞击;
        if(this.origin instanceof myHero){ //如果子弹源头是 myhero的时候
            for( var i = 0; i < enemyList.length; i ++){
                this.iscollision = isBulletCollison(this.x,this.y,this.bullet_radius,this.bullet_length,enemyList[i].x,enemyList[i].y,enemyList[i].width,enemyList[i].height);
                if(this.iscollision == true){//如过击中目标坦克
                    //就把坦克打出去的子弹放入另外一个数组
                    for( var j = 0; j < enemyList[i].bullet_list.length; j++  ){
                        residual_bullet_list.push(enemyList[i].bullet_list[j]) 
                    }
                    enemyList.splice(i,1);
                    break;    
                }
            }
        }
        if(this.origin instanceof enemyTank){
            this.iscollision = isBulletCollison(this.x,this.y,this.bullet_radius,this.bullet_length,ss.x,ss.y,ss.width,ss.height);
            if(this.iscollision == true){
                if(ss.life == 0){
                    ss.isalive = false;
                }
                ss.life --;
            }
        }
        
        this.draw();
    }
    this.draw = function(){
        ctx.save();
        ctx.lineWidth = this.bullet_radius;
        ctx.shadowBlur = "none";
        ctx.strokeStyle = this.bullet_color||"red";
        ctx.beginPath();
        switch(direct){
            case "LEFT":
            this.draw_left()
            break;

            case "RIGHT":
            this.draw_right()
            break;

            case "UP":
            this.draw_up()
            break;

            case "DOWN":
            this.draw_down()
            break;
        }
        ctx.stroke();
        ctx.restore();
    }
    this.draw_left = function(){
        this.x -= this.speed;
        ctx.moveTo (this.x,this.y);
        ctx.lineTo (this.x - this.bullet_length,this.y);
    }
    this.draw_right = function(){
        this.x += this.speed;
        ctx.moveTo (this.x,this.y);
        ctx.lineTo (this.x + this.bullet_length,this.y);
    }
    this.draw_up = function(){
        this.y -= this.speed;
        ctx.moveTo (this.x,this.y);
        ctx.lineTo (this.x,this.y - this.bullet_length);
    }
    this.draw_down = function(){
        this.y += this.speed;
        ctx.moveTo (this.x,this.y);
        ctx.lineTo (this.x,this.y + this.bullet_length);
    }
}