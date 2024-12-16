let player1Name=document.querySelector("#player1-name");
let player2Name=document.querySelector("#player2-name");
let playerInput1=document.querySelector("#player-input1");
let playerInput2=document.querySelector("#player-input2");
const dice1=document.querySelector("#dice-1");
const dice2=document.querySelector("#dice-2");
const diceDiv=document.querySelector(".dice");
const startBtn=document.querySelector("#start-btn");
const rollBtn=document.querySelector("#roll-btn");
const indivBtn=document.querySelector("#individual-btn");
const sumBtn=document.querySelector("#sum-btn");
const endTurnBtn=document.querySelector("#endTurn-btn");
let diceRoll1=1;
let diceRoll2=1;
let boxes=[0,0,0,0,0,0,0,0,0,0];
const gameBoard=document.querySelector(".game-board");
let scoreboard=document.querySelector(".scoreboard");
let playerVersus=document.querySelector(".playerVersus");
let versus=document.querySelector("#versus");
let playerTurn=document.querySelector("#player-turn");
let box1=document.querySelector("#box-1");
let box2=document.querySelector("#box-2");
let box3=document.querySelector("#box-3");
let box4=document.querySelector("#box-4");
let box5=document.querySelector("#box-5");
let box6=document.querySelector("#box-6");
let box7=document.querySelector("#box-7");
let box8=document.querySelector("#box-8");
let box9=document.querySelector("#box-9");
let roundNumDisplay=document.querySelector("#round-num");
let roundNum=1;
let roundScore1=0;
let roundScore2=0;
let roundSwitcher=1;
let playerAndScoreNum=`#player${roundSwitcher}Score${roundNum}`;
let currentRoundScore=document.querySelector(playerAndScoreNum);
let totalScore1=0;
let totalScore2=0;
let winner=document.querySelector("#winner");
let restartBtn=document.querySelector("#restart-game-btn");
let tableScoreboard=document.querySelector(".table-scoreboard");
let tableHead=document.querySelector("#table-head");
let tableBody=document.querySelector("#table-body");

startBtn.addEventListener("click",function(){
    if(playerInput1.value.trim() && playerInput2.value.trim()){
        player1Name.textContent=playerInput1.value.trim();
        player2Name.textContent=playerInput2.value.trim();
        player1Name=playerInput1.value.trim();
        player2Name=playerInput2.value.trim();
        playerInput1.style.display="none";
        playerInput2.style.display="none";
        startBtn.style.display="none";
        playerVersus.style.display="flex";
        diceDiv.style.display="flex";
        dice1.style.display="block";
        dice2.style.display="block";
        rollBtn.style.display="block";
        indivBtn.style.display="block";
        sumBtn.style.display="block";
        endTurnBtn.style.display="block";
        gameBoard.style.display="flex";
        tableScoreboard.style.display="table";
        roundNumDisplay.textContent=`Round ${roundNum}`;
        versus.textContent=player1Name+" vs "+player2Name;
        playerTurn.textContent=player1Name+"'s Turn";
        rollBtn.disabled=false;
        indivBtn.disabled=true;
        sumBtn.disabled=true;
        endTurnBtn.disabled=true;
    }else{
        alert("Not a valid name input. Please provide a valid input for both player names to continue.");
    }
});

rollBtn.addEventListener("click",function(){
    diceRoll1=Math.floor(Math.random()*6)+1;
    diceRoll2=Math.floor(Math.random()*6)+1;
    dice1.className="bi";
    dice2.className="bi";
    dice1.classList.add("bi-dice-"+diceRoll1);
    dice2.classList.add("bi-dice-"+diceRoll2);
    boxes[0]=diceRoll1+diceRoll2;
    if(boxes[0]>9){
        rollBtn.disabled=true;
        indivBtn.disabled=true;
    }else{
        rollBtn.disabled=true;
        indivBtn.disabled=false;
        sumBtn.disabled=false;
        endTurnBtn.disabled=true;
    }
    if(boxes[diceRoll1]!=0 || boxes[diceRoll2]!=0 || diceRoll1===diceRoll2){
        indivBtn.disabled=true;
    }
    if(boxes[boxes[0]]!=0){
        sumBtn.disabled=true;
    }
    endRound();
});

