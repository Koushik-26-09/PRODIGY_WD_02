// script.js
let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 100);
    }
}

function pause() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
    }
}

function reset() {
    isRunning = false;
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    laps = [];
    updateLaps();
}

function lap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        laps.push(lapTime);
        updateLaps();
    }
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const time = new Date(elapsedTime);
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function updateLaps() {
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('div');
        const time = new Date(lap);
        const minutes = time.getUTCMinutes().toString().padStart(2, '0');
        const seconds = time.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');
        lapElement.textContent = `Lap ${index + 1}: ${minutes}:${seconds}:${milliseconds}`;
        lapsContainer.appendChild(lapElement);
    });
}
