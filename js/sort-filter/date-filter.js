import { initializeFlatpickr } from '../default-date.js';

export function activateDateFilter(buttonId, inputId, resetButtonId) {
  const button = document.getElementById(buttonId);
  const input = document.getElementById(inputId);
  const resetButton = document.getElementById(resetButtonId);
  const container = button.closest('.filter-container');

  console.log({ button, input, resetButton, container });

  if (!button || !input || !resetButton || !container) {
    console.error('One or more elements not found:', { button, input, resetButton, container });
    return;
  }

  button.addEventListener('click', () => {
    console.log('Button clicked');
    if (input.type === 'hidden') {
      input.type = 'text';
    }
    input.classList.toggle('hidden');
    resetButton.classList.toggle('hidden');
    console.log('Input classes:', input.classList);
    console.log('Reset button classes:', resetButton.classList);
  });

  resetButton.addEventListener('click', () => {
    console.log('Reset button clicked');
    input.value = '';
    input.classList.add('hidden');
    resetButton.classList.add('hidden');
    console.log('Input classes after reset:', input.classList);
    console.log('Reset button classes after reset:', resetButton.classList);
  });

  document.addEventListener('click', (event) => {
    if (!container.contains(event.target)) {
      console.log('Click outside detected');
      input.classList.add('hidden');
      resetButton.classList.add('hidden');
      console.log('Input classes after outside click:', input.classList);
      console.log('Reset button classes after outside click:', resetButton.classList);
    }
  });

  initializeFlatpickr(input, () => {
    // Callback function when the date is selected
    console.log(`Selected date: ${input.value}`);
  });
}