function GameOverPosition() {

}

GameOverPosition.prototype.draw = function() {
    ctx.clearRect(0,0,play.width,play.height);
    ctx.font="bold 80px Arial";
    ctx.textAlign="center";
    ctx.fillStyle = "white";
    ctx.fillText("Game Over!", play.width / 2, play.height/2 - 120);

    ctx.font="40px Arial";
    ctx.textAlign="center";
    ctx.fillStyle = "white";
    ctx.fillText("You reached level: " + play.level + " with score: " + play.score, play.width / 2, play.height/2 - 20);

    ctx.font="40px Arial";
    ctx.textAlign="center";
    ctx.fillStyle = "white";
    ctx.fillText("Press 'Space' to play again", play.width / 2, play.height/2 + 60);

}

GameOverPosition.prototype.keyDown = function(play,keyboardCode) {
    if(keyboardCode == 32) {
        play.goToPosition(new OpeningPosition());
    }
}