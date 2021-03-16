function InGamePosition(setting, level) {
    this.setting = setting;
    this.level = level;
    this.object = null;
    this.arrow = null;
    this.ebi = null;
    this.bones = [];
    this.lastBoneTime = null;
    this.balloons = [];
    this.pumpkins = [];
    this.mute = null;
    this.unmute = null;
    this.heart3 = null;
    this.heart2 = null;
    this.heart1 = null;
    //play.sounds.playSound('background');
}

InGamePosition.prototype.entry = function (play) {
    this.horizontalMoving = 1;
    this.verticalMoving = 0;
    this.balloonsAreSinking = false;
    this.balloonPresentSinkingValue = 0;
    this.turnAround = 1;
    this.arrow_image = new Image(); 
    this.ebi_image = new Image();
    this.bone_image = new Image();
    this.balloon_image = new Image();
    this.pumpkin_image = new Image();
    this.mute_image = new Image();
    this.unmute_image = new Image();
    this.heart3_image = new Image();
    this.heart2_image = new Image();
    this.heart1_image = new Image();
    this.upSec = this.setting.updateSeconds;

    this.arrowSpeed = this.setting.arrowSpeed;
    this.object = new Objects();
    this.arrow = this.object.arrow((play.width / 2), (play.playBoundaries.bottom + 90), this.arrow_image);
    
    let presentLevel = this.level;
    this.balloonSpeed = this.setting.balloonSpeed + (presentLevel * 7);
    this.pumpkinSpeed = this.setting.pumpkinSpeed + (presentLevel * 10);
    this.pumpkinFrequency = this.setting.pumpkinFrequency + (presentLevel * 0.05);

    this.object = new Objects();
    this.ebi = this.object.ebi((play.width / 2), (play.height / 2), this.ebi_image);

    this.object = new Objects();
    this.bone = this.object.bone((play.width / 2), (play.height / 2), this.bone_image);

    this.object = new Objects();
    this.pumpkin = this.object.pumpkin((play.width / 2), (play.height / 2), this.pumpkin_image);

    this.object = new Objects();
    this.mute = this.object.mute((play.width / 2), (play.height / 2), this.mute_image);

    this.object = new Objects();
    this.unmute = this.object.unmute((play.width / 2), (play.height / 2), this.unmute_image);

    this.object = new Objects();
    this.heart3 = this.object.heart3((play.width / 2), (play.height / 2), this.heart3_image);

    this.object = new Objects();
    this.heart2 = this.object.heart2((play.width / 2), (play.height / 2), this.heart2_image);

    this.object = new Objects();
    this.heart1 = this.object.heart1((play.width / 2), (play.height / 2), this.heart1_image);


    const lines = this.setting.balloonLines;
    const columns = this.setting.balloonColumns;
    const balloonsInitial = [];

    let line, column;
    for (line = 0; line < lines; line++) {
        for (column = 0; column < columns; column++) {
            this.object = new Objects();
            let x,y;
            x = (play.width/2) + (column * 50) + ((columns - 1)*35);
            y = (play.playBoundaries.top + 30) + (line * 50);
            balloonsInitial.push(this.object.balloon(
                x,
                y,
                line,
                column,
                this.balloon_image,
            ));
        }
    }
    this.balloons = balloonsInitial;
};

