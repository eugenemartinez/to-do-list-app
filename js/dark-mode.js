import { saveToLocalStorage, loadFromLocalStorage } from './storage.js';

export function initializeDarkMode() {
  const toggleMode = document.getElementById('toggleMode');
  const body = document.body;

  if (!toggleMode) {
    console.error('Dark mode toggle switch not found');
    return;
  }

  // Check if dark mode is enabled in local storage
  const darkMode = loadFromLocalStorage('darkMode');
  if (darkMode === 'enabled' || darkMode === null) {
    body.classList.add('dark-mode');
    toggleMode.checked = true;
    saveToLocalStorage('darkMode', 'enabled');
  }

  toggleMode.addEventListener('change', () => {
    if (toggleMode.checked) {
      body.classList.add('dark-mode');
      saveToLocalStorage('darkMode', 'enabled');
    } else {
      body.classList.remove('dark-mode');
      saveToLocalStorage('darkMode', 'disabled');
    }
  });
}