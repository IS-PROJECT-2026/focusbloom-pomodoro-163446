const timerDisplay = document.getElementById("timer");
const modeLabel = document.querySelector(".mode-label");
const sessionCountDisplay = document.getElementById("session-count");
const motivationMessage = document.getElementById("motivation-message");

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

const affirmations = [
    "Small focused steps create meaningful progress.",
    "You do not need to rush what you are growing.",
    "Give your attention to what matters in this moment.",
    "Rest is part of meaningful progress.",
    "You are allowed to grow at your own pace.",
    "Be intentional with where your energy goes today.",
    "Consistency matters more than perfection.",
    "A focused mind creates space for good work.",
    "Pause without guilt. Rest helps you return.",
    "You can begin again at any moment.",
    "Progress can be quiet and still be real.",
    "Choose what deserves your attention today.",
    "Your future is shaped by small intentional choices.",
    "Protect your peace while you pursue your goals.",
    "You do not have to do everything at once.",
    "Healthy friendships leave room for both people to grow.",
    "Choose friendships that feel mutual, safe and honest.",
    "It is okay to outgrow what no longer supports you.",
    "Give yourself the same patience you give people you love.",
    "Your worth is not measured by how productive you are."
];

const sessionCountKey = "focusbloom-session-count";
const sessionDateKey = "focusbloom-session-date";

let currentMode = "focus";
let timeRemaining = durations[currentMode];
let timerInterval = null;
let completedFocusSessions = 0;
let previousAffirmationIndex = -1;

function getTodayDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function loadSessionData() {
    const savedDate = localStorage.getItem(sessionDateKey);
    const savedCount = Number(localStorage.getItem(sessionCountKey));

    if (
        savedDate === getTodayDate() &&
        Number.isFinite(savedCount)
    ) {
        completedFocusSessions = savedCount;
    } else {
        completedFocusSessions = 0;
        saveSessionData();
    }
}

function saveSessionData() {
    localStorage.setItem(
        sessionCountKey,
        completedFocusSessions
    );

    localStorage.setItem(
        sessionDateKey,
        getTodayDate()
    );
}

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

function showRandomAffirmation() {
    let randomIndex;

    do {
        randomIndex = Math.floor(
            Math.random() * affirmations.length
        );
    } while (
        randomIndex === previousAffirmationIndex &&
        affirmations.length > 1
    );

    previousAffirmationIndex = randomIndex;

    motivationMessage.textContent =
        affirmations[randomIndex];
}

function completeSession() {
    if (currentMode === "focus") {
        completedFocusSessions++;

        saveSessionData();
        updateSessionDisplay();
    }
}

function startTimer() {
    if (timerInterval !== null) {
        return;
    }

    if (timeRemaining === 0) {
        timeRemaining = durations[currentMode];
        updateTimerDisplay();
    }

    showRandomAffirmation();

    timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimerDisplay();
        }

        if (timeRemaining === 0) {
            pauseTimer(false);
            completeSession();
            showRandomAffirmation();
        }
    }, 1000);
}

function pauseTimer(showMessage = true) {
    clearInterval(timerInterval);
    timerInterval = null;

    if (showMessage) {
        showRandomAffirmation();
    }
}

function resetTimer() {
    pauseTimer(false);

    timeRemaining = durations[currentMode];

    updateTimerDisplay();
    showRandomAffirmation();
}

function changeMode(mode) {
    pauseTimer(false);

    currentMode = mode;
    timeRemaining = durations[currentMode];

    updateTimerDisplay();
    updateModeDisplay();
    showRandomAffirmation();
}

modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        changeMode(button.dataset.mode);
    });
});

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

loadSessionData();
updateTimerDisplay();
updateModeDisplay();
updateSessionDisplay();
showRandomAffirmation();