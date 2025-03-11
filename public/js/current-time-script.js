const newYear = new Date('2026-01-01T00:00:00+07:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = newYear - now;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;

  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    document.getElementById('countdown').innerHTML = '';
    document.getElementById('title').textContent = '';
    document.querySelector('.countdown-container').innerHTML = 
      '<div class="happy-new-year">Happy New Year!</div>';
  }
}

function updateCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateCountdown, 1000);
setInterval(updateCurrentTime, 1000);
updateCountdown();
updateCurrentTime();
