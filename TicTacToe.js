/*
*	MODEL----------------------------------------------------------------------------------
*/

var board = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
];

var playerWin = false;
var compWin = false;

var turnCount = 0;

var ai = "mary";

function changeSpace(row, col, value){
	if (board[row][col] === 0){
		board[row][col] = value;
	}
	else console.log("Error");
}



function testPlayerWin(){
	//row test
	if(board[0][0] + board[0][1] + board[0][2] === 3) return true;
	if(board[1][0] + board[1][1] + board[1][2] === 3) return true;
	if(board[2][0] + board[2][1] + board[2][2] === 3) return true;
	
	//column test
	if(board[0][0] + board[1][0] + board[2][0] === 3) return true;
	if(board[0][1] + board[1][1] + board[2][1] === 3) return true;
	if(board[0][2] + board[1][2] + board[2][2] === 3) return true;
	
	//diagonal test
	if(board[0][0] + board[1][1] + board[2][2] === 3) return true;
	if(board[0][2] + board[1][1] + board[2][0] === 3) return true;
	
	return false;
}

function testComputerWin(){
	//row test
	if(board[0][0] + board[0][1] + board[0][2] === -3) return true;
	if(board[1][0] + board[1][1] + board[1][2] === -3) return true;
	if(board[2][0] + board[2][1] + board[2][2] === -3) return true;
	
	//column test
	if(board[0][0] + board[1][0] + board[2][0] === -3) return true;
	if(board[0][1] + board[1][1] + board[2][1] === -3) return true;
	if(board[0][2] + board[1][2] + board[2][2] === -3) return true;
	
	//diagonal test
	if(board[0][0] + board[1][1] + board[2][2] === -3) return true;
	if(board[0][2] + board[1][1] + board[2][0] === -3) return true;
	
	return false;
}

function testTie(){
	if (turnCount === 9){
		return true;
	}
	else return false;
}



/*
*	Controller----------------------------------------------------------------------------------
*/
function play(btn, row, col){
	if(playerWin === false && compWin === false){
		console.log(board);
		//Player Picks Spot
		if(board[row][col] === 0){
			document.getElementById(btn).style.color = "#ea4848";
			document.getElementById(btn).innerHTML = "X";
			changeSpace(row, col, 1);
			turnCount++;
		}
		else{
			console.log("space is taken");
			return "space is taken";
		}
			//Test to see if player won on that turn
		if(testPlayerWin() === true){
			document.getElementById("winner").innerHTML = "You Win!!! :)";
			playerWin = true;
			return "Player Win";
		}
		//Test to see player played the last spot on board to tie
		if(testTie() === true){
			console.log("Tie");
			document.getElementById("winner").innerHTML = "There was a tie :|";
			return "Tie";
		}
		var spot = [-1, -1];
		//RandomAI picks a spot
		if(ai === "randomAI"){
			spot = randomAI(board);
		}
		//Chelsea picks a spot
		if(ai === "chelsea"){
		  spot = chelsea(board);
		}
		//Mary picks a spot
		if(ai === "mary"){
		  spot = mary(board);
		}
		//Fill Computer Spot with O
		console.log("spot is " + spot);
		btn = "b" + spot[0].toString() + spot[1].toString();
			console.log("btn is " + btn);
		changeSpace(spot[0], spot[1], -1);
		document.getElementById(btn).innerHTML = "O";
		turnCount++;
		//Test to see if computer won on their last turn
		if (testComputerWin() === true){
			document.getElementById("winner").innerHTML = "You Lose :(";
			compWin = true;
			return "Computer Win";
		}
		console.log("not done");
		return "not done";
	}
	else{
		console.log("Game is over");
		return "Game is Over";
	}
}

/*
*	AI----------------------------------------------------------------------------------
*/

//Easy AI: Randomly Places an "O" on any open spot
//returns array of coordinates to put the next spot
function randomAI(b){
	var found = false;
	while(found === false){
		var num1 = Math.floor(Math.random() * 3);
		var num2 = Math.floor(Math.random() * 3);
		if(b[num1][num2] === 0){
			found = true;
			return [num1, num2];
		}
	}
}

//Medium AI: Will block the player from winning, however can still be beat
//returns array of coordinates to put the next spot
function chelsea(b){
  //test if player or computer can win
  var x = testOpening(b)[0];
  var y = testOpening(b)[1];
  console.log("x,y is " + x +", "+ y);
  //will happen if player spot isn't open
	if (x === 3){
	  console.log("if statement called");
	  return randomAI(b);
	}
	else return [x, y];
}

//Impossible AI: Impossible to Win against this AI
function mary(b){
  //count number of turns that has happened
  var turns = 0;
  for(var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if(b[i][j] !== 0) turns = turns + 1;
    }
  }
  
  //if it is the opponents first play
  if (turns === 1){
    //if the player first marks the middle
    if(b[1][1] === 1){
      return [2, 0];
    }
    //if the player does not first mark the middle
    else return [1, 1];
    
  }
  
  if (turns === 3){
    //check for any opening
    if(testOpening(b)[0] !== 3){
      return testOpening(b);
    }
    
    //if the first play is middle and second play is upper right, then play the top left
    if(b[1][1] === 1 && b[0][2] !== 0){
      return [0, 0];
    }
    //if the current play is diagonal, play an edge that allows computer one mark away from winning
    if(board[0][0] + board[1][1] + board[2][2] !== 0 || board[0][2] + board[1][1] + board[2][0] !== 0){
      return [0, 1];
    }
  }
  
  return chelsea(b);
}

//function to test if the player can win with one move
//returns opening spot that should be filled to block opponent or else return [3, 3]
function testOpening(b){
  
  //Test first for computer win then player win to prioritize winning over blocking
  for(var i = -2; i <= 2; i = i+4){
    //row test
    if(b[0][0] + b[0][1] + b[0][2] === i){
      for(var i = 0; i < 3; i++){
        if (b[0][i] === 0) return [0, i];
      }
    }
  	if(b[1][0] + b[1][1] + b[1][2] === i){
  	  for(var i = 0; i < 3; i++){
        if (b[1][i] === 0) return [1, i];
      }
  	}
  	if(b[2][0] + b[2][1] + b[2][2] === i){
  	  for(var i = 0; i < 3; i++){
        if (b[2][i] === 0) return [2, i];
      }
  	}
    //column test
    if(b[0][0] + b[1][0] + b[2][0] === i){
      for(var i = 0; i < 3; i++){
        if (b[i][0] === 0) return [i, 0];
      }
    }
  	if(b[0][1] + b[1][1] + b[2][1] === i){
  	  for(var i = 0; i < 3; i++){
        if (b[i][1] === 0) return [i, 1];
      }
  	}
  	if(b[0][2] + b[1][2] + b[2][2] === i){
  	  for(var i = 0; i < 3; i++){
        if (b[i][2] === 0) return [i, 2];
      }
  	}
    //diagonal test
    if(b[0][0] + b[1][1] + b[2][2] === i){
      for(var i = 0; i < 3; i++){
        if(b[i][i] === 0) return [i, i];
      }
    }
  	if(b[0][2] + b[1][1] + b[2][0] === i){
  	  if (b[0][2] === 0) return [0, 2];
  	  if (b[1][1] === 0) return [1, 1];
  	  if (b[2][0] === 0) return [2, 0];
  	}
  }
	
	return [3, 3];
}