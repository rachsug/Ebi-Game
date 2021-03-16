function Sounds() {
    this.muted = false;
}

Sounds.prototype.init = function() {
    this.sound = new Audio();
    this.sound.src = "sounds/shoot.mp3";
    this.sound.setAttribute("preload","auto");

    this.sound2 = new Audio();
    this.sound2.src = "sounds/Pop.wav";
    this.sound2.setAttribute("preload","auto");

    this.sound3 = new Audio();
    this.sound3.src = "sounds/Dog2.wav";
    this.sound3.setAttribute("preload","auto");

    this.sound4 = new Audio();
    this.sound4.src = "sounds/Crunch.wav";
    this.sound4.setAttribute("preload","auto");

    this.sound5 = new Audio();
    this.sound5.src = "sounds/drop.wav";
    this.sound5.setAttribute("preload","auto");

    this.sound6 = new Audio();
    this.sound6.src = "sounds/DanceMagic.wav";
    this.sound6.setAttribute("preload","auto");
    
};

Sounds.prototype.playSound = function(soundName) {

    if(this.muted == true) {
        return;
    }
    if(soundName == 'shot') {
        this.sound.play();
        this.sound.currentTime = 0;
    }

    if(soundName == 'pop') {
        this.sound2.play();
        this.sound2.currentTime = 0;
    }

    if(soundName == 'bork') {
        this.sound3.play();
        this.sound3.currentTime = 0;
    }

    if(soundName == 'death') {
        this.sound4.play();
        this.sound4.currentTime = 0;
    }

    if(soundName == 'drop') {
        this.sound5.play();
        this.sound5.currentTime = 0;
    }

    if(soundName == 'background') {
        this.sound6.play();
    } 
};

Sounds.prototype.mute = function() {
    if(this.muted == false) {
        this.muted = true;
    } else if (this.muted == true) {
        this.muted = false;
    }
};

