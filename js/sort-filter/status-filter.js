import { setupButtonColors } from '../status-color.js';
import { activateButton } from './activate-button.js';

export function activateStatusFilter(buttonId, dropdownId, resetButtonId) {
  const button = document.getElementById(buttonId);
  const dropdown = document.getElementById(dropdownId);
  const resetButton = document.getElementById(resetButtonId);
  const container = button.closest('.filter-container');

  if (!button || !dropdown || !resetButton || !container) {
    console.error('One or more elements not found:', { button, dropdown, resetButton, container });
    return;
  }

  activateButton(buttonId, dropdownId, resetButtonId);

  document.addEventListener('click', (event) => {
    if (!container.contains(event.target)) {
      dropdown.classList.add('hidden');
      resetButton.classList.add('hidden');
    }
  });

  setupButtonColors(button, dropdown, resetButton, container);
}