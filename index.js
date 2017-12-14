let gameState = {
    playing: false,
    round: 0,
    roundLimit:1,
    record: [0,0,0],
}
function computer_play() {
    let number = Math.floor(Math.random() * 3);
    switch (number) {
        case 0:
            return 'Rock';
        case 1:
            return 'Paper';
        case 2:
            return 'Scissors';
    };
}

function display(){
    const wins = document.querySelector('#wins');
    const ties = document.querySelector('#ties');
    const losses = document.querySelector('#losses');
    wins.textContent = gameState['record'][0];
    ties.textContent = gameState['record'][1];
    losses.textContent = gameState['record'][2];
}

function rps_round(choice) {
    gameState['round'] += 1;
    let word = choice;
    let comp_choice = computer_play();
    let result;
    switch (word) {
        case 'Rock':
            if (comp_choice === 'Rock') {
                result = 'Tie';
                gameState['record'][1] += 1;
            }
            else if (comp_choice === 'Paper') {
                result = 'Lose';
                gameState['record'][2] += 1;
            }
            else {
                result = 'Win';
                gameState['record'][0] += 1;
            }
            break;
        case 'Paper':
            if (comp_choice === 'Rock') {
                result = 'Win';
                gameState['record'][0] += 1;
            }
            else if (comp_choice === 'Paper') {
                result = 'Tie';
                gameState['record'][1] += 1;
            }
            else {
                result = 'Lose';
                gameState['record'][2] += 1;
            }
            break;
        case 'Scissors':
            if (comp_choice === 'Rock') {
                result = 'Lose';
                gameState['record'][2] += 1;
            }
            else if (comp_choice === 'Paper') {
                result = 'Win';
                gameState['record'][0] += 1;
            }
            else {
                result = 'Tie';
                gameState['record'][1] += 1;
            }
            break;
        default:
            result = 'Invalid input'
            break;
    };
    let message = `You ${result}! ${(result === "Lose")? comp_choice : word} ${(result === "Tie") ? "ties" : "beats"} ${(result === "Lose")? word : comp_choice}`;
    const messageBoard = document.querySelector('#message');
    messageBoard.textContent = message;
    display();
    if(gameState.roundLimit == gameState.round){
        gameState.roundLimit = 1;
        gameState.round = 0;
        restTransition();
    }
}

const roundButton = document.querySelector('#round');
const gameButton = document.querySelector('#game');
const rockButton = document.querySelector('#rock');
const paperButton = document.querySelector('#paper');
const scissorsButton = document.querySelector('#scissors');


function playTransition(){
    let playing = document.getElementsByClassName('playing');
    let resting = document.getElementsByClassName('resting');
    Array.from(playing).forEach(button => button.style.display = 'initial');
    Array.from(resting).forEach(button => button.style.display= 'none');
}

function restTransition(){
    let playing = document.getElementsByClassName('playing');
    let resting = document.getElementsByClassName('resting');
    Array.from(playing).forEach(button => button.style.display = 'none');
    Array.from(resting).forEach(button => button.style.display= 'initial');
}

roundButton.addEventListener('click', (e) => {
    gameState['roundLimit'] = 1;
    playTransition();
});
gameButton.addEventListener('click', (e) => {
    gameState['roundLimit'] = 5;
    playTransition();
});
rockButton.addEventListener('click', (e) => {
    rps_round('Rock');
});
paperButton.addEventListener('click', (e) => {
    rps_round('Paper');    
});
scissorsButton.addEventListener('click', (e) => {
    rps_round('Scissors');    
});