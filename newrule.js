/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

//New rules add:
//add another dice
//lose all scores if rolls two 6 in a row
//add an input field to the HTML wher players can set the winning score
*/

// declare scores and players
var scores=[0,0];
var roundScore=0;
var activePlayer=0;
var dice;
var diceAdd;/*---2nd dice added for new rule---*/

// // change current score everytime along with dices getting random numbers
/*--innerHTML可以加入css 样式，textContent保留原网页样式
querySelector选择 CSS样式.对于id样式可以使用getElemenById()---*/
document.querySelector("#current-" + activePlayer).textContent=dice;
// document.querySelector("#current-"+activePlayer).innerHTML="<em>"+dice+"</em>";

/*---选择dice在起始时隐藏图片---*/
function diceReset(){
  document.querySelector("#dice").style.display="none";
  document.querySelector("#diceAdd").style.display="none";
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
  // diceReset();
}/*---end of nextPlayer function---*/

// 点击ROll之后激活dice随机数字
document.querySelector(".btn-roll").addEventListener("click",function(){
  //1.random number
  dice=Math.floor(Math.random()*6+1);
  diceAdd=Math.floor(Math.random()*6+1);
  //2.display result 根据数字换相应图片
  document.querySelector("#dice").style.display="block";
  document.querySelector("#diceAdd").style.display="block";
  document.querySelector("#dice").src="dice-"+dice+".png";
  document.querySelector("#diceAdd").src="dice-"+diceAdd+".png";
  //3.update the round score IF the rolled number was not 1
  //NEW RULE ADDED: lose all scores if two six in a row
  if (dice===6 && diceAdd===6){
    //all scores lost
    scores[activePlayer]=0;
    document.querySelector("#score-"+activePlayer).textContent="0";
    nextPlayer();
    // alert("Player "+(activePlayer+1)+" rolled two 6 in a row! All scores lost!");
  }
  else if (dice!=1 && diceAdd!=1){
    //sum score
    // roundScore=roundScore+dice; For new rule: roundScore=roundScore+dice+diceAdd
    roundScore=roundScore+dice+diceAdd;
    // rolled score shows/adds to Current-score this turn
    document.querySelector("#current-"+activePlayer).textContent=roundScore;
  }/*---end of if (dice>1)---*/
  else{
    ////skip to next round and next player to move
    nextPlayer();
    // alert("Player "+(activePlayer+1)+" rolled at least one 1! Lose scores this round!");
  }/*---end of else---*/
});/*---end of btn-roll function---*/

// btn-hold to store scores
document.querySelector(".btn-hold").addEventListener("click",function(){
  //add current score to GLOBAL score
  scores[activePlayer]+=roundScore;
  //update the score and show in UI
  document.querySelector("#score-"+activePlayer).textContent=scores[activePlayer];

  //check if player won
  /*---NEW RULE ADDED: read data from winning score and applied to following function---*/
  var input=document.querySelector(".winningScore").value;
  var winningScore;
  /*---check is the score box filled---*/
  if(input){
    var winningScore=input;
  }
  else {
    winningScore=100;
  }
  //check if won
  if (scores[activePlayer]>=winningScore){
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
  roundScore=0;
  scores=[0,0];
  //reset buttons
  document.querySelector(".btn-roll").style.display="block";
  document.querySelector(".btn-hold").style.display="block";
  //resent player
  document.querySelector("#name-"+activePlayer).textContent="Player "+(activePlayer+1);
});/*---end of btn-new function---*/