InGamePosition.prototype.update = function (play) {

    const arrow = this.arrow;
    const arrowSpeed = this.arrowSpeed;
    const upSec = this.setting.updateSeconds;
    const bones = this.bones;

    if (play.pressedKeys[37]) {
        arrow.x -= arrowSpeed * upSec;
    }
    if (play.pressedKeys[39]) {
        arrow.x += arrowSpeed * upSec;
    }
    // to shoot, press space
    if (play.pressedKeys[32]) {
        this.shoot();
    }
    if(arrow.x > play.playBoundaries.right) {
        arrow.x = play.playBoundaries.right;
    }
    if(arrow.x < 650) {
        arrow.x = 650;
    }

    for (let i = 0; i < bones.length; i++) {
        let bone = bones[i];
        bone.y -= upSec * this.setting.boneSpeed;
        if (bone.y < 0) {
            bones.splice(i--, 1);
        }
    }

    let reachedSide = false;

    for (let i = 0; i < this.balloons.length; i++) {
        let balloon = this.balloons[i];
        let fresh_x = balloon.x + this.balloonSpeed * upSec * this.turnAround * this.horizontalMoving;
        let fresh_y = balloon.y + this.balloonSpeed * upSec * this.verticalMoving;

        if (fresh_x > play.playBoundaries.right || fresh_x < 650) {
            this.turnAround *= -1;
            reachedSide = true;
            this.horizontalMoving = 0;
            this.verticalMoving = 1;
            this.balloonsAreSinking = true;
        }
        
        if (reachedSide !== true) {
            balloon.x = fresh_x;
            balloon.y = fresh_y;
        }
    }

    if (this.balloonsAreSinking == true) {
        this.balloonPresentSinkingValue += this.balloonSpeed * upSec;
        if (this.balloonPresentSinkingValue >= this.setting.balloonSinkingValue) {
            this.balloonsAreSinking = false;
            this.verticalMoving = 0;
            this.horizontalMoving = 1;
            this.balloonPresentSinkingValue = 0;
        }
    }

    const frontlineBalloons = [];
    for (let i = 0; i < this.balloons.length; i++) {
        let balloon = this.balloons[i];
        if (!frontlineBalloons[balloon.column] || frontlineBalloons[balloon.column].line < balloon.line) {
            frontlineBalloons[balloon.column] = balloon;
        }
    }

    for (let i = 0; i < this.setting.balloonColumns; i++) {
        let balloon = frontlineBalloons[i];
        if (!balloon) continue;
        let chance = this.pumpkinFrequency * upSec;
        this.object = new Objects();
        if (chance > Math.random()) {
            this.pumpkins.push(this.object.pumpkin(balloon.x, balloon.y + balloon.height/2, this.pumpkin_image));
            play.sounds.playSound('drop');
        }
    }

    for (let i = 0; i < this.pumpkins.length; i++) {
        let pumpkin = this.pumpkins[i];
        pumpkin.y += upSec * this.pumpkinSpeed;
        if (pumpkin.y > this.height) {
            this.pumpkins.splice(i--, 1);
        }
    }

    // Balloon-bone collision
    for (let i = 0; i < this.balloons.length; i++) {
        let balloon = this.balloons[i];
        let collision = false;
        for (let j = 0; j < bones.length; j++) {
            let bone = bones[j];
            if (bone.x >= (balloon.x - balloon.width/2) && bone.x <= (balloon.x + balloon.width/2) &&
                bone.y >= (balloon.y - balloon.height/2) && bone.y <= (balloon.y + balloon.height/2)) {
                bones.splice(j--,1);
                collision = true;
                play.score += this.setting.pointsPerBalloon;
            }
        }

        if (collision == true) {
            this.balloons.splice(i--, 1);
            play.sounds.playSound('pop');
        }
    }

    // arrow-pumpkin collision
    for (let i = 0; i < this.pumpkins.length; i++) {
        let pumpkin = this.pumpkins[i];
        if (pumpkin.x >= (arrow.x - arrow.width/2) &&
            pumpkin.x <= (arrow.x + arrow.width/2) &&
            pumpkin.y >= (arrow.y - arrow.height/2) &&
            pumpkin.y <= (arrow.y + arrow.height/2)) {
                this.pumpkins.splice(i--, 1);
                play.sounds.playSound('bork');
                play.shields--;
            }
    }

    //arrow-balloon collision
    for (let i = 0; i < this.balloons.length; i++) {
        let balloon = this.balloons[i];
        if((balloon.x + balloon.width/2) > (arrow.x - arrow.width/2) &&
            (balloon.x - balloon.width/2) < (arrow.x + arrow.width/2) &&
            (balloon.y + balloon.height/2) > (arrow.y - arrow.height/2) &&
            (balloon.y - balloon.height/2) < (arrow.y + arrow.height/2)) {
            play.sounds.playSound('death');
            play.shields = -1;
        }
    }

    if(play.shields<0) {
        play.goToPosition(new GameOverPosition());
    }

    if(this.balloons.length == 0) {
        play.level += 1;
        play.goToPosition(new TransferPosition(play.level));
    }
};


