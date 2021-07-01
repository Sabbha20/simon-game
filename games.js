
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$(document).keypress(function(){
    
    if (!started) {

        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    

    checkAnswer(userClickedPattern.length-1);
 //   console.log(userClickedPattern);
});


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
     //   console.log("Success");
        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }else{
        $("body").addClass("game-over")
        setTimeout(function () {
        $("body").removeClass("game-over")
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart")
     //   console.log("Error");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  //  console.log(gamePattern);
    
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
}

function playSound(name) {
    var audio = new Audio("sounds/" +name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass('pressed');
}, 100);
}



