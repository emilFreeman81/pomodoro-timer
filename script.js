const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const roundsEl = document.getElementById('rounds');
const modeBtns = document.querySelectorAll('.mode-btn');

let totalSeconds = 25 * 60;
let remaining = totalSeconds;
let intervalId = null;
let rounds = 0;

function format(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function render() {
  timerEl.textContent = format(remaining);
  document.title = `${format(remaining)} - Pomodoro`;
}

function stop() {
  clearInterval(intervalId);
  intervalId = null;
  startBtn.textContent = 'Start';
}

function start() {
  if (intervalId) return;
  startBtn.textContent = 'Pause';
  intervalId = setInterval(() => {
    remaining -= 1;
    render();
    if (remaining <= 0) {
      stop();
      rounds += 1;
      roundsEl.textContent = rounds;
      remaining = totalSeconds;
      render();
    }
  }, 1000);
}

function reset() {
  stop();
  remaining = totalSeconds;
  render();
}

function setMode(btn) {
  modeBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  totalSeconds = Number(btn.dataset.minutes) * 60;
  reset();
}

startBtn.addEventListener('click', () => {
  if (intervalId) {
    stop();
  } else {
    start();
  }
});

resetBtn.addEventListener('click', reset);

modeBtns.forEach(btn => {
  btn.addEventListener('click', () => setMode(btn));
});

render();
