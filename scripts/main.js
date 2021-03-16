
const canvas = document.getElementById('ebiShooterGameCanvas');

canvas.width = 1275;
canvas.height = 705;

const ctx = canvas.getContext('2d');

function resize() {
    const height = window.innerHeight - 20;

    const ratio = canvas.width / canvas.height;
    const width = height * ratio;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
}

window.addEventListener('load',resize,false);

function GameBasics(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;

    this.playBoundaries = {
        top: 150,
        bottom: 555,
        left: 150,
        right: 1125,
    };

    this.level = 1;
    this.score = 0;
    this.shields = 3;

    this.setting = {
        //FPS: 60 frame per 1 second, this means 1 new frame in every 0,01666667 secs
        updateSeconds: (1 / 60),
        arrowSpeed: 300,
        boneSpeed: 130,
        boneMaxFrequency: 500, //how fast the bones can shoot one after another

        balloonLines: 3,
        balloonColumns: 5,
        balloonSpeed: 35,
        balloonSinkingValue: 30,

        pumpkinSpeed: 75,
        pumpkinFrequency: 0.05,

        pointsPerBalloon: 20,
    };

    this.positionContainer = [];

    this.pressedKeys = {};
}

GameBasics.prototype.presentPosition = function () {
    return this.positionContainer.length > 0 ? this.positionContainer[this.positionContainer.length - 1] : null;
};

GameBasics.prototype.goToPosition = function (position) {
    if (this.presentPosition()) {
        this.positionContainer.length = 0;
    }

    if (position.entry) {
        position.entry(play);
    }

    this.positionContainer.push(position);
};

GameBasics.prototype.pushPosition = function(position) {
    this.positionContainer.push(position);
};

GameBasics.prototype.popPosition = function() {
    this.positionContainer.pop();
};


//my_image = new Image();
//my_image.src = 'images/ebi.svg';

//my_image.onload = function() {
//    return ctx.drawImage(my_image,100,100,410,605);
//};

GameBasics.prototype.start = function() {

    //setInterval(function() {exampleFunction()},1000);

    //let num = 1;

    //function exampleFunction() {
        //ctx.clearRect(0,0,play.width,play.height);
        //ctx.clearRect()
        //ctx.font = "90px Arial";
        //ctx.fillStyle = '#FFFFFF';
        //ctx.fillText(num,400,300);
        //num++;
    //}

    //
    setInterval(function () { gameLoop(play); }, this.setting.updateSeconds * 1000); //0,01666667 sec * 1000 = 16,67 ms
    //Go into the opening position
    this.goToPosition(new OpeningPosition());
    play.sounds.playSound('background');
};

GameBasics.prototype.keyDown = function (keyboardCode) {

    this.pressedKeys[keyboardCode] = true;

    if (this.presentPosition() && this.presentPosition().keyDown) {
        this.presentPosition().keyDown(this, keyboardCode);
    }
};

GameBasics.prototype.keyUp = function (keyboardCode) {

    delete this.pressedKeys[keyboardCode];
};


function gameLoop(play) {
    let presentPosition = play.presentPosition();

    if(presentPosition) {
        
        if(presentPosition.update) {
            presentPosition.update(play);
        }

        if(presentPosition.draw) {
            presentPosition.draw(play);
        }
    }
}


window.addEventListener("keydown", function (e) {
    const keyboardCode = e.which || event.keyCode; // Use either which or keyCode, depending on browser support
    if (keyboardCode == 37 || keyboardCode == 39 || keyboardCode == 32) { e.preventDefault(); } //space/left/right (32/37/29)
    play.keyDown(keyboardCode);
  });
  
  window.addEventListener("keyup", function (e) {
    const keyboardCode = e.which || event.keyCode; // Use either which or keyCode, depending on browser support
    play.keyUp(keyboardCode);
  });


const play = new GameBasics(canvas);
play.sounds = new Sounds();
play.sounds.init();
play.start();

//ctx.fillStyle = 'green';
//ctx.fillRect(0,0,150,75);

//ctx.font = '38px Arial';
//ctx.fillStyle = 'red';
//ctx.fillText("EBI",30,130);
//ctx.strokeText("BEBI",120,130);