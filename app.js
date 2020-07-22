/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true; // State Variable - Global variable to check the status of a system

// document.querySelector('#current-' + activePlayer).textContent = dice;
// the textContent method can only change the text inside the HTML
// innerHTML can even change the HTML
// document.querySelector('#current-' + activePlayer).innerHTML = '<strong>' + dice + '</strong>';
// inner HTML can only be a string

document.getElementById('dice-1').style.display = 'none';
document.getElementById('dice-2').style.display = 'none';

// the .style helps us identify it as a css page
// .display is the css property given to the class .dice

document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';

// function btnRoll() {
// 	var dice = Math.floor(Math.random() * 6) + 1;

// 	document.querySelector('#current-' + activePlayer).textContent = dice;

// 	var diceDOM = document.querySelector('.dice');
// 	diceDOM.style.display = 'block';
// 	diceDOM.src = 'dice-' + dice + '.png';

// 	var audio = new Audio('dice-audio.mp3');
// 	audio.play();

// 	if (dice !== 1) {
// 		roundScore += dice;
// 		document.querySelector('#current-' + activePlayer).textContent = roundScore;
// 	} else {
// 		activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
// 		roundScore = 0;
// 	}
// }
// btnRoll();

/* The above type is called a callback function which only runs when the event occurs!
 The function call below the function is accessed when the event occurs. 
 We can also write our function inside the event listner known ass the anonymous function
 But we cannot use that button function anywhere else. Displayed below */

// var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function () {
   if (gamePlaying) {
      var dice1 = Math.floor(Math.random() * 6) + 1;
      var dice2 = Math.floor(Math.random() * 6) + 1;

      document.getElementById('dice-1').style.display = 'block';
      document.getElementById('dice-2').style.display = 'block';
      document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
      document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

      var audio = new Audio('dice-audio.mp3');
      audio.play();

      // if (dice === 6 && lastDice === 6) {
      //    // Player Loses the score
      //    scores[activePlayer] = 0;
      //    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

      //    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
      //    roundScore = 0;
      //    document.getElementById('current-0').textContent = '0';
      //    document.getElementById('current-1').textContent = '0';

      //    document.querySelector('.player-0-panel').classList.toggle('active');
      //    document.querySelector('.player-1-panel').classList.toggle('active');

      //    document.getElementById('dice-1').src = 'dice-6.png';
      //    document.getElementById('dice-2').src = 'dice-6.png';
      //}
      if (dice1 !== 1 && dice2 !== 1) {
         roundScore += (dice1 + dice2);
         document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else {
         activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
         roundScore = 0;
         document.getElementById('current-0').textContent = '0';
         document.getElementById('current-1').textContent = '0';

         document.querySelector('.player-0-panel').classList.toggle('active');
         document.querySelector('.player-1-panel').classList.toggle('active');

         document.getElementById('dice-1').src = 'dice-1.png';
         document.getElementById('dice-2').src = 'dice-1.png';
      }
      // lastDice = dice;
   }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
   if (gamePlaying) {
      scores[activePlayer] += roundScore;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

      var input = document.querySelector('.final-score').value;
      var winningScore;
      if (input) {
         winningScore = input;
      } else {
         winningScore = 100;
      }

      if (scores[activePlayer] >= winningScore) {
         document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
         document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
         document.querySelector('#name-' + activePlayer).textContent = 'Winner';
         document.getElementById('dice-1').style.display = 'none';
         document.getElementById('dice-2').style.display = 'none';
         gamePlaying = false;

         if (activePlayer === 0) {
            document.querySelector('#score-0').textContent = 'Player 1';
         } else {
            document.querySelector('#score-1').textContent = 'Player 2';
         }
      } else {
         activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
         roundScore = 0;
         document.getElementById('current-0').textContent = '0';
         document.getElementById('current-1').textContent = '0';

         document.querySelector('.player-0-panel').classList.toggle('active');
         document.querySelector('.player-1-panel').classList.toggle('active');

         document.getElementById('dice-1').style.display = 'none';
         document.getElementById('dice-2').style.display = 'none';
      }
   }
});

document.querySelector('.btn-new').addEventListener('click', function () {
   document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');

   activePlayer === 0 ? document.querySelector('#name-' + activePlayer).textContent = 'Player 1'
      : document.querySelector('#name-' + activePlayer).textContent = 'Player 2';

   document.querySelector('.player-1-panel').classList.remove('active');
   document.querySelector('.player-0-panel').classList.add('active');

   scores = [0, 0];
   roundScore = 0;
   activePlayer = 0;
   gamePlaying = true;

   document.getElementById('dice-1').style.display = 'none';
   document.getElementById('dice-2').style.display = 'none';

   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';

   document.getElementById('score-0').textContent = '0';
   document.getElementById('score-1').textContent = '0';
});

