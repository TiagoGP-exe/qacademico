const countDown = document.getElementById("countdown");
const start = document.getElementById("sessionInput").value;
let time = start * 60;

let intervalId = 0;

function startCountdown() {
  if (!intervalId) {
    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);
  }
}

function stopCountdown() {
  clearInterval(intervalId);
  intervalId = 0;
}

function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  countDown.innerHTML = `${minutes}:${seconds}`;
  time--;

  if (time <= 0) {
    clearInterval(intervalId);
  }
}
