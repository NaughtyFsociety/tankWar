//敌军全异步执行，用settimeout

function enemyTank(x,y,color){
    Tank.call(this);
    this.speedX = 0;
    this.speedY = 0;
    this.width = 30;
    this.height = 30;//坦克的宽和高;
    this.x = x;   //坦克位置
    this.y = y;   //坦克位置
    
    this.direct_list = ["UP","DOWN","LEFT","RIGHT"];
    this.direct = RandomDirect(this.direct_list);
    this.color = color;
    this.bullet_x; //子弹相对于tank出现的位置
    this.bullet_y; //子弹相对于tank出现的位置
    this.bullet_list = [];
    this.life = 3; //敌军坦克的生命值;
    this.isAlive = true;

    this.initDirectTime = new Date(); //初始化事件，如果下一次大于8s,改变坦克方向
    this.initShootTime = new Date();


    //敌军坦克的特有方法

    this.autoShoot = function(){
    
    }
    this.changeDirect = function(){

    }
    this.autoMove = function(){
        switch(this.direct){
            case "LEFT": //a
            this.speedX = -2;
            this.speedY = 0;
            break;
            case "RIGHT": //d
            this.speedX = 2;
            this.speedY = 0;
            break;
            case "UP": //w
            this.speedX = 0;
            this.speedY = -2;
            break;
            case "DOWN":
            this.speedX = 0;
            this.speedY = 2;
            break;
        }
        var nowDirectTime = new Date();
        var nowShootTime = new Date();

        if( nowDirectTime - this.initDirectTime > 3000){
            this.direct = RandomDirect(this.direct_list);
            this.initDirectTime = nowDirectTime;
        }
        if( nowShootTime - this.initShootTime > 1000){
            this.shoot();
            this.initShootTime = nowShootTime;
        }
    }
    this.update = function(){
        this.autoMove();
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
    }
}

enemyTank.prototype = new Tank();