indivBtn.addEventListener("click",function(){
    indivBtn.disabled=true;
    sumBtn.disabled=true;
    endTurnBtn.disabled=false;
    shut(diceRoll1);
    shut(diceRoll2);
});

sumBtn.addEventListener("click",function(){
    indivBtn.disabled=true;
    sumBtn.disabled=true;
    endTurnBtn.disabled=false;
    shut(boxes[0]);
});

endTurnBtn.addEventListener("click",function(){
    endTurnBtn.disabled=true;
    rollBtn.disabled=false;
    dice1.className="bi bi-dice-1";
    dice2.className="bi bi-dice-1";
});

restartBtn.addEventListener("click",function(){
    resetGame();
});

function shut(boxNum){
    boxes[boxNum]="X";
    let boxToShut="box"+boxNum;
    if(boxToShut==="box1"){
        box1.textContent="X";
        box1.className="shut";
    }else if(boxToShut==="box2"){
        box2.textContent="X";
        box2.className="shut";
    }else if(boxToShut==="box3"){
        box3.textContent="X";
        box3.className="shut";
    }else if(boxToShut==="box4"){
        box4.textContent="X";
        box4.className="shut";
    }else if(boxToShut==="box5"){
        box5.textContent="X";
        box5.className="shut";
    }else if(boxToShut==="box6"){
        box6.textContent="X";
        box6.className="shut";
    }else if(boxToShut==="box7"){
        box7.textContent="X";
        box7.className="shut";
    }else if(boxToShut==="box8"){
        box8.textContent="X";
        box8.className="shut";
    }else if(boxToShut==="box9"){
        box9.textContent="X";
        box9.className="shut";
    }else{
        return;
    }
    boxToShut.textContent="X";
    boxToShut.className="shut";
};

function buildRow(roundNumber,p1Pts){
    totalScore1+=p1Pts;
    const newTable=document.createElement("tr");
    let newContent=document.createElement("th");
    newContent.textContent=`Round ${roundNumber}`;
    newContent.className="realRoundNumber";
    newTable.appendChild(newContent);
    let newContent2=document.createElement("td");
    newContent2.textContent=p1Pts;
    newContent2.className="p1Pts, realRoundNumber";
    let contentId=`#player1Score${roundNumber}`;
    newContent2.id=contentId;
    newTable.appendChild(newContent2);
    let newContent3=document.createElement("td");
    newContent3.textContent="";
    newContent3.className="p2Pts, realRoundNumber";
    contentId=`#player2Score${roundNumber}`;
    newContent3.id=contentId;
    newTable.appendChild(newContent3);

    const currentTable=document.querySelector(`#table-body`);
    currentTable.insertAdjacentElement("beforeend",newTable);
}

function buildPlayerTotal(p1Pts, p2Pts){
    const newTable=document.createElement("tr");
    let newContent=document.createElement("th");
    newContent.textContent="Total";
    newContent.className="realRoundNumber";
    newTable.appendChild(newContent);
    let newContent2=document.createElement("td");
    newContent2.textContent=p1Pts;
    newContent2.className="p1Pts";
    let contentId=`player1Total`;
    newContent2.id=contentId;
    newTable.appendChild(newContent2);
    let newContent3=document.createElement("td");
    newContent3.textContent=p2Pts;
    newContent3.className="p2Pts";
    contentId=`player2Total`;
    newContent3.id=contentId;
    newTable.appendChild(newContent3);

    const currentTable=document.querySelector(`#table-body`);
    currentTable.insertAdjacentElement("beforeend",newTable);
}

function resetBoard(){
    boxes.fill(0);
    dice1.className="bi bi-dice-1";
    dice2.className="bi bi-dice-1";
    for(let i=1; i<boxes.length; i++){
        let boxesItemName=`#box-${i}`;
        let boxesItem=document.querySelector(boxesItemName);
        boxesItem.className="";
        boxesItem.textContent=i;
    }
    if(roundNum<5){
        console.log("GAME OVER");
    }
}

