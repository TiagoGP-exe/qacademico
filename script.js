/*
  1 - salvar o estado do input de sessão para reaproveitar
  2 - salvar o estado do input de descanço para reaproveitar
  3 - refatorar e melhorar o uso de código
*/

const countDown = document.getElementById('countdown');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const sessionInput = document.getElementById('sessionInput');
const breakInput = document.getElementById('breakInput');
const state = document.getElementById('state');

let time = 25 * 60;
let breakTime = 5 * 60;
let isBreakTime = false;
let intervalId = 0;

function updateVisor(timeToUpdate) {
  const minutes = Math.floor(timeToUpdate / 60);
  let seconds = timeToUpdate % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  countDown.innerHTML = `${minutes}:${seconds}`;
}

function updateCountdown() {
  updateVisor(time);

  if (time <= 0) {
    clearInterval(intervalId);
    isBreakTime = true;
    state.innerHTML = 'Break';
    startButton.innerHTML = 'Start';
    updateVisor(breakTime);
    intervalId = 0;
  } else {
    time--;
  }
}

function updateCountdownBreak() {
  updateVisor(breakTime);

  if (breakTime <= 0) {
    clearInterval(intervalId);
    isBreakTime = false;
    state.innerHTML = 'Session';
    startButton.innerHTML = 'Start';
    updateVisor(time);
    intervalId = 0;
  } else {
    breakTime--;
  }
}

sessionInput.addEventListener('keyup', e => {
  time = e.target.value * 60;
  updateVisor(time);
});

breakInput.addEventListener('keyup', e => {
  breakTime = e.target.value * 60;
});

startButton.addEventListener('click', () => {
  if (intervalId === 0) {
    if (isBreakTime) {
      updateCountdownBreak(breakTime);
      intervalId = setInterval(() => updateCountdownBreak(breakTime), 1000);
    } else {
      updateCountdown(time);
      intervalId = setInterval(() => updateCountdown(time), 1000);
    }
    startButton.innerHTML = 'Stop';
  } else {
    clearInterval(intervalId);
    intervalId = 0;
    startButton.innerHTML = 'Start';
  }
});
