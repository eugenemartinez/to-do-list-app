export function activateButton(buttonId, targetId, resetButtonId) {
  const button = document.getElementById(buttonId);
  const target = document.getElementById(targetId);
  const resetButton = document.getElementById(resetButtonId);

  if (!button || !target || !resetButton) {
    console.error('Button, target, or reset button element not found:', { button, target, resetButton });
    return;
  }

  button.addEventListener('click', () => {
    target.classList.toggle('hidden');
    resetButton.classList.toggle('hidden');
  });

  resetButton.addEventListener('click', () => {
    target.value = '';
    target.classList.add('hidden');
    resetButton.classList.add('hidden');
  });
}