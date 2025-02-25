import { saveToLocalStorage, loadFromLocalStorage } from './storage.js';

export function initializeDarkMode() {
  const toggleMode = document.getElementById('toggleMode');
  const body = document.body;

  if (!toggleMode) {
    console.error('Dark mode toggle switch not found');
    return;
  }

  console.log('Dark mode toggle switch found');

  // Check if dark mode is enabled in local storage
  const darkMode = loadFromLocalStorage('darkMode');
  if (darkMode === 'enabled' || darkMode === null) {
    console.log('Dark mode is enabled in local storage or no preference found');
    body.classList.add('dark-mode');
    toggleMode.checked = true;
    saveToLocalStorage('darkMode', 'enabled');
  } else {
    console.log('Dark mode is not enabled in local storage');
  }

  toggleMode.addEventListener('change', () => {
    console.log('Dark mode toggle switch changed');
    if (toggleMode.checked) {
      console.log('Dark mode enabled');
      body.classList.add('dark-mode');
      saveToLocalStorage('darkMode', 'enabled');
    } else {
      console.log('Dark mode disabled');
      body.classList.remove('dark-mode');
      saveToLocalStorage('darkMode', 'disabled');
    }
  });
}