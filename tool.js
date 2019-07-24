
//判断myHero是否出界
function outside(self_x,self_y,target_width,target_height){
    if(self_x < 0){
        self_x = 0;
    } else if(self_x > target_width){
        self_x = target_width;
    } else if(self_y < 0){
        self_y = 0;
    } else if(self_y > target_height){
        self_y = target_height; 
    }
    return {
        x:self_x,
        y:self_y
    }
}
//判断enemy是否出界
function enemyOutside(self_x,self_y,self_direct,target_width,target_height){
    if(self_x < 0){
        self_x = 0;
        self_direct = "RIGHT";
    } else if(self_x > target_width){
        self_x = target_width;
        self_direct = "LEFT";
    } else if(self_y < 0){
        self_y = 0;
        self_direct = "DOWN";
    } else if(self_y > target_height){
        self_y = target_height; 
        self_direct = "UP";
    }
    return {
        x:self_x,
        y:self_y,
        direct:self_direct
    }
}


//检测是否碰撞
//self -- 被检测物 坦克是否撞墙
function collision(self_x,self_y,self_width,self_height,self_direct,target_x,target_y,target_width,target_height){
    if(self_x > target_x - self_width && self_x < target_x + target_width && self_y > target_y - self_height && self_y < target_y + target_height){
        switch(self_direct){
            case "LEFT":
            self_x = target_x + target_width;
            // self_direct = "RIGHT";
            break;
            case "RIGHT":
            self_x = target_x - self_width;
            // self_direct = "LEFT";
            break;
            case "UP":
            self_y = target_y + target_height;
            // self_direct = "DOWN";
            break;
            case "DOWN":
            self_y = target_y - self_height;
            // self_direct = "UP";
            break;
        }
    }
    return {
        x:self_x,
        y:self_y,
        direct:self_direct
    };
}

function enemyTankCollision(self_x,self_y,self_width,self_height,self_direct,target_x,target_y,target_width,target_height){
    if(self_x > target_x - self_width && self_x < target_x + target_width && self_y > target_y - self_height && self_y < target_y + target_height){
        switch(self_direct){
            case "LEFT":
            self_x = target_x + target_width + 1;
            self_direct = "RIGHT";
            break;
            case "RIGHT":
            self_x = target_x - self_width - 1;
            self_direct = "LEFT";
            break;
            case "UP":
            self_y = target_y + target_height - 1;
            self_direct = "DOWN";
            break;
            case "DOWN":
            self_y = target_y - self_height + 1;
            self_direct = "UP";
            break;
        }
    }
    return {
        x:self_x,
        y:self_y,
        direct:self_direct
    };
}




// 子弹是否碰撞其他物体
function isBulletCollison(self_x,self_y,self_width,self_height,target_x,target_y,target_width,target_height){
    if(self_x > target_x - self_width && self_x < target_x + target_width && self_y > target_y - self_height && self_y < target_y + target_height){
        return true;
    } else {
        return false;
    }
    
}

// 随机生成方向
function RandomDirect(arr){
    var index = Math.floor( Math.random()*4);
    console.log(index);
     return arr[index];
}


