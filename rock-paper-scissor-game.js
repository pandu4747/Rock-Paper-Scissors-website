/*Here, we used getItem method to convert JSON string into JS battleRecord object and when we removed battleRecord value from localStorage the output will be null and to avoid that we are giving another input using OR condition.*/
let battleRecord = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  lost: 0,
  draw: 0,
};

updateScoreboard();

/*Below function will make our game to run automatically for each second.*/
/*Also, we have created a variable yourMove and the value will be taken from compMove .It means both of the inputs are taken from the same variable compMove.*/
/*Finally, we also make the AUTO PLAY button work for both START & STOP of the game play by using IF Loop.*/

/*setInterval --> It actually returns a number.And this number is like an ID, which use it to stop the interval.And also everytime we run this function it gives us a different ID to save this we created a variable intervalId outside of the function.*/

/*To stop an interval we have a function called clearInterval()*/
let isNotPlaying = false;
let intervalId;

function autoPlay() {
  if (!isNotPlaying) {
    intervalId = setInterval(function () {
      const yourMove = selectcompMove();
      resultCheck(yourMove);
    }, 1000)
    isNotPlaying = true;
  } else {
    clearInterval(intervalId);
    isNotPlaying = false;
  }
}

/*The below code will make us to play the game with keyboard keys r-rock, p-paper, s-scissors.*/
/*We know every EVENTLISTENER have an eventObject.Here event is an EVENT OBJECT and it has a feature called key which get us what input we have given to it.*/
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    resultCheck('ROCK');
  } else if (event.key === 'p') {
    resultCheck('PAPER');
  } else if (event.key === 's') {
    resultCheck('SCISSORS');
  }
});

function resultCheck(yourMove) {
  const compMove = selectcompMove();
  let result = "";

  if (yourMove === "ROCK") {
    if (compMove === "ROCK") {
      result = "Draw";
    } else if (compMove === "PAPER") {
      result = "Better luck next time";
    } else if (compMove === "SCISSORS") {
      result = "You won the game";
    }
  } else if (yourMove === "PAPER") {
    if (compMove === "ROCK") {
      result = "You won the game";
    } else if (compMove === "PAPER") {
      result = "Draw";
    } else if (compMove === "SCISSORS") {
      result = "Better luck next time";
    }
  } else if (yourMove === "SCISSORS") {
    if (compMove === "ROCK") {
      result = "Better luck next time";
    } else if (compMove === "PAPER") {
      result = "You won the game";
    } else if (compMove === "SCISSORS") {
      result = "Draw";
    }
  }

  if (result === "You won the game") {
    battleRecord.wins += 1;
  } else if (result === "Better luck next time") {
    battleRecord.lost += 1;
  } else if (result === "Draw") {
    battleRecord.draw += 1;
  }

  /*Here we are using localStorage to save the result even though we refresh our page. setItem is a method in the localStorage object. And JSON only supports string that why we used JSON-stringify to convert our  JS score Object into a JSON string.*/

  localStorage.setItem("score", JSON.stringify(battleRecord));

  updateScoreboard();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-choosen").innerHTML = ` You
<img src="emoji/${yourMove}-emoji.png" class="emoji-css" />
<img src="emoji/${compMove}-emoji.png" class="emoji-css" />
Computer`;
}

function updateScoreboard() {
  document.querySelector(
    ".js-scoreboard"
  ).innerHTML = `WINS: ${battleRecord.wins} LOSE: ${battleRecord.lost} DRAW: ${battleRecord.draw}`;
}

function selectcompMove() {
  const randomNum = Math.random();
  let compMove = "";

  if (randomNum >= 0 && randomNum < 1 / 3) {
    compMove = "ROCK";
  } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
    compMove = "PAPER";
  } else if (randomNum >= 2 / 3 && randomNum < 1) {
    compMove = "SCISSORS";
  }
  console.log(compMove);

  return compMove;
}