function resetGame(){
    resetBoard();
    player1Name="";
    player2Name="";
    playerInput1.style.display="flex";
    playerInput2.style.display="flex";
    startBtn.style.display="inline-block";
    playerVersus.style.display="none";
    diceDiv.style.display="none";
    dice1.style.display="none";
    dice2.style.display="none";
    rollBtn.style.display="none";
    indivBtn.style.display="none";
    sumBtn.style.display="none";
    endTurnBtn.style.display="none";
    gameBoard.style.display="none";
    tableScoreboard.style.display="none";
    winner.textContent="";
    restartBtn.style.display="none";
    tableHead.innerHTML="";
    tableBody.innerHTML="";
    const newTable=document.createElement("tr");
    let newContent=document.createElement("th");
    newContent.textContent="";
    newContent.className="scoreboard-div";
    newContent.id="empty";
    newTable.appendChild(newContent);
    let newContent2=document.createElement("td");
    newContent2.textContent="placeholder";
    newContent2.className="scoreboard-div";
    newContent2.id="player1-name";
    newTable.appendChild(newContent2);
    let newContent3=document.createElement("td");
    newContent3.textContent="placeholder";
    newContent3.className="scoreboard-div";
    newContent3.id="player2-name";
    newTable.appendChild(newContent3);

    const currentTable=document.querySelector(`#table-head`);
    currentTable.insertAdjacentElement("beforeend",newTable);
    totalScore1=0;
    totalScore2=0;
    roundNum=1;
    roundSwitcher=1;
    player1Name=document.querySelector("#player1-name");
    player2Name=document.querySelector("#player2-name");
    playerInput1=document.querySelector("#player-input1");
    playerInput2=document.querySelector("#player-input2");
}

function endRound(){
    let firstRoundOut=0;
    for(let i=1; i<boxes.length-1; i++){
        if(boxes[i]!=0){
            firstRoundOut++;
        }else{
            firstRoundOut=0;
        }
    }
    let roundScore=0;
    if(((boxes[diceRoll1]!=0 || boxes[diceRoll2]!=0 || diceRoll1===diceRoll2) && (boxes[boxes[0]]!=0)) || ((boxes[0]>9)&&(firstRoundOut===0))){
        for(let i=1; i<boxes.length; i++){
            if(boxes[i]===0){
                roundScore+=i;
            }
        }
        if(roundSwitcher===2){
            totalScore2+=roundScore;
            playerAndScoreNum=`#player2Score${roundNum}`;
            player2Score=document.getElementById(playerAndScoreNum);
            player2Score.textContent=roundScore;
        }else{
            buildRow(roundNum, roundScore);
        }
        roundScore=0;
        endTurnBtn.disabled=false;
        resetBoard();
        switchTurn();
        return;
    }
}

function switchTurn(){
    if(roundSwitcher===1){
        playerTurn.textContent=player2Name+"'s Turn";
        scoreSetChanger();
    }else if(roundSwitcher===2){
        playerTurn.textContent=player1Name+"'s Turn";
        scoreSetChanger();
    }else{
        console.log("error");
    }
    if(roundNum>5){
        rollBtn.disabled=true;
        indivBtn.disabled=true;
        sumBtn.disabled=true;
        endTurnBtn.disabled=true;
        playerVersus.style.display="none";
        diceDiv.style.display="none";
        dice1.style.display="none";
        dice2.style.display="none";
        rollBtn.style.display="none";
        indivBtn.style.display="none";
        sumBtn.style.display="none";
        endTurnBtn.style.display="none";
        gameBoard.style.display="none";
        buildPlayerTotal(totalScore1, totalScore2);
        totalScore1=document.querySelector("#player1Total");
        totalScore2=document.querySelector("#player2Total");
        if(Number(totalScore1.textContent)<Number(totalScore2.textContent)){
            winner.textContent=(player1Name+" Wins!");
        }else if(Number(totalScore1.textContent)>Number(totalScore2.textContent)){
            winner.textContent=(player2Name+" Wins!");
        }else{
            winner.textContent=("Game is a tie.");
        }
        restartBtn.style.display="block";
    }
}

function scoreSetChanger(){
    if(roundSwitcher===1){
        roundSwitcher++;
    }else if(roundSwitcher===2){
        roundSwitcher--;
        roundNum++;
        roundNumDisplay.textContent="Round "+roundNum;
    }else{
        console.log("error");
    }
}

