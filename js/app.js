const timerDisplay = document.getElementById("timer");
const modeLabel = document.querySelector(".mode-label");
const sessionCountDisplay = document.getElementById("session-count");

const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");

const modeButtons = document.querySelectorAll(".mode-button");

const durations = {
    focus: 25 * 60,
    "short-break": 5 * 60,
    "long-break": 15 * 60
};

const modeNames = {
    focus: "Focus Session",
    "short-break": "Short Break",
    "long-break": "Long Break"
};

let currentMode = "focus";
let timeRemaining = durations[currentMode];
let timerInterval = null;
let completedFocusSessions = 0;

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateModeDisplay() {
    modeLabel.textContent = modeNames[currentMode];

    modeButtons.forEach((button) => {
        button.classList.toggle(
            "active",
            button.dataset.mode === currentMode
        );
    });
}

function updateSessionDisplay() {
    sessionCountDisplay.textContent = completedFocusSessions;
}

function completeSession() {
    if (currentMode === "focus") {
        completedFocusSessions++;
        updateSessionDisplay();
    }
}

function startTimer() {
    if (timerInterval !== null) {
        return;
    }

    timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimerDisplay();
        }

        if (timeRemaining === 0) {
            pauseTimer();
            completeSession();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();
    timeRemaining = durations[currentMode];
    updateTimerDisplay();
}

function changeMode(mode) {
    pauseTimer();

    currentMode = mode;
    timeRemaining = durations[currentMode];

    updateTimerDisplay();
    updateModeDisplay();
}

modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        changeMode(button.dataset.mode);
    });
});

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

updateTimerDisplay();
updateModeDisplay();
updateSessionDisplay();