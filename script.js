const audio = new Audio('./alarm.ogg');
const countDown = document.getElementById('countdown');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const sessionInput = document.getElementById('sessionInput');
const breakInput = document.getElementById('breakInput');
const state = document.getElementById('state');

let time = sessionInput.value * 60;
let breakTime = breakInput.value * 60;
let isBreakTime = false;
let intervalId = 0;
let vBreak, vSession, breakReset, sessionReset = false;

//Função que realiza o calculo
function updateVisor(timeToUpdate) {
  const minutes = Math.floor(timeToUpdate / 60);
  let seconds = timeToUpdate % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  countDown.innerHTML = `${minutes}:${seconds}`;
}

//Session
function updateCountdown() {
  if (vSession || sessionReset){
    time = sessionInput.value * 60;
    vSession = false;
    sessionReset = false;
  }

  updateVisor(time);
  if (time == 0) {
    clearInterval(intervalId);
    isBreakTime = true;
    state.innerHTML = 'Break';
    startButton.innerHTML = 'Start';
    updateVisor(breakTime);
    intervalId = 0;
    vBreak = true;
    updateCountdownBreak()
    audio.play()
    Toast.show('Muito bem, aproveite o tempo de descanso','success')
  } else {
    time--;
  }

}


//BreakTime
function updateCountdownBreak() {
  if (vBreak || breakReset) {
    breakTime = breakInput.value * 60;
    vBreak = false;
    breakReset = false;
  }
  updateVisor(breakTime);
  if (breakTime == 0) {
    clearInterval(intervalId);
    isBreakTime = false;
    state.innerHTML = 'Session';
    startButton.innerHTML = 'Start';
    updateVisor(time);
    intervalId = 0;
    vSession = true;
    updateCountdown()
    audio.play()
  } else {
    breakTime--;
  }
}
//leitura de dados
sessionInput.addEventListener('keyup', e => {
  time = e.target.value * 60;
  updateVisor(time);
});

breakInput.addEventListener('keyup', e => {
  breakTime = e.target.value * 60;
  updateVisor(breakTime);
});

startButton.addEventListener('click', () => {
  if(sessionInput.value >= 20 && sessionInput.value <= 60){
    if(breakInput.value >= 5 && breakInput.value <= 15 ){
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
    } else {
      Toast.show('O valor minino do break é 5, e o máximo é 15','error')
    }
  } else {
    Toast.show('O valor minino de session é 20, e o máximo é 60','error')
  }
});

resetButton.addEventListener('click', () => {
  breakReset = true;
  sessionReset = true;
});
