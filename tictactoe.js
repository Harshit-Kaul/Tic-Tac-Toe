const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],                                           // 1st row                                                  
    [3, 4, 5],                                           // 2nd row               
    [6, 7, 8],                                           // 3rd row          
    [0, 3, 6],                                           // 1st column            
    [1, 4, 7],                                           // 2nd column           
    [2, 5, 8],                                           // 3rd column          
    [0, 4, 8],                                           // 1st diagonal              
    [2, 4, 6]                                           // 2nd diagonal                 
];
let options = ["", "", "", "", "", "", "", "", ""];                    // we'll need an array of placeholders, options will be an array of empty strings, we need 9 of them (1 for each cell)
let currentPlayer = "X";                                               //we need to keep track of the current player
let running = false;                                                   //we'll set this true when we initialize the game                                                         //we'll a boolean variable to keep track if our game is running, we'll swtich this to ture when we initialize our game                                           

initializeGame();

function initializeGame(){
     cells.forEach(cell => cell.addEventListener("click", cellClicked))
     restartBtn.addEventListener("click", restartGame);
     statusText.textContent = `${currentPlayer}'s turn`; 
     running = true;      

}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");  
                                                                                                   
    if(options[cellIndex] != "" || !running){                                       //we want to update a cell if there's nothing there, if our options at index of cellIndex does not equals an empty space or our game is not running
         return; 
        }

    updateCell(this, cellIndex);
    checkWinner();

}    

function updateCell(cell, index){
    options[index] = currentPlayer;                                                       // take options at index of index parameter, we're updating our placeholders
    cell.textContent =  currentPlayer;

}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";                                               //ternery operator, our condition is if changeplayer == X, we'll reassign our current player with "O", otherise X
    statusText.textContent = `${currentPlayer}'s turn`;  

}
function checkWinner(){
    let roundWon = false;                                                                           //we'll create a temperory variable of round 1
    
    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];                                                      //each row has 3 indexes
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        } 
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){                                                                        //means round1 = true
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;  
    }
    else if(!options.includes("")){                                                        //if spaces are not empty and values not equal in 3 indices, it's a draw
        statusText.textContent = `Draw!`;
        running = false;

    }
    else{
        changePlayer();
    }

}
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");                                                              // for each cell, we'll take that cell, update textContent equals = "" (empty space)     
    running = true;
}