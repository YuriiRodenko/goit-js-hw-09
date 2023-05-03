const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let id = null;

btnStop.setAttribute('disabled', 'disabled');

btnStart.addEventListener('click', onClickStart);
btnStop.addEventListener('click', onClickStop);

function onClickStart() {
  btnStart.setAttribute('disabled', 'disabled');
  btnStop.removeAttribute('disabled');
  id = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClickStop() {
  clearInterval(id);
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', 'disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
