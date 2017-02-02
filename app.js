/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// declare scores and players
var scores=[0,0];
var roundScore=0;
var activePlayer=0;
var dice;
// console.log(dice);
// change current score everytime dice get a random number
// innerHTML可以加入css 样式，textContent保留原网页样式
// querySelector选择 CSS样式.对于id样式可以使用getElemenById()
document.querySelector("#current-" + activePlayer).textContent=dice;
// document.querySelector("#current-"+activePlayer).innerHTML="<em>"+dice+"</em>";
// 选择dice在起始时隐藏图片
function diceReset(){
  document.querySelector(".dice").style.display="none";
}
diceReset();
// 游戏起始分数为0
document.getElementById("score-0").textContent="0";
document.getElementById("score-1").textContent="0";
document.getElementById("current-0").textContent="0";
document.getElementById("current-1").textContent="0";


////create a function for skip to next round and next player to move
function nextPlayer(){
  if(activePlayer===0){
    activePlayer=1;
    document.querySelector("#current-0").textContent="0";
    //active signs toggles between players
    // document.querySelector(".player-0-panel").classList.remove("active");
    // document.querySelector(".player-1-panel").classList.add("active");
  }/*---end of if (activePlayer===0)---*/
  else{
    activePlayer=0;
    document.querySelector("#current-1").textContent="0";
    //active signs toggles between players
    // document.querySelector(".player-1-panel").classList.remove("active");
    // document.querySelector(".player-0-panel").classList.add("active");
  }/*----end of else---*/
  //  and lose all scores this turn
  roundScore=0;
  //active signs toggles between players
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //dice number initiated
  diceReset();
}/*---end of nextPlayer function---*/

// 点击ROll之后激活dice随机数字
document.querySelector(".btn-roll").addEventListener("click",function(){
  //1.random number
  dice=Math.floor(Math.random()*6+1);
  //2.display result 根据数字换相应图片
  document.querySelector(".dice").style.display="block";
  document.querySelector(".dice").src="dice-"+dice+".png";
  //3.update the round score IF the rolled number was not 1
  if (dice>1){
    //sum score
    // roundScore=roundScore+dice;
    roundScore+=dice;
    // rolled score shows/adds to Current-score this turn
    document.querySelector("#current-"+activePlayer).textContent=roundScore;
  }/*---end of if (dice>1)---*/
  else{
    ////skip to next round and next player to move
    nextPlayer();
  }/*---end of else---*/
});/*---end of btn-roll function---*/

// btn-hold to store scores
document.querySelector(".btn-hold").addEventListener("click",function(){
  //add current score to GLOBAL score
  scores[activePlayer]+=roundScore;
  //update the score and show in UI
  document.querySelector("#score-"+activePlayer).textContent=scores[activePlayer];
  //check if player won
  if (scores[activePlayer]>=100){
    document.querySelector("#name-"+activePlayer).textContent="Winner!";
    ///stop the game and hide dice and button
    diceReset();
    document.querySelector(".btn-roll").style.display="none";
    document.querySelector(".btn-hold").style.display="none";
  }
  else{
    ////skip to next round and next player to move
    nextPlayer();
  }
});/*---end of btn-hold function---*/

//start a new game
document.querySelector(".btn-new").addEventListener("click",function(){
  diceReset();
  //reset scores
  document.getElementById("score-0").textContent="0";
  document.getElementById("score-1").textContent="0";
  document.getElementById("current-0").textContent="0";
  document.getElementById("current-1").textContent="0";
  //reset buttons
  document.querySelector(".btn-roll").style.display="block";
  document.querySelector(".btn-hold").style.display="block";
});
