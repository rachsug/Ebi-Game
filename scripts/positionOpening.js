function OpeningPosition() {
    this.mute = null;
    this.unmute = null;
    play.sounds.playSound('background');
}

OpeningPosition.prototype.draw = function(play) {
    // Ebi Bebi
    ctx.clearRect(0,0,play.width,play.height);
    ctx.font="80px Arial";
    ctx.textAlign="center";
    const gradient = ctx.createLinearGradient((play.width/2-180),(play.height/2),(play.width/2+180),(play.width/2));
    gradient.addColorStop("0","#f57b42");
    gradient.addColorStop("0.12","red");
    gradient.addColorStop("0.25","#f57b42");
    gradient.addColorStop("0.5","red");
    gradient.addColorStop("0.75","#f57b42");
    gradient.addColorStop("1.0","red");
    ctx.fillStyle = gradient;
    ctx.fillText("EBI's DAY OUT", play.width/2,play.height/2-70);

    // Press 'Space' to start
    ctx.font="40px Arial";
    ctx.fillStyle="white";
    ctx.shadowColor="#cccece";
    ctx.shadowBlur=7;
    ctx.fillText("Press 'Space Key' to start",play.width/2,play.height/2);

    // Game controls
    ctx.fillStyle="red";
    ctx.shadowColor="#cccece";
    ctx.shadowBlur=6;
    ctx.fillText("How To Play",play.width/2,play.height/2+210);
    ctx.fillStyle="white";
    ctx.shadowColor="#cccece";
    ctx.shadowBlur=7;
    ctx.fillText("Left Key : Move Left",play.width/2,play.height/2+260);
    ctx.fillText("Right Key : Move Right", play.width/2, play.height/2+300);
    ctx.fillText("Space Key : Throw",play.width/2, play.height/2+340);
    
    this.mute_image = new Image();
    this.unmute_image = new Image();

    this.object = new Objects();
    this.mute = this.object.mute((play.width / 2), (play.height / 2), this.mute_image);

    this.object = new Objects();
    this.unmute = this.object.unmute((play.width / 2), (play.height / 2), this.unmute_image);


    if (play.sounds.muted === true) {
        ctx.drawImage(this.mute_image, 1215,25,30,30);
        
    } else {
        ctx.drawImage(this.unmute_image, 1215,25,30,30);
    }

    ctx.font="15px Arial";
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.fillText("Press m to turn sound ON/OFF", 20, 30);

};

// keycode.info
OpeningPosition.prototype.keyDown = function(play, keyboardCode) {

    if(keyboardCode==77) {
        play.sounds.mute();
    }

    if(keyboardCode == 32) {
        play.level = 1;
        play.score = 0;
        play.shields = 3;
        play.goToPosition(new TransferPosition(play.level));
    }


};