InGamePosition.prototype.draw = function (play) {
    ctx.clearRect(0, 0, play.width, play.height);
    ctx.drawImage(this.arrow_image, this.arrow.x - (this.arrow.width / 2), this.arrow.y - (this.arrow.height / 2));
    ctx.drawImage(this.ebi_image, 100,100,410,605);
    for (let i = 0; i < this.bones.length; i++) {
        let bone = this.bones[i];
        ctx.drawImage(this.bone_image, bone.x - (bone.width / 2) + 4, bone.y - (bone.height / 2) - 2);
    }

    for (let i = 0; i < this.balloons.length; i++) {
        let balloon = this.balloons[i];
        ctx.drawImage(this.balloon_image, balloon.x - (balloon.width / 2), balloon.y - (balloon.height / 2));
    }

    for (let i = 0; i < this.pumpkins.length; i++) {
        let pumpkin = this.pumpkins[i];
        ctx.drawImage(this.pumpkin_image, pumpkin.x - (pumpkin.width / 2), pumpkin.y - (pumpkin.height / 2));
    }

    if (play.sounds.muted === true) {
        ctx.drawImage(this.mute_image, 1215,25,30,30);
    } else {
        ctx.drawImage(this.unmute_image, 1215,25,30,30);
    }
    ctx.font="15px Arial";
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.fillText("Press m to turn sound ON/OFF", 20, 30);

    ctx.font="15px Arial";
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.fillText("Press p to pause", 20, 50);

    ctx.font = "bold 24px Arial";
    ctx.textAlign = 'center';
    const gradient = ctx.createLinearGradient(600,0,620,0);
    gradient.addColorStop("0","#f57b42");
    gradient.addColorStop("0.5","red");
    gradient.addColorStop("0.75","#f57b42");
    gradient.addColorStop("1.0","red");
    ctx.fillStyle = gradient;
    ctx.fillText("Level: ", 620, 40);
    ctx.fillStyle = 'white';
    ctx.fillText(play.level, 690, 40);

    ctx.font = "bold 24px Arial";
    ctx.textAlign = 'center';
    const gradient2 = ctx.createLinearGradient(550,0,600,0);
    gradient2.addColorStop("0","#f57b42");
    gradient2.addColorStop("0.5","red");
    gradient2.addColorStop("0.75","#f57b42");
    gradient2.addColorStop("1.0","red");
    ctx.fillStyle = gradient2;
    ctx.fillText("Score: ", 620, 70);
    ctx.fillStyle = 'white';
    ctx.fillText(play.score, 690, 70);

    if (play.shields == 3) {
        ctx.drawImage(this.heart3_image, 1220,550,20,78);
    } else if (play.shields == 2) {
        ctx.drawImage(this.heart2_image, 1220,578,20,49);
    } else if (play.shields == 1) {
        ctx.drawImage(this.heart1_image, 1220,606,20,20);
    }
}

InGamePosition.prototype.shoot = function() {
    if (this.lastBoneTime === null || ((new Date()).getTime() - this.lastBoneTime) > (this.setting.boneMaxFrequency)) {
        this.object = new Objects();
        this.bones.push(this.object.bone(this.arrow.x, this.arrow.y - this.arrow.height/2, this.setting.boneSpeed));
        this.lastBoneTime = (new Date()).getTime();
        play.sounds.playSound('shot');
    }
};

//my_image = new Image();
//my_image.src = 'images/ebi.svg';

//my_image.onload = function() {
//    return ctx.drawImage(my_image,100,100,410,605);
//};

InGamePosition.prototype.keyDown = function(play,keyboardCode) {
    // left key is 37, right is 39
    if(keyboardCode==77) {
        play.sounds.mute();
    }

    if(keyboardCode==80) {
        play.pushPosition(new PausePosition());
    }
};