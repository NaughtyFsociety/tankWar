function myHero (x,y,color,bullet_color){
    Tank.call(this);    
    this.speedX = 0;
    this.speedY = 0;
    this.width = 30;
    this.height = 30;//坦克的宽和高;
    this.x = x;   //坦克位置
    this.y = y;   //坦克位置
    this.direct = "UP"
    this.color = color;
    this.bullet_x; //子弹相对于tank出现的位置
    this.bullet_y; //子弹相对于tank出现的位置
    this.bullet_list = [];


    this.bullet_color = bullet_color;
    this.life = 2;
    this.isalive = true;
    this.keydownhandle = function(e){
        switch(e.keyCode){
            case 65: //a
            this.speedY = 0;
            this.speedX = -2;
            this.direct = "LEFT"
            break;
            case 68: //d
            this.speedY = 0;
            this.speedX = 2;
            this.direct = "RIGHT"
            break;
            case 87: //w
            this.speedX = 0;
            this.speedY = -2;
            this.direct = "UP"
            break;
            case 83:
            this.speedX = 0;
            this.speedY = 2;
            this.direct = "DOWN"
            break;
            case 74:
            // console.log("发射子弹");
            this.shoot();
        }
    }
}

myHero.prototype = new Tank();

