const board = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restart');
const splashScreen = document.getElementById('splash-screen');
const startBtn = document.getElementById('start-btn');

let firstCard, secondCard;
let lockBoard = false;
let matches = 0;
let seconds = 0;
let gameInterval;

const icons = ['🌸', '✨', '🎀', '💌', '🕯️', '🦢', '🌙', '☁️'];
const gameIcons = [...icons, ...icons];

function initGame() {
    clearInterval(gameInterval);
    seconds = 0;
    matches = 0;
    timerDisplay.textContent = seconds;
    scoreDisplay.textContent = matches;
    board.innerHTML = '';
    
    gameIcons.sort(() => Math.random() - 0.5);

    gameIcons.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon;
        
        card.innerHTML = `
            <div class="card-back"></div>
            <div class="card-front">${icon}</div>
        `;
        
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });

    startTimer();
}

function startTimer() {
    gameInterval = setInterval(() => {
        seconds++;
        timerDisplay.textContent = seconds;
    }, 1000);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    matches++;
    scoreDisplay.textContent = matches;
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    if (matches === icons.length) {
        clearInterval(gameInterval);
        setTimeout(() => alert(`Finished in ${seconds}s!`), 500);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

startBtn.addEventListener('click', () => {
    splashScreen.classList.add('hidden');
    initGame();
});

restartBtn.addEventListener('click', initGame);