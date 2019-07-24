function Tank(x,y,color,bullet_color){
    // this.speedX = 0;
    // this.speedY = 0;
    // this.width = 30;
    // this.height = 30;//坦克的宽和高;
    // this.x = x;   //坦克位置
    // this.y = y;   //坦克位置
    // this.direct = "UP"
    // this.color = color;
    // this.bullet_x; //子弹相对于tank出现的位置
    // this.bullet_y; //子弹相对于tank出现的位置
    // this.bullet_list = [];


    // this.shoot = function(){
    //     this.bullet_list.push(new Bullet(this.bullet_x,this.bullet_y,this.direct));
    // }
}
Tank.prototype.update = function(){
    this.draw();
    //子弹遇见以下情况应当从数组中删除；
    if( this.bullet_list.length>0){
        for(var i = 0; i <this.bullet_list.length ; i++){
            //如果子弹超出边界
            if(this.bullet_list[i].x<0||this.bullet_list[i].x>canvas.width||this.bullet_list[i].y<0||this.bullet_list[i].y>canvas.height){
                this.bullet_list.splice(i,1);
                 //如果子弹碰撞到其它物体
            }else if(this.bullet_list[i].iscollision == true){
                this.bullet_list.splice(i,1);
            }else{
                this.bullet_list[i].update();
            }
        }
    }
    
    // this.bullet_list.map(function(item,key){
    //     if(item.x<0||item.x>canvas.width||item.y<0||item.y>canvas.height){
    //         this.bullet_list.splice(key,0);
    //     }else{
    //         item.update();
    //     }
    // })
}
Tank.prototype.draw = function(){
    this.x += this.speedX;
    this.y += this.speedY;

    //先检查是否出界
    if(this instanceof myHero){
        var outsideObj = outside(this.x,this.y,canvas.width-this.width,canvas.height-this.height);
        this.x = outsideObj.x;
        this.y = outsideObj.y;
    }else if(this instanceof enemyTank){
        var outsideObj = enemyOutside(this.x,this.y,this.direct,canvas.width-this.width,canvas.height-this.height);
        this.x = outsideObj.x;
        this.y = outsideObj.y;
        this.direct = outsideObj.direct;
    }
    

    //在检测herotank是否和墙触碰(9个参数)
    if(this instanceof myHero){
        var collisionObj = collision(this.x,this.y,this.width,this.height,this.direct,wall.x,wall.y,wall.width,wall.height)
        this.x = collisionObj.x;
        this.y = collisionObj.y;
        this.direct = collisionObj.direct;
    } else if(this instanceof enemyTank){
        var collisionObj = enemyTankCollision(this.x,this.y,this.width,this.height,this.direct,wall.x,wall.y,wall.width,wall.height)
        this.x = collisionObj.x;
        this.y = collisionObj.y;
        this.direct = collisionObj.direct;
    }
    
    // if(this.x < 0){
    //     this.x = 0;
    // } else if(this.x > canvas.width - this.width){
    //     this.x = canvas.width - this.width;
    // } else if(this.y < 0){
    //     this.y = 0;
    // } else if(this.y > canvas.height - this.height){
    //     this.y = canvas.height - this.height;
    // }
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.shadowColor = "red";
    ctx.shadowBlur = 10;
    switch(this.direct){
        case "LEFT":
        this.left_direct();
        break;
        case "RIGHT":
        this.right_direct();
        break;
        case "UP":
        this.up_direct();
        break;
        case "DOWN":
        this.down_direct();
        break;
    }
    ctx.restore();
}
Tank.prototype.left_direct = function(){
    ctx.fillRect(this.x,this.y,this.height,10);//坦克左边
    ctx.fillRect(this.x+10,this.y+10,10,15);
    ctx.fillRect(this.x,this.y+20,this.height,10);//坦克右边
    ctx.fillRect(this.x+10,this.y+13,-15,4);
    this.bullet_x = this.x - 8;                    //子弹距枪口3px;比原点x多8px,子弹用线来画的
    this.bullet_y = this.y + 15;
}
Tank.prototype.right_direct = function(){
    ctx.fillRect(this.x,this.y,this.height,10);//坦克左边
    ctx.fillRect(this.x+10,this.y+10,10,15);
    ctx.fillRect(this.x,this.y+20,this.height,10);//坦克右边
    ctx.fillRect(this.x+20,this.y+13,15,4);
    this.bullet_x = this.x + 38;
    this.bullet_y = this.y + 15; 
}
Tank.prototype.up_direct = function(){
    ctx.fillRect(this.x,this.y,10,this.height);//坦克左边
    ctx.fillRect(this.x+10,this.y+10,15,10);
    ctx.fillRect(this.x+20,this.y,10,this.height);//坦克右边
    ctx.fillRect(this.x+13,this.y+10,4,-15);
    this.bullet_x = this.x + 15;
    this.bullet_y = this.y - 8;
}
Tank.prototype.down_direct = function(){
    ctx.fillRect(this.x,this.y,10,this.height);//坦克左边
    ctx.fillRect(this.x+10,this.y+10,15,10);
    ctx.fillRect(this.x+20,this.y,10,this.height);//坦克右边
    ctx.fillRect(this.x+13,this.y+20,4,15);
    this.bullet_x = this.x + 15;
    this.bullet_y = this.y + 38;
}
Tank.prototype.shoot = function(){
    if(this.bullet_list.length<6){
        this.bullet_list.push(new Bullet(this.bullet_x,this.bullet_y,this.direct,this,this.bullet_color));
    }
    
}