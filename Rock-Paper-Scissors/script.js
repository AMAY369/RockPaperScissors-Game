const score = JSON.parse(localStorage.getItem('score'))||{
  wins:0,
  losses:0,
  ties:0
}
document.querySelector('.js-scores').innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
function playGame(playerMove){
  let result = '';
  computerMove = getComputerMove();
  switch(playerMove){
    case 'rock':
      if(computerMove=='rock'){
        result='Tie!'
      }
      else if(computerMove==='paper'){
        result='You Lose!'
      }
      else if(computerMove==='scissors'){
        result='You Win!'
      }
      break;
    case 'paper':
      if(computerMove=='paper'){
        result='Tie!'
      }
      else if(computerMove==='scissors'){
        result='You Lose!'
      }
      else if(computerMove==='rock'){
        result='You Win!'
      }
      break;
    case 'scissors':
      if(computerMove=='scissors'){
        result='Tie!'
      }
      else if(computerMove==='rock'){
        result='You Lose!'
      }
      else if(computerMove==='paper'){
        result='You Win!'
      }
      break;
    case 'reset':
      score.wins=0;
      score.losses=0;
      score.ties=0;
      document.querySelector('.js-moves').innerHTML='';
  }
  if(result==='Tie!'){
    score.ties++;
  }
  else if(result==='You Win!'){
    score.wins++;
  }
  else if(result==='You Lose!'){
    score.losses++;
  }
  localStorage.setItem('score',JSON.stringify(score));
  document.querySelector('.js-result').innerHTML=result;
  document.querySelector('.js-moves').innerHTML=`You: <img src ='images/${playerMove}-emoji.png'>, Computer: <img src ='images/${computerMove}-emoji.png'>`;
  document.querySelector('.js-scores').innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  if(playerMove==='reset'){
    score.wins=0;
    score.losses=0;
    score.ties=0;
    document.querySelector('.js-moves').innerHTML='';
  }
}



function getComputerMove(){
  let computerMove='';
  const randomNumber = Math.random();
  if(randomNumber>=0 && randomNumber<1/3){
    computerMove = 'rock';
  }
  else if(randomNumber>=1/3 && randomNumber<2/3){
    computerMove = 'paper';
  }
  if(randomNumber>=2/3 && randomNumber<1){
    computerMove = 'scissors';
  }
  return computerMove;
}