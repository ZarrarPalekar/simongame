var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = [];

var userClickedPattern = [];

var isStarted = false;

var level = 0;

function nextSequence() {
  userClickedPattern = [];
  $("h1").text("Level " + level);
  level++;
  var n = Math.random();
  var randomNumber = Math.floor(n * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);


  checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).on("keydown", function() {
  if (isStarted === false) {
    isStarted = true;
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
})

$(".btn_start").on("click", function() {
  if (isStarted === false) {
    isStarted = true;
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
})

function checkAnswer(currentLevel) {

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();



  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  isStarted = false;
}