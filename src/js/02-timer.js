import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');

btnStart.setAttribute('disabled', 'disabled');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnStart.removeAttribute('disabled');
      btnStart.addEventListener('click', onBtnStartClick);
    }
    function onBtnStartClick() {
      inputDate.setAttribute('disabled', 'disabled');
      btnStart.setAttribute('disabled', 'disabled');
      setInterval(() => {
        const currentDate = new Date();
        if (selectedDates[0] >= currentDate) {
          const difDate = selectedDates[0] - currentDate;
          spanDays.textContent = addLeadingZero(
            convertMs(difDate).days.toString()
          );
          spanHours.textContent = addLeadingZero(
            convertMs(difDate).hours.toString()
          );
          spanMinutes.textContent = addLeadingZero(
            convertMs(difDate).minutes.toString()
          );
          spanSeconds.textContent = addLeadingZero(
            convertMs(difDate).seconds.toString()
          );
        } else {
          inputDate.removeAttribute('disabled');
          btnStart.removeAttribute('disabled');
          return;
        }
      }, 1000);
    }
  },
};

flatpickr(inputDate, options);
function addLeadingZero(value) {
  return value.padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}