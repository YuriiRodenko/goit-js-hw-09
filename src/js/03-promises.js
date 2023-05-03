import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const { elements: { delay, step, amount } } = e.currentTarget;

  for (
    let i = 1, j = Number(delay.value);
    i <= amount.value;
    i += 1, j += Number(step.value)
  ) {
    createPromise(i, j);
  }
  e.target.reset();
}

function createPromise(position, delay) {
  return new Promise(() => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      } else {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      }
    }, delay);
  });
}