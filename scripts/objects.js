
function Objects() {
};

Objects.prototype.arrow = function(x,y,arrow_image) {
    this.x = x;
    this.y = y;
    this.width = 42
    this.height = 68;
    this.arrow_image = arrow_image;
    this.arrow_image.src = "images/arrow.svg";
    return this;
};

Objects.prototype.ebi = function(x,y,ebi_image) {
    this.x = x;
    this.y = y;
    this.width = 211;
    this.height = 338;
    this.ebi_image = ebi_image;
    this.ebi_image.src = "images/ebi.svg";
    return this;
};

Objects.prototype.bone = function(x,y,bone_image) {
    this.x = x;
    this.y = y;
    this.width = 22;
    this.height = 55;
    this.bone_image = bone_image;
    this.bone_image.src = "images/bone.svg";
    return this;
};

Objects.prototype.balloon = function(x,y,line,column,balloon_image) {
    this.x = x;
    this.y = y;
    this.line = line; //row
    this.column = column;
    this.width = 43;
    this.height = 56;
    this.balloon_image = balloon_image;
    this.balloon_image.src = "images/balloon.svg";
    return this;
};

Objects.prototype.pumpkin = function(x,y,pumpkin_image) {
    this.x = x;
    this.y = y;
    this.width = 23;
    this.height = 47;
    this.pumpkin_image = pumpkin_image;
    this.pumpkin_image.src = "images/pumpkin.svg";
    return this;
};


Objects.prototype.mute = function(x,y,mute_image) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.mute_image = mute_image;
    this.mute_image.src = "images/muted.svg";
    return this;
};

Objects.prototype.unmute = function(x,y,unmute_image) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.unmute_image = unmute_image;
    this.unmute_image.src = "images/unmuted.svg";
    return this;
};

Objects.prototype.heart3 = function(x,y,heart3_image) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 117;
    this.heart3_image = heart3_image;
    this.heart3_image.src = "images/heart3.svg";
    return this;
};

Objects.prototype.heart2 = function(x,y,heart2_image) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 74;
    this.heart2_image = heart2_image;
    this.heart2_image.src = "images/heart2.svg";
    return this;
};

Objects.prototype.heart1 = function(x,y,heart1_image) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.heart1_image = heart1_image;
    this.heart1_image.src = "images/heart1.svg";
    return this;
};