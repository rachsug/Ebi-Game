function PausePosition() {

}

PausePosition.prototype.draw = function(play) {
    ctx.clearRect(0, 0, play.width, play.height);
    ctx.font="bold 40px Arial";
    ctx.fillStyle = "red"
    ctx.textAlign = "center";
    ctx.fillText("GAME PAUSED", play.width/2, play.height/2 - 100);

    ctx.font="bold 30px Arial";
    ctx.fillStyle = "white"
    ctx.textAlign = "center";
    ctx.fillText("Press ESC to go to main menu", play.width/2, play.height/2 - 50);

    ctx.font="bold 30px Arial";
    ctx.fillStyle = "white"
    ctx.textAlign = "center";
    ctx.fillText("Press P to resume game", play.width/2, play.height/2 );
};

PausePosition.prototype.keyDown = function(play, keyboardCode) {
    if(keyboardCode == 80) {
        play.popPosition();
    }
    if(keyboardCode == 27) {
        play.pushPosition(new OpeningPosition());
    }
};