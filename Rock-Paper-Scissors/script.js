let autoPlaying = false;
let intervalID;
document.querySelector('body').addEventListener('keydown',(event)=>{
  if(event.key==='a'){
    autoPlay();
  }
  else if(event.key==='Backspace'){
    resetScore();
  }
  else if(event.key ==='r'){
    playGame('rock');
  }
  else if(event.key ==='p'){
    playGame('paper');
  }
  else if(event.key ==='s'){
    playGame('scissors');
  }
});
document.querySelector('.js-auto-play-button').addEventListener('click',()=>{
  autoPlay();
});
document.querySelector('.js-reset-button').addEventListener('click',()=>{
  resetScore();
});
document.querySelector('.js-scissors-button').addEventListener('click',()=>{
  playGame('scissors');
});
document.querySelector('.js-paper-button').addEventListener('click',()=>{
  playGame('paper');
});
document.querySelector('.js-rock-button').addEventListener('click',()=>{
  playGame('rock');
});
function autoPlay(){
  if(!autoPlaying){
    intervalID=setInterval(()=>{
    const playerMove = pickComputerMove();
    playGame(playerMove);
    },1000);
    autoPlaying= true;
  }
  else{
    clearInterval(intervalID);
    autoPlaying=false;
  }
  if(autoPlaying){
    document.querySelector('.js-auto-play-button').innerHTML='Stop Autoplay';
  }
  else{
    document.querySelector('.js-auto-play-button').innerHTML='Auto Play';
  }
}
function resetScore(){
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
}
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
updateScoreElement();
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  } 
  else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  } 
  else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-player-move').innerHTML = `You: <img src="images/${playerMove}-emoji.png">`;
  document.querySelector('.js-comp-move').innerHTML = `Computer: <img src='images/${computerMove}-emoji.png'>`;
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}