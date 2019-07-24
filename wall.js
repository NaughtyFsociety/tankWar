function Wall(x,y){
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 40;

    this.update = function(){
        ctx.save();
        ctx.fillStyle = "#cc9933";
        ctx.beginPath();
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.strokeStyle = "#cc6633";
        ctx.strokeRect(this.x,this.y,this.width,this.height);
        ctx.strokeRect(this.x,this.y,20,20);
        ctx.strokeRect(this.x+20,this.y,20,20);
        ctx.strokeRect(this.x+40,this.y,20,20);
        ctx.strokeRect(this.x+10,this.y+20,20,20);
        ctx.strokeRect(this.x+30,this.y+20,20,20);
        // ctx.strokeRect(this.x,this.y,20,20);
        ctx.restore();
    }
    
}