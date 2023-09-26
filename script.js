const container = document.querySelector(".container");
const gameButtons = document.querySelector(".game-wrapper");
const scoreInfo = document.querySelector("#info"); // show round status 'It's a tie!'
const score = document.querySelector("#message"); // show round results 'Paper beats rock'!
const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score");
const signs = document.querySelectorAll(".sign");
const modal = document.querySelector(".modal");
const resetBtn = document.querySelector(".reset");
const results = document.querySelector("#results");

let userScore = 0;
let pcScore = 0;

// Event Listeners
gameButtons.addEventListener("click", (e) => {
    playRound(e.target.textContent);
});
resetBtn.addEventListener("click", resetGame);

// Game logic && UI
function checkGameStatus() {
    if (userScore >= 5 || pcScore >= 5) {
        results.textContent = `You ${userScore > pcScore ? "won" : "lost"}!`;
        modal.classList.add("active");
        container.style.display = "none";
    }
}

function getComputerChoice() {
    const gameValues = ["✊", "🤚", "✌️"];
    const randomValue = Math.floor(Math.random() * 3);

    return gameValues[randomValue];
}

function convertToPhrase(emoji) {
    let weapon;

    switch (emoji) {
        case "✊":
            weapon = "Rock";
            break;
        case "🤚":
            weapon = "Paper";
            break;
        case "✌️":
            weapon = "Scissors";
            break;
    }

    return weapon;
}

function renderResults(
    computerSelection,
    playerSelection,
    messageInfo,
    roundInfo
) {
    signs[0].textContent = playerSelection;
    signs[1].textContent = computerSelection;

    scoreInfo.textContent = messageInfo;
    score.textContent = roundInfo;

    playerScore.textContent = `Player score: ${userScore}`;
    computerScore.textContent = `Computer score: ${pcScore}`;
}

function playRound(playerSelection) {
    const computerSelection = getComputerChoice();
    const computerWeapon = convertToPhrase(computerSelection);
    const playerWeapon = convertToPhrase(playerSelection);
    let results;
    let roundInfo;

    if (playerSelection === computerSelection) {
        results = "It's a tie!";
        roundInfo = `${playerWeapon} ties ${computerWeapon}!`;
    }

    if (
        (playerSelection === "✊" && computerSelection === "✌️") ||
        (playerSelection === "✌️" && computerSelection === "🤚") ||
        (playerSelection === "🤚" && computerSelection === "✊")
    ) {
        results = "Player wins!";
        roundInfo = `${playerWeapon} beats ${computerWeapon}!`;
        userScore++;
    }

    if (
        (computerSelection === "✊" && playerSelection === "✌️") ||
        (computerSelection === "✌️" && playerSelection === "🤚") ||
        (computerSelection === "🤚" && playerSelection === "✊")
    ) {
        results = "Computer wins!";
        roundInfo = `${computerWeapon} beats ${playerWeapon}!`;
        pcScore++;
    }

    renderResults(computerSelection, playerSelection, results, roundInfo);
    checkGameStatus();
}

function resetGame() {
    modal.classList.remove("active");
    container.style.display = "flex";
    userScore = 0;
    pcScore = 0;

    signs[0].textContent = "❓";
    signs[1].textContent = "❓";

    scoreInfo.textContent = "Choose your weapon";
    score.textContent = "First to score 5 points wins the game";
    playerScore.textContent = "Player score: " + userScore;
    computerScore.textContent = "Computer score: " + pcScore;
}
