import { initializeDarkMode } from './dark-mode.js';
import { setDefaultDate } from './default-date.js';
import { initializeAddTask } from './add-task.js';
import { initializeCheckboxAll } from './header-checkbox.js';
import { initializeTaskCards, showTaskDetails } from './task-card.js';

// Initialize dark mode
initializeDarkMode();

// Set default date
setDefaultDate();

// Initialize add task functionality
initializeAddTask();

// Initialize checkbox functionality
initializeCheckboxAll();

// Initialize task cards
initializeTaskCards();

// Make showTaskDetails available globally for task.js to use
window.showTaskDetails = showTaskDetails;