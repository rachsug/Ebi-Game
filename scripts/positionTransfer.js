function TransferPosition(level) {
    this.level = level;
    this.opacity = 1;
    //play.sounds.playSound('background');
}

TransferPosition.prototype.update = function(play) {

    this.opacity -= 0.01;

    if(this.opacity < 0) { //2s -> 60fps
        play.goToPosition(new InGamePosition(play.setting, this.level));
    }

}

TransferPosition.prototype.draw = function(play) {
    ctx.clearRect(0, 0, play.width, play.height);
    ctx.font = "bold 100px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255,255,255,"+this.opacity+")";
    ctx.shadowColor="#cccece";
    ctx.shadowBlur=7;
    ctx.fillText("Level " + this.level, play.width/2, play.height/2);
}

//TransferPosition.prototype.draw = function(play) {
//    ctx.clearRect(0, 0, play.width, play.height);
//    ctx.font = "40px Ariel";
//    ctx.fillStyle = 'Black';
//    ctx.fillText("yeet", play.width/2, play.height/2);
//}
