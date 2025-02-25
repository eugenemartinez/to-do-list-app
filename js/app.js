// filepath: /Users/yowhenyow/Documents/Codes/task-manager-app/js/app.js
// Import dark mode functionality
import { initializeDarkMode } from './dark-mode.js';
// Import default date functionality
import { setDefaultDate } from './default-date.js';
// Import add task functionality
import { initializeAddTask } from './add-task.js';
// Import checkbox functionality
import { initializeCheckboxAll } from './header-checkbox.js';

// Initialize dark mode
initializeDarkMode();

// Set default date
setDefaultDate();

// Initialize add task functionality
initializeAddTask();

// Initialize checkbox functionality
initializeCheckboxAll();

// ...existing code...