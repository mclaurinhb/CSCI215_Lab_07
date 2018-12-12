// JavaScript for creating interactive animations on a canvas 
////////////////////////////////////////////////////////////////////
// Create a Mario object which contains all the info about Mario
// Objects are nice because they allow up to keep all the relevant
// info about an item in one place.

var Mario;
////////////////////////////////////////////////////////////////////


window.onload = init; // calls the function named "init"

// declare the background image
var bgImage = new Image();

// Is called when the window loads;
function init() {
    marioImage = new Image();
    bgImage = new Image();
    Mario = {
        x: 100,
        y: 600,
        w: 50,
        h: 80,
        JumpSound: new Audio('jump.wav'),
        BackgroundSound: new Audio('mario_08.wav'),
        Image: (function() {
            var temp = new Image();
            temp.src = "mario1.png";
            return temp;})(),
        moving: "no",
        timer: "",
        timerInterval: 10
    };
    bgImage.src = "marioBG.jpg";
    draw();

}



function draw() {

    var ctx = document.getElementById("mario_canvas").getContext("2d");


    bgImage.onload = function(){
        ctx.drawImage(bgImage, 0, 0);
        ctx.drawImage(marioImage, 100, 615, 50, 80);

    }



    var render = function () {
        ctx.drawImage(bgImage, 0, 0);
        renderMario();
    }
    function renderMario(){
        Mario.BackgroundSound.play();
        if (Mario.y > 500 && Mario.moving == "up") {
            Mario.Image.src = "mario2.png";
            ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
            Mario.y -= 5;
        }else if(Mario.y <= 500 && Mario.moving == "up"){
            Mario.moving = "down";
        } else if(Mario.y < 623 && Mario.moving == "down"){
            Mario.Image.src = "mario2.png";
            ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
            Mario.y += 5;
        }else if(Mario.y == 623 && Mario.moving == "no"){
            Mario.moving = "up";
        }
        else{
            Mario.moving = "no";
            marioImage.src = "mario1.png";
            ctx.drawImage(marioImage, Mario.x, Mario.y, Mario.w, Mario.h);
            clearInterval(Mario.timer);
        }
    }


    document.body.onkeydown = function(e) {
        e = event || window.event;
        var keycode = e.charCode || e.keyCode;
        console.log(keycode);
        if(keycode === 13 ) {
            Mario.moving = "up";
            Mario.JumpSound.play();
            Mario.timer = setInterval(render, Mario.timerInterval);
        }
        if(keycode === 37 && Mario.x > 0) {
            Mario.moving = "left";
            marioImage.src = "marioturnsleft.png";
            ctx.drawImage(marioImage, Mario.x, Mario.y, Mario.w, Mario.h);
            Mario.timer = setTimeout(faceForward, 200);
            leftTurn(Mario.moving);
        }
        if(keycode === 39 && Mario.x <= 1145) {
            Mario.moving = "right";
            Mario.x += 5;
            marioImage.src = "marioturnsright.png";
            ctx.drawImage(marioImage, Mario.x, Mario.y, Mario.w, Mario.h);
            Mario.timer = setTimeout(faceForward, 200);
            rightTurn(Mario.moving);
        }
    }
    function leftTurn () {
        ctx.drawImage(bgImage, 0, 0);
        Mario.Image.src = "marioturnsleft.png";
        ctx.drawImage(marioImage, Mario.x, Mario.y, Mario.w, Mario.h);
        faceForward(setTimeout(faceForward, 200));
        if(Mario.moving == "left" && Mario.x > 0) {
            Mario.x -= 5;
        }
    }

    function rightTurn () {
        ctx.drawImage(bgImage, 0, 0);
        Mario.Image.src = "marioturnsright.png";
        ctx.drawImage(marioImage, Mario.x, Mario.y, Mario.w, Mario.h);
        faceForward(setTimeout(faceForward, 200));
        if(Mario.moving == "right" && Mario.x <= 1145) {
            Mario.x += 5;
        }
    }

    function faceForward() {
        ctx.drawImage(bgImage, 0, 0);
        Mario.Image.src = "mario1.png"
        ctx.drawImage(marioImage, Mario.x, Mario.y, Mario.w, Mario.h);
        clearTimeout();
    }

}
