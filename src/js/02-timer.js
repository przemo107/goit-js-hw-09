import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate.getTime() < currentDate.getTime()) {
      window.alert('Please choose a date in the future');
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
const startButton = document.querySelector('[data-start]');

let intervalId;

function startTimer() {
  const selectedDate = new Date(
    document.querySelector('#datetime-picker').value
  );
  const currentDate = new Date();
  const differenceMs = selectedDate.getTime() - currentDate.getTime();

  if (differenceMs <= 0) {
    clearInterval(intervalId);
    daysValue.innerText = '00';
    hoursValue.innerText = '00';
    minutesValue.innerText = '00';
    secondsValue.innerText = '00';
    startButton.disabled = true;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(differenceMs);

  daysValue.innerText = days.toString().padStart(2, '0');
  hoursValue.innerText = hours.toString().padStart(2, '0');
  minutesValue.innerText = minutes.toString().padStart(2, '0');
  secondsValue.innerText = seconds.toString().padStart(2, '0');
}

startButton.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = setInterval(startTimer, 1000);
});

function convertMs(ms) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((ms % (60 * 1000)) / 1000);
  return { days, hours, minutes, seconds };
}